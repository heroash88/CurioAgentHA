/**
 * OfflineClient
 * A local-only implementation of the LiveClient interface.
 * Uses Web Speech API for recognition and synthesis.
 * Uses transcriptAnalyzer for direct tool invocation.
 */

import { analyzeTranscript } from './transcriptAnalyzer';
import { resolveSupportedToolName } from './haWidgetSupport';
import type { HomeAssistantCardAction } from './haWidgetSupport';
import type { CardEvent } from './cardTypes';

export class OfflineClient {
    public isConnected: boolean = false;
    public isSpeaking: boolean = false;
    public onmessage?: (message: any) => void;
    public onopen?: () => void;
    public onclose?: () => void;
    public onerror?: (err: Error) => void;
    public onCardEvent?: (event: CardEvent) => void;
    public executeTool?: (name: string, args: any) => Promise<any>;
    public entityCache: any[] = [];
    public toolNames: string[] = [];

    private recognition: any = null;
    private synthesis: SpeechSynthesis = window.speechSynthesis;

    constructor() {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event: any) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                if (finalTranscript) {
                    this.handleFinalTranscript(finalTranscript);
                }

                // Mimic the transcript updates to the UI
                if (this.onmessage) {
                    this.onmessage({
                        serverContent: {
                            modelDraft: {
                                text: interimTranscript || finalTranscript
                            }
                        }
                    });
                }
            };

            this.recognition.onstart = () => {
                this.isConnected = true;
                if (this.onopen) this.onopen();
            };

            this.recognition.onend = () => {
                if (this.isConnected) {
                    // Auto-restart if we didn't explicitly disconnect
                    try {
                        this.recognition.start();
                    } catch (e) {
                        console.warn('[OfflineClient] Recognition auto-restart failed:', e);
                    }
                }
            };

            this.recognition.onerror = (event: any) => {
                console.error('[OfflineClient] Recognition error:', event.error);
                if (this.onerror) this.onerror(new Error(event.error));
            };
        } else {
            console.error('[OfflineClient] Web Speech API not supported in this browser.');
        }
    }

    public async connect(): Promise<void> {
        if (!this.recognition) {
            throw new Error('Speech recognition not supported');
        }
        try {
            this.recognition.start();
        } catch (e) {
            // Already started?
        }
    }

    public async disconnect(): Promise<void> {
        this.isConnected = false;
        if (this.recognition) {
            this.recognition.stop();
        }
        if (this.onclose) this.onclose();
    }

    public sendRealtimeInput(input: any): void {
        console.log('[OfflineClient] Realtime input ignored in offline mode:', input);
    }

    private handleFinalTranscript(text: string) {
        console.log('[OfflineClient] Processing transcript:', text);
        
        // Use the analyzer to find matching tools
        const event = analyzeTranscript(text);
        
        if (event) {
            console.log('[OfflineClient] Action triggered:', event.type);
            
            // Handle HA tool execution if needed
            if (event.type === 'ha') {
                this.handleSmartHomeAction(event);
            }
            
            if (this.onCardEvent) {
                this.onCardEvent(event);
            }
            
            // Provide verbal feedback
            this.speakFeedbackForEvent(event);
        } else {
            // Optional: Handle unknown command or just ignore
            console.log('[OfflineClient] No match for transcript');
        }
    }

    private async handleSmartHomeAction(event: CardEvent) {
        if (!this.executeTool) {
            console.warn('[OfflineClient] No executeTool handler registered');
            return;
        }

        const { action, device } = event.data as any;
        const entity = this.resolveEntity(device);

        if (entity) {
            const entityId = (entity.entity_id || entity.id || '').toLowerCase();
            console.log(`[OfflineClient] Resolved "${device}" to "${entityId}" (${entity.friendly_name})`);
            
            // Enrich the event data so DeviceCard can render it properly
            event.data = {
                ...event.data,
                entityId: entityId,
                friendlyName: entity.friendly_name || entity.name || device,
                domain: entityId.split('.')[0],
                state: action === 'turn_on' ? 'on' : (action === 'turn_off' ? 'off' : 'ok'),
                supportedActions: [action],
                controlKind: 'readonly' // Safe default for status confirmation
            };
            
            // Try to resolve the best tool name from available tools
            const entityDomain = entityId.split('.')[0];
            const resolvedToolName = resolveSupportedToolName(
                this.toolNames, 
                action as HomeAssistantCardAction, 
                entityDomain
            );
            
            let toolName = resolvedToolName 
                ? `homeassistant__${resolvedToolName.replace(/\./g, '__')}` 
                : `homeassistant__${entityDomain}__${action}`;
            
            // Fallback for generic actions if domain-specific tool fails or doesn't exist
            // Actually, we can just use the generic HassTurnOn/Off if it's simpler, 
            // but the domain tools are better.
            
            try {
                // Determine tool name based on common HA patterns
                // e.g., homeassistant__light__turn_on
                const args = { entity_id: entityId };
                const result = await this.executeTool(toolName, args);
                
                // Check if the tool reported an error (some clients return success but with isError: true)
                if (result?.isError || result?.error) {
                    console.warn(`[OfflineClient] Tool ${toolName} reported error, trying fallback`, result);
                    throw new Error(result.error || 'Tool call failed');
                }
            } catch (err) {
                console.warn(`[OfflineClient] Failed to call ${toolName}, falling back to generic`, err);
                try {
                    const fallbackName = `homeassistant__homeassistant__${action}`;
                    const fallbackArgs = { entity_id: entityId, name: entity.friendly_name || device };
                    await this.executeTool(fallbackName, fallbackArgs);
                } catch (err2) {
                    console.error('[OfflineClient] Tool call failed:', err2);
                }
            }
        } else {
            console.warn(`[OfflineClient] Could not resolve device: ${device}`);
        }
    }

    private resolveEntity(deviceName: string): any | null {
        if (!this.entityCache || this.entityCache.length === 0) return null;

        const query = deviceName.toLowerCase();
        
        // 1. Exact friendly name match
        let match = this.entityCache.find(e => (e.friendly_name || e.name || '').toLowerCase() === query);
        if (match) return match;

        // 2. Substring friendly name match
        match = this.entityCache.find(e => (e.friendly_name || e.name || '').toLowerCase().includes(query));
        if (match) return match;

        // 3. Entity ID match (in case user said the id)
        const idQuery = query.replace(/\s+/g, '_');
        match = this.entityCache.find(e => (e.entity_id || e.id || '').toLowerCase().includes(idQuery));
        if (match) return match;

        return null;
    }

    private speakFeedbackForEvent(event: CardEvent) {
        let message = '';
        const data = event.data as any;
        
        switch (event.type) {
            case 'timer':
                if (data.isAlarm) {
                    message = `Alarm set.`;
                } else {
                    const secs = Math.round(data.duration / 1000);
                    message = `Timer started for ${secs} seconds.`;
                }
                break;
            case 'weather':
                message = data.location ? `Here is the weather for ${data.location}.` : `Here is the current weather.`;
                break;
            case 'ha':
                const action = data.action === 'turn_on' ? 'turned on' : (data.action === 'turn_off' ? 'turned off' : 'toggled');
                message = `OK, ${action} the ${data.device}.`;
                break;
            case 'note':
                message = `Note saved.`;
                break;
            case 'music':
                message = `Playing ${data.query || 'music'}.`;
                break;
            default:
                message = 'Action completed.';
        }

        if (message) {
            this.speak(message);
        }
    }

    private speak(text: string) {
        this.synthesis.cancel(); // Stop any current speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => {
            this.isSpeaking = true;
            // Notify UI
            if (this.onmessage) {
                this.onmessage({
                    serverContent: {
                        modelDraft: { text: '' } // Clear user transcript
                    }
                });
            }
        };
        utterance.onend = () => {
            this.isSpeaking = false;
        };
        this.synthesis.speak(utterance);
    }
}

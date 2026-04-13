// src/services/googleTasksAPI.ts

const TASKS_API_BASE = 'https://tasks.googleapis.com/tasks/v1';

export interface GoogleTask {
    id: string;
    title: string;
    notes?: string;
    status: string;
}

/**
 * Creates a new task in the user's default Google Tasks list.
 *
 * NOTE: The Google Tasks API `due` field only stores the DATE — the time portion
 * is explicitly discarded by Google. We therefore:
 *   1. Send `due` as a midnight-UTC date string for the correct calendar day.
 *   2. Write the full human-readable date+time into `notes` so it shows in the UI.
 *
 * @param accessToken The Google OAuth access token with 'https://www.googleapis.com/auth/tasks' scope.
 * @param title The title of the task.
 * @param scheduledTimeLabel The natural-language time string from the AI (e.g. "tomorrow at 8 AM").
 * @param dueDateTime RFC 3339 timestamp with timezone offset produced by the AI (e.g. "2026-04-08T20:00:00-07:00").
 * @returns The created task object.
 */
export async function createGoogleTask(
    accessToken: string,
    title: string,
    scheduledTimeLabel?: string,
    dueDateTime?: string
): Promise<GoogleTask> {
    const listId = '@default';

    // Tag the task clearly as originating from Curio
    const prefixedTitle = title.startsWith('[Curio]') ? title : `[Curio] ${title}`;

    // Build a human-readable time string for the notes field.
    // Google Tasks UI doesn't display the time from `due`, so we embed it here.
    let humanTime = scheduledTimeLabel || '';
    if (dueDateTime) {
        try {
            const parsed = new Date(dueDateTime);
            if (!isNaN(parsed.getTime())) {
                humanTime = parsed.toLocaleString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZoneName: 'short',
                });
            }
        } catch {
            // Fall back to the label if parsing fails
        }
    }

    const notes = humanTime ? `⏰ Due: ${humanTime}` : '';

    const bodyObj: Record<string, string> = {
        title: prefixedTitle,
        notes,
    };

    // The `due` field must be a date-only RFC 3339 string (midnight UTC on the correct day).
    // We parse the AI-supplied local datetime and normalize it to midnight UTC on that calendar date.
    if (dueDateTime) {
        try {
            const parsed = new Date(dueDateTime);
            if (!isNaN(parsed.getTime())) {
                // Format as YYYY-MM-DDT00:00:00.000Z (date portion only)
                const yyyy = parsed.getFullYear();
                const mm = String(parsed.getMonth() + 1).padStart(2, '0');
                const dd = String(parsed.getDate()).padStart(2, '0');
                bodyObj.due = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
            }
        } catch {
            // Skip setting due if parsing fails
        }
    }

    const response = await fetch(`${TASKS_API_BASE}/lists/${listId}/tasks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error?.message || `Google Tasks API failed with status ${response.status}`);
    }

    return response.json();
}

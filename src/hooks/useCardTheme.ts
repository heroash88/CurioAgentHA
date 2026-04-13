import { useSettingsStore } from '../utils/settingsStorage';

/**
 * Returns theme-aware text/bg classes for use inside card components.
 * Call once at the top of each card, then use the returned classes.
 */
export const useCardTheme = () => {
    const { themeMode } = useSettingsStore();
    const dark = themeMode === 'dark';
    return {
        dark,
        // Primary text (headings, bold values)
        text: dark ? 'text-white' : 'text-slate-800',
        // Secondary text (body, descriptions)
        text2: dark ? 'text-white/80' : 'text-slate-600',
        // Muted text (labels, captions)
        muted: dark ? 'text-white/50' : 'text-slate-500',
        // Very muted (tiny labels, tracking text)
        faint: dark ? 'text-white/30' : 'text-slate-400',
        // Inner panel backgrounds
        panel: dark ? 'bg-white/5' : 'bg-black/[0.03]',
        // Inner panel borders
        panelBorder: dark ? 'border-white/10' : 'border-black/[0.06]',
        // Button backgrounds
        btn: dark ? 'bg-white/10 hover:bg-white/15' : 'bg-black/[0.05] hover:bg-black/[0.08]',
        // Button text
        btnText: dark ? 'text-white/70' : 'text-slate-600',
    };
};

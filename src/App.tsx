import React, { useEffect } from 'react';
import { RootProvider } from './providers/RootProvider';
import AppContent from './components/AppContent';
import { setupAutoResumeOnInteraction } from './services/audioContext';
import { useSettingsStore } from './utils/settingsStorage';

/** Syncs themeMode to document.documentElement so CSS selectors like [data-theme="dark"] work globally */
const ThemeSync: React.FC = () => {
  const { themeMode } = useSettingsStore();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);
  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Crucial for iOS Safari: Attach global interaction listeners to unlock Web Audio API
    setupAutoResumeOnInteraction();
  }, []);

  // Pause all CSS animations when the tab is hidden to save CPU
  useEffect(() => {
    const handleVisibility = () => {
      document.documentElement.classList.toggle('page-hidden', document.hidden);
    };
    // Set initial state
    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <RootProvider>
      <ThemeSync />
      <AppContent />
    </RootProvider>
  );
};

export default App;

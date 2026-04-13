import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { migrateSecretsToEncrypted } from './utils/secretStorage';

// Migrate any plaintext secrets to encrypted form (fire-and-forget)
migrateSecretsToEncrypted().catch((err) =>
  console.warn('[SecretStorage] Migration failed:', err),
);

const isLocalDevelopmentHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

if (isLocalDevelopmentHost && typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  void navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      void registration.unregister();
    });
  });

  if ('caches' in window) {
    void caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        void caches.delete(cacheName);
      });
    });
  }
} else if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

// Global error handler
window.onerror = function (msg, url, line, col, error) {
  console.error("Global Error Caught:", msg, url, line, col, error);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML += `<div style="color:red; background:white; padding:20px; position:fixed; top:0; left:0; z-index:240;">
      Error: ${msg} <br/>
      ${url}:${line}:${col}
    </div>`;
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element to mount to");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to mount React root:", error);
}

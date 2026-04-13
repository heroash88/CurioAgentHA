import React from 'react';
import CurioAgentMode from './curio/CurioAgentMode';
import ErrorBoundary from './ErrorBoundary';

const AppContent: React.FC = () => {
  return (
    <main className="h-full w-full overflow-hidden bg-slate-900">
      <ErrorBoundary>
        <CurioAgentMode />
      </ErrorBoundary>
    </main>
  );
};

export default AppContent;

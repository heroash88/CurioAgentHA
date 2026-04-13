import React, { useState } from 'react';

interface SettingsSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-100 rounded-2xl">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full px-4 py-3 bg-slate-50/80 hover:bg-slate-100/80 transition-colors rounded-2xl"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{title}</span>
        </div>
        <span className={`text-slate-400 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-4 py-3 space-y-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingsSection;

import React from 'react';

interface SettingsToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
  color?: string;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  label,
  description,
  enabled,
  onToggle,
  color = 'bg-teal-500',
}) => (
  <div className="flex items-center justify-between gap-3 py-1.5">
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {description && (
        <span className="text-[10px] text-slate-400 italic leading-tight">{description}</span>
      )}
    </div>
    <button
      onClick={onToggle}
      className={`relative h-7 w-12 shrink-0 rounded-full shadow-sm transition-all duration-300 active:scale-95 ${enabled ? color : 'bg-slate-300'}`}
    >
      <div className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${enabled ? 'left-5.5' : 'left-0.5'}`} />
    </button>
  </div>
);

export default SettingsToggle;

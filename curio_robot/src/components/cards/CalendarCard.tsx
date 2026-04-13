import React from 'react';
import type { CardComponentProps, CalendarCardData } from '../../services/cardTypes';
import { useCardTheme } from '../../hooks/useCardTheme';

const ACCENT_COLORS = ['bg-sky-400', 'bg-violet-400', 'bg-[#00B2FF]', 'bg-amber-400', 'bg-rose-400'];

const CalendarCard: React.FC<CardComponentProps> = ({ card }) => {
  const t = useCardTheme();
  const data = card.data as unknown as CalendarCardData;
  const events = data.events || [];

  return (
    <div className="card-glass min-w-[360px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
            <span className="text-lg">📅</span>
          </div>
          <div>
            <p className="text-sm font-bold font-headline">Upcoming Events</p>
            {data.date && <p className={`text-[10px] font-medium ${t.faint}`}>{data.date}</p>}
          </div>
        </div>
        <span className={`inline-flex items-center rounded-full ${t.panel} border ${t.panelBorder} px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${t.muted}`}>
          {events.length} event{events.length !== 1 ? 's' : ''}
        </span>
      </div>
      {events.length === 0 ? (
        <p className={`text-sm ${t.faint} italic text-center py-4`}>No upcoming events</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {events.map((evt, i) => (
            <div key={i} className={`flex items-start gap-3 rounded-xl ${t.panel} p-3`}>
              <div className={`w-1 self-stretch rounded-full ${ACCENT_COLORS[i % ACCENT_COLORS.length]} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">{evt.title}</p>
                <p className={`text-[11px] font-medium ${t.muted} mt-0.5`}>
                  {evt.allDay ? 'All day' : evt.startTime}
                  {evt.endTime && !evt.allDay ? ` — ${evt.endTime}` : ''}
                </p>
                {evt.location && (
                  <p className={`text-[10px] ${t.faint} mt-0.5 truncate`}>📍 {evt.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarCard;

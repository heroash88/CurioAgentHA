const NOTES_KEY = 'curio_notes';
const REMINDERS_KEY = 'curio_reminders';

export interface SavedNote {
  id: string;
  text: string;
  category: string;
  createdAt: number;
}

export interface SavedReminder {
  id: string;
  text: string;
  timeDescription: string;
  dueDateTime?: string;
  createdAt: number;
  done: boolean;
}

export function saveNote(text: string, category = 'general'): SavedNote {
  const note: SavedNote = {
    id: crypto.randomUUID(),
    text,
    category,
    createdAt: Date.now(),
  };
  const notes = getNotes();
  notes.unshift(note);
  try { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); } catch {}
  return note;
}

export function getNotes(): SavedNote[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function deleteNote(id: string): void {
  const notes = getNotes().filter(n => n.id !== id);
  try { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); } catch {}
}

export function saveReminder(text: string, timeDescription = 'Soon', dueDateTime?: string): SavedReminder {
  const reminder: SavedReminder = {
    id: crypto.randomUUID(),
    text,
    timeDescription,
    dueDateTime,
    createdAt: Date.now(),
    done: false,
  };
  const reminders = getReminders();
  reminders.unshift(reminder);
  try { localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders)); } catch {}
  return reminder;
}

export function getReminders(): SavedReminder[] {
  try {
    const raw = localStorage.getItem(REMINDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function deleteReminder(id: string): void {
  const reminders = getReminders().filter(r => r.id !== id);
  try { localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders)); } catch {}
}

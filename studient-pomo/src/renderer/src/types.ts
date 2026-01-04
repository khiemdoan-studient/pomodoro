export type TimerMode = 'pomo' | 'pomo-short' | 'micro-break' | 'short-break' | 'long-break';

export interface TimerConfig {
  id: TimerMode;
  label: string;
  defaultDuration: number; // in seconds
  colorTheme: 'focus' | 'break'; // 'focus' = Purple/Teal, 'break' = Blue
}

export interface Task {
  id: string;
  label: string;
  isActive: boolean;
}

export interface SessionRecord {
  id: string;
  timestamp: string; // ISO Date string
  modeLabel: string; // e.g., "Pomodoro"
  durationMinutes: number;
  completedTask: string;
}

export interface AppSettings {
  durations: Record<TimerMode, number>; // Custom durations in minutes
  autoStartBreaks: boolean;
  autoStartPomos: boolean;
  alarmSound: 'bell' | 'digital' | 'bird';
  volume: number;
}

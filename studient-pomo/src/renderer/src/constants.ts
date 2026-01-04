import { TimerConfig, TimerMode, Task } from './types';

export const TIMER_CONFIGS: TimerConfig[] = [
  {
    id: 'pomo',
    label: 'Pomodoro',
    defaultDuration: 25 * 60, // 25 minutes in seconds
    colorTheme: 'focus',
  },
  {
    id: 'pomo-short',
    label: 'Pomodoro (Short)',
    defaultDuration: 10 * 60, // 10 minutes
    colorTheme: 'focus',
  },
  {
    id: 'micro-break',
    label: 'Micro Break',
    defaultDuration: 2 * 60, // 2 minutes
    colorTheme: 'break',
  },
  {
    id: 'short-break',
    label: 'Short Break',
    defaultDuration: 5 * 60, // 5 minutes
    colorTheme: 'break',
  },
  {
    id: 'long-break',
    label: 'Long Break',
    defaultDuration: 10 * 60, // 10 minutes
    colorTheme: 'break',
  },
];

export const DEFAULT_TASKS: Task[] = [
  { id: '1', label: 'AIM Launch', isActive: false },
  { id: '2', label: 'Goal Setting', isActive: false },
  { id: '3', label: 'Pomodoro Focus Time', isActive: true },
  { id: '4', label: 'Celebrate Wins', isActive: false },
  { id: '5', label: 'Track Progress', isActive: false },
];

export const DEFAULT_SETTINGS = {
  durations: {
    'pomo': 25,
    'pomo-short': 10,
    'micro-break': 2,
    'short-break': 5,
    'long-break': 10,
  } as Record<TimerMode, number>,
  autoStartBreaks: false,
  autoStartPomos: false,
  alarmSound: 'bell' as const,
  volume: 0.5,
};

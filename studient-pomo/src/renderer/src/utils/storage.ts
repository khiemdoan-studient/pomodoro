import { Task, SessionRecord, AppSettings } from '../types';
import { DEFAULT_TASKS, DEFAULT_SETTINGS } from '../constants';

const STORAGE_KEYS = {
  TASKS: 'studient-tasks',
  HISTORY: 'studient-history',
  SETTINGS: 'studient-settings',
};

export const storage = {
  // Tasks
  getTasks(): Task[] {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!stored) {
      // Initialize with defaults if no tasks exist
      this.setTasks(DEFAULT_TASKS);
      return DEFAULT_TASKS;
    }
    try {
      const tasks = JSON.parse(stored);
      return tasks.length > 0 ? tasks : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  },

  setTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  // History
  getHistory(): SessionRecord[] {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  addSession(session: SessionRecord): void {
    const history = this.getHistory();
    history.unshift(session); // Add to beginning
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  },

  clearHistory(): void {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
  },

  // Settings
  getSettings(): AppSettings {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) {
      this.setSettings(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  setSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },
};

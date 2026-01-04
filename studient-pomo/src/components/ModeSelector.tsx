import { TimerMode } from '../types';
import { TIMER_CONFIGS } from '../constants';

interface ModeSelectorProps {
  selectedMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  theme: 'focus' | 'break';
}

export function ModeSelector({ selectedMode, onModeChange, theme }: ModeSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {TIMER_CONFIGS.map((config) => (
        <button
          key={config.id}
          onClick={() => onModeChange(config.id)}
          className={`
            px-6 py-3 rounded-full font-medium transition-all
            ${selectedMode === config.id
              ? theme === 'focus'
                ? 'bg-white text-purple-900 shadow-lg'
                : 'bg-white text-blue-600 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
            }
          `}
        >
          {config.label}
        </button>
      ))}
    </div>
  );
}

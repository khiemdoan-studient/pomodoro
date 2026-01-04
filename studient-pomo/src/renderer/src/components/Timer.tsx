import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { TimerMode } from '../types';
import { TIMER_CONFIGS } from '../constants';
import { formatTime } from '../utils/helpers';

interface TimerProps {
  mode: TimerMode;
  duration: number; // in minutes
  onComplete: () => void;
  theme: 'focus' | 'break';
}

export function Timer({ mode, duration, onComplete, theme }: TimerProps) {
  const durationSeconds = duration * 60;
  const { timeLeft, isRunning, start, pause, reset } = useTimer(durationSeconds, onComplete);

  const config = TIMER_CONFIGS.find(c => c.id === mode);
  const percentage = (timeLeft / durationSeconds) * 100;

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Timer Display */}
      <div className="relative">
        {/* Progress Ring */}
        <svg className="transform -rotate-90" width="320" height="320">
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-white/20"
          />
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={theme === 'focus' ? 'text-cyan-400' : 'text-blue-300'}
            style={{
              strokeDasharray: `${2 * Math.PI * 150}`,
              strokeDashoffset: `${2 * Math.PI * 150 * (1 - percentage / 100)}`,
              transition: 'stroke-dashoffset 0.5s ease',
            }}
          />
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-8xl font-mono font-bold text-white tabular-nums">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xl text-white/80 mt-2">
            {config?.label}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={isRunning ? pause : start}
          className={`
            px-12 py-4 rounded-full font-semibold text-lg
            transition-all transform hover:scale-105 active:scale-95
            ${theme === 'focus' 
              ? 'bg-white text-purple-900 hover:bg-gray-100' 
              : 'bg-white text-blue-600 hover:bg-gray-100'
            }
          `}
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <Pause size={20} />
              PAUSE
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Play size={20} />
              START
            </span>
          )}
        </button>

        <button
          onClick={reset}
          className="p-4 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
          title="Reset Timer"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Timer } from './components/Timer';
import { ModeSelector } from './components/ModeSelector';
import { TaskManager } from './components/TaskManager';
import { SessionHistory } from './components/SessionHistory';
import { SettingsModal } from './components/SettingsModal';
import { TimerMode, Task, SessionRecord, AppSettings } from './types';
import { TIMER_CONFIGS } from './constants';
import { storage } from './utils/storage';
import { generateId } from './utils/helpers';
import './index.css';

function App() {
  const [currentMode, setCurrentMode] = useState<TimerMode>('pomo');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [history, setHistory] = useState<SessionRecord[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    setTasks(storage.getTasks());
    setHistory(storage.getHistory());
    setSettings(storage.getSettings());
  }, []);

  // Get current theme based on mode
  const currentConfig = TIMER_CONFIGS.find(c => c.id === currentMode);
  const theme = currentConfig?.colorTheme || 'focus';

  // Handle timer completion
  const handleTimerComplete = () => {
    // Play sound notification with fallback to Web Audio API
    const playSound = () => {
      const audio = new Audio('/sounds/bell.mp3');
      audio.volume = settings?.volume || 0.5;
      audio.play().catch(() => {
        // Fallback to Web Audio API beep
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = (settings?.volume || 0.5) * 0.3;
        
        oscillator.start();
        setTimeout(() => oscillator.stop(), 300);
      });
    };
    
    playSound();

    // Save session record
    const activeTask = tasks.find(t => t.isActive);
    const newRecord: SessionRecord = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      modeLabel: currentConfig?.label || '',
      durationMinutes: settings?.durations[currentMode] || 25,
      completedTask: activeTask?.label || 'No task selected',
    };

    storage.addSession(newRecord);
    setHistory(storage.getHistory());

    // Auto-start next timer based on settings
    if (settings) {
      const isBreak = theme === 'break';
      if (isBreak && settings.autoStartPomos) {
        setCurrentMode('pomo');
      } else if (!isBreak && settings.autoStartBreaks) {
        setCurrentMode('short-break');
      }
    }
  };

  // Handle tasks change
  const handleTasksChange = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    storage.setTasks(updatedTasks);
  };

  // Handle settings save
  const handleSettingsSave = (newSettings: AppSettings) => {
    setSettings(newSettings);
    storage.setSettings(newSettings);
  };

  // Handle clear history
  const handleClearHistory = () => {
    storage.clearHistory();
    setHistory([]);
  };

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const currentDuration = settings.durations[currentMode];

  return (
    <div
      className={`
        min-h-screen transition-all duration-700 overflow-auto
        ${theme === 'focus'
          ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800'
          : 'bg-gradient-to-br from-blue-500 via-cyan-500 to-cyan-400'
        }
      `}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex-1"></div>
          <div className="text-center">
            <img 
              src="/StudientLogoAndName.png" 
              alt="Studient" 
              className="h-16 mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('h1');
                fallback.className = 'text-4xl font-bold text-white';
                fallback.textContent = 'Studient';
                e.currentTarget.parentNode?.appendChild(fallback);
              }}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Settings"
            >
              <Settings size={24} />
            </button>
          </div>
        </header>

        {/* Mode Selector */}
        <div className="mb-8">
          <ModeSelector
            selectedMode={currentMode}
            onModeChange={setCurrentMode}
            theme={theme}
          />
        </div>

        {/* Timer */}
        <div className="mb-12">
          <Timer
            mode={currentMode}
            duration={currentDuration}
            onComplete={handleTimerComplete}
            theme={theme}
          />
        </div>

        {/* Tasks */}
        <div className="mb-12">
          <TaskManager
            tasks={tasks}
            onTasksChange={handleTasksChange}
            theme={theme}
          />
        </div>

        {/* Session History */}
        <SessionHistory
          history={history}
          onClearHistory={handleClearHistory}
          theme={theme}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSave={handleSettingsSave}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default App;

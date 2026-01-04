import { useState } from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';
import { AppSettings, TimerMode } from '../types';
import { TIMER_CONFIGS } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  theme: 'focus' | 'break';
}

export function SettingsModal({ isOpen, onClose, settings, onSave, theme }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const updateDuration = (mode: TimerMode, value: number) => {
    setLocalSettings(prev => ({
      ...prev,
      durations: { ...prev.durations, [mode]: value },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`
          px-6 py-4 flex items-center justify-between border-b
          ${theme === 'focus' ? 'bg-purple-900 text-white' : 'bg-blue-600 text-white'}
        `}>
          <div className="flex items-center gap-3">
            <SettingsIcon size={24} />
            <h2 className="text-2xl font-bold">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Timer Durations */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Timer Durations (minutes)</h3>
            <div className="space-y-3">
              {TIMER_CONFIGS.map((config) => (
                <div key={config.id} className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">{config.label}</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={localSettings.durations[config.id]}
                    onChange={(e) => updateDuration(config.id, parseInt(e.target.value) || 1)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Auto-start Settings */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Auto-start</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700 font-medium">Auto-start Breaks</span>
                <input
                  type="checkbox"
                  checked={localSettings.autoStartBreaks}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    autoStartBreaks: e.target.checked,
                  }))}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700 font-medium">Auto-start Pomodoros</span>
                <input
                  type="checkbox"
                  checked={localSettings.autoStartPomos}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    autoStartPomos: e.target.checked,
                  }))}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
              </label>
            </div>
          </section>

          {/* Sound Settings */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Sound</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-medium">Alarm Sound</label>
                <select
                  value={localSettings.alarmSound}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    alarmSound: e.target.value as 'bell' | 'digital' | 'bird',
                  }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="bell">Bell</option>
                  <option value="digital">Digital</option>
                  <option value="bird">Bird</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-medium">Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={localSettings.volume}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    volume: parseFloat(e.target.value),
                  }))}
                  className="w-48"
                />
                <span className="text-gray-600 w-12 text-right">
                  {Math.round(localSettings.volume * 100)}%
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`
              px-6 py-2 rounded-lg font-medium text-white transition-colors
              ${theme === 'focus' 
                ? 'bg-purple-900 hover:bg-purple-800' 
                : 'bg-blue-600 hover:bg-blue-500'
              }
            `}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

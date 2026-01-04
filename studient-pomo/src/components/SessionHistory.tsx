import { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { SessionRecord } from '../types';
import { exportToCSV } from '../utils/helpers';

interface SessionHistoryProps {
  history: SessionRecord[];
  onClearHistory: () => void;
  theme: 'focus' | 'break';
}

export function SessionHistory({ history, onClearHistory, theme }: SessionHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExport = () => {
    if (history.length === 0) {
      alert('No sessions to export!');
      return;
    }
    exportToCSV(history);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold">Session History</h3>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {history.length} sessions
            </span>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {/* Content */}
        {isExpanded && (
          <div className="border-t border-white/10">
            {/* Action Buttons */}
            <div className="px-6 py-4 flex gap-3 bg-white/5">
              <button
                onClick={handleExport}
                disabled={history.length === 0}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                  transition-all
                  ${history.length === 0
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : theme === 'focus'
                      ? 'bg-cyan-400 text-purple-900 hover:bg-cyan-300'
                      : 'bg-blue-300 text-blue-900 hover:bg-blue-200'
                  }
                `}
              >
                <Download size={18} />
                Download Report
              </button>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all session history?')) {
                    onClearHistory();
                  }
                }}
                disabled={history.length === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-500/80 text-white hover:bg-red-500 disabled:bg-white/10 disabled:text-white/50 disabled:cursor-not-allowed transition-all"
              >
                <Trash2 size={18} />
                Clear History
              </button>
            </div>

            {/* Table */}
            {history.length === 0 ? (
              <div className="px-6 py-12 text-center text-white/60">
                No sessions completed yet. Start a timer to begin tracking!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 text-white/80">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Date</th>
                      <th className="px-6 py-3 text-left font-semibold">Time</th>
                      <th className="px-6 py-3 text-left font-semibold">Mode</th>
                      <th className="px-6 py-3 text-left font-semibold">Duration</th>
                      <th className="px-6 py-3 text-left font-semibold">Task</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {history.slice(0, 20).map((record) => {
                      const date = new Date(record.timestamp);
                      return (
                        <tr key={record.id} className="border-t border-white/5 hover:bg-white/5">
                          <td className="px-6 py-3">{date.toLocaleDateString()}</td>
                          <td className="px-6 py-3">{date.toLocaleTimeString()}</td>
                          <td className="px-6 py-3">
                            <span className="px-2 py-1 bg-white/10 rounded text-sm">
                              {record.modeLabel}
                            </span>
                          </td>
                          <td className="px-6 py-3">{record.durationMinutes} min</td>
                          <td className="px-6 py-3">{record.completedTask}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

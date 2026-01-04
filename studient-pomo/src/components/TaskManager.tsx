import { useState } from 'react';
import { Check, Edit2 } from 'lucide-react';
import { Task } from '../types';

interface TaskManagerProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  theme: 'focus' | 'break';
}

export function TaskManager({ tasks, onTasksChange, theme }: TaskManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleTaskClick = (taskId: string) => {
    const updatedTasks = tasks.map(task => ({
      ...task,
      isActive: task.id === taskId,
    }));
    onTasksChange(updatedTasks);
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditValue(task.label);
  };

  const finishEditing = () => {
    if (editingId && editValue.trim()) {
      const updatedTasks = tasks.map(task =>
        task.id === editingId ? { ...task, label: editValue.trim() } : task
      );
      onTasksChange(updatedTasks);
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditValue('');
    }
  };

  const activeTask = tasks.find(t => t.isActive);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Check size={24} />
          Current Task: {activeTask?.label || 'None'}
        </h2>
        
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`
                group flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer
                ${task.isActive
                  ? theme === 'focus'
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }
              `}
              onClick={() => !editingId && handleTaskClick(task.id)}
            >
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${task.isActive
                    ? 'border-current bg-current'
                    : 'border-white/50'
                  }
                `}
              >
                {task.isActive && <Check size={14} className="text-white" />}
              </div>

              {editingId === task.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={finishEditing}
                  onKeyDown={handleKeyDown}
                  className={`
                    flex-1 bg-transparent border-b-2 border-current
                    outline-none font-medium px-2 py-1
                    ${theme === 'focus' ? 'text-purple-900' : 'text-blue-600'}
                  `}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span className="flex-1 font-medium">{task.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(task);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-black/10"
                  >
                    <Edit2 size={16} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

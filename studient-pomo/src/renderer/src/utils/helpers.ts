import { SessionRecord } from '../types';

/**
 * Exports session history to a CSV file and triggers download.
 */
export function exportToCSV(history: SessionRecord[]): void {
  // Create CSV headers
  const headers = ['Date', 'Time', 'Mode', 'Duration (min)', 'Task'];
  
  // Convert records to CSV rows
  const rows = history.map(record => {
    const date = new Date(record.timestamp);
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();
    
    return [
      dateStr,
      timeStr,
      record.modeLabel,
      record.durationMinutes.toString(),
      record.completedTask
    ].map(field => `"${field}"`).join(',');
  });
  
  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows].join('\n');
  
  // Create blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Create hidden anchor element and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = `studient_report_${new Date().toISOString().split('T')[0]}.csv`;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
}

/**
 * Formats seconds into MM:SS display
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

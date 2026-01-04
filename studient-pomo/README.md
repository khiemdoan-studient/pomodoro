# Studient Pomodoro Timer

A lightweight, offline-first Pomodoro timer application for desktop (Windows/Mac/Linux). Built with Electron, React, TypeScript, and Vite.

## Features

### ⏱️ Multiple Timer Modes
- **Pomodoro**: 25 minutes (customizable)
- **Pomodoro (Short)**: 10 minutes (customizable)
- **Micro Break**: 2 minutes (customizable)
- **Short Break**: 5 minutes (customizable)
- **Long Break**: 10 minutes (customizable)

### ✅ Task Management
- Pre-loaded "Studient" workflow tasks
- Click to select active task
- Inline editing of task names
- Tasks persist across sessions

### 📊 Session Tracking
- Automatic session recording
- View complete history
- Export to CSV for analysis
- No cloud required - all data stored locally

### ⚙️ Customization
- Adjust all timer durations
- Auto-start breaks or pomodoros
- Multiple alarm sounds
- Adjustable volume

### 🎨 Beautiful UI
- Dynamic color themes (Focus vs Break modes)
- Smooth animations and transitions
- Circular progress indicator
- Responsive design

## Installation

### Development

1. **Navigate to the project**:
   ```bash
   cd studient-pomo
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

### Building for Production

#### Windows
```bash
npm run build:win
```
The installer will be in `dist/` folder.

#### macOS
```bash
npm run build:mac
```

#### Linux
```bash
npm run build:linux
```

## Tech Stack

- **Framework**: Electron + React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Persistence**: localStorage
- **Build Tool**: Electron Builder

## Project Structure

```
studient-pomo/
├── src/
│   ├── main/              # Electron main process
│   ├── preload/           # Electron preload scripts
│   └── renderer/          # React application
│       └── src/
│           ├── components/     # React components
│           │   ├── Timer.tsx
│           │   ├── ModeSelector.tsx
│           │   ├── TaskManager.tsx
│           │   ├── SessionHistory.tsx
│           │   └── SettingsModal.tsx
│           ├── hooks/          # Custom React hooks
│           │   └── useTimer.ts
│           ├── utils/          # Utility functions
│           │   ├── storage.ts
│           │   └── helpers.ts
│           ├── types.ts        # TypeScript type definitions
│           ├── constants.ts    # App constants
│           ├── App.tsx         # Main App component
│           └── index.css       # Global styles
├── build/                 # Build resources (icons)
├── electron-builder.yml   # Build configuration
└── package.json
```

## Key Features Explained

### Timer Hook with Drift Prevention
The custom `useTimer` hook uses `Date.now()` delta calculations instead of simple intervals. This ensures the timer remains accurate even when:
- The app is minimized
- The system goes to sleep
- The window loses focus

### Default Task System
On first launch, the app initializes with five "Studient" workflow tasks:
1. AIM Launch
2. Goal Setting
3. Pomodoro Focus Time (pre-selected)
4. Celebrate Wins
5. Track Progress

### Local-First Data Storage
All data is stored in the browser's localStorage:
- **Tasks**: Current task list and active selection
- **History**: Complete session records
- **Settings**: User preferences

No network required, no account needed.

### CSV Export
Click "Download Report" to export your session history as a CSV file with:
- Date and time
- Timer mode
- Duration
- Task completed

Perfect for importing into spreadsheets or productivity tools.

## Customization

### Timer Durations
Open Settings (gear icon) to customize any timer duration from 1 to 120 minutes.

### Auto-start Behavior
Enable auto-start for:
- Breaks after Pomodoros
- Pomodoros after Breaks

### Sounds & Volume
Choose from multiple alarm sounds and adjust volume (0-100%).

## Adding Assets

### Logo
Place your logo at: `src/renderer/public/StudientLogoAndName.png`

### Sound Files
Add custom alarm sounds to: `src/renderer/public/sounds/`
- `bell.mp3`
- `digital.mp3`
- `bird.mp3`

### App Icons
For building distributables, add icons to `build/`:
- `icon.ico` (Windows)
- `icon.icns` (macOS)  
- `icon.png` (Linux, 512x512)

## Development Scripts

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Build for specific platform
npm run build:win
npm run build:mac
npm run build:linux
```

## Browser Compatibility

The app uses modern web APIs:
- `localStorage` for data persistence
- `requestAnimationFrame` for smooth animations
- Web Audio API for fallback sounds

All features work offline in the Electron environment.

## License

MIT

## Credits

Created for Studient - enhancing student productivity through proven time management techniques.

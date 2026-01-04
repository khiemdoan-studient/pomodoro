# Studient Pomodoro Timer - Assets Guide

## Required Assets

### Logo Image
Place the Studient logo in the public directory:
- `src/renderer/public/StudientLogoAndName.png` - Main logo for the app header

### Sound Files
Place alarm sound files in the public/sounds directory:
- `src/renderer/public/sounds/bell.mp3` - Bell alarm sound
- `src/renderer/public/sounds/digital.mp3` - Digital alarm sound
- `src/renderer/public/sounds/bird.mp3` - Bird alarm sound

### Application Icons
For building distributable apps, place icons in the `build` directory:
- `build/icon.ico` - Windows icon
- `build/icon.icns` - macOS icon
- `build/icon.png` - Linux icon (512x512 PNG)

## Note
If these files are not present, the app will still work but:
- The logo will show fallback text "Studient"
- Sound notifications may not play (will fail silently)
- Build icons will use defaults

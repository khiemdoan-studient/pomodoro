# Troubleshooting Guide - Studient Pomodoro Timer

## Common Issues and Solutions

### 🚨 Installation Issues

#### Issue: `npm install` fails
**Solution:**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Version warnings (EBADENGINE)
**Solution:**
- These are warnings, not errors - the app will still work
- If you want to fix them, upgrade to Node 20.19.0 or higher
- Or ignore them - we've configured compatible versions

---

### 🚨 Development Issues

#### Issue: `npm run dev` shows crypto.hash error
**Solution:**
- This has been fixed by downgrading Vite to v5
- If you still see it: `npm install vite@^5.4.0 --save-dev`

#### Issue: App window doesn't open on WSL
**Solution:**
1. Make sure you have an X server running (like VcXsrv or X410)
2. Set DISPLAY variable: `export DISPLAY=:0`
3. Or test the build on Windows/Mac instead

#### Issue: dbus errors on Linux/WSL
**Solution:**
- These are harmless warnings in WSL environments
- The app functions normally despite these messages
- To suppress: Add `--no-sandbox` flag in electron startup (not recommended for production)

---

### 🚨 Build Issues

#### Issue: Build fails with module errors
**Solution:**
```bash
# Rebuild from clean state
npm run build
```

#### Issue: Icon missing in built app
**Solution:**
- Add icons to `build/` directory:
  - `build/icon.ico` (Windows)
  - `build/icon.icns` (macOS)
  - `build/icon.png` (Linux)
- Or the app will use default Electron icon

---

### 🚨 Runtime Issues

#### Issue: Timer doesn't countdown
**Solution:**
1. Check browser console for errors (F12)
2. Make sure you clicked START button
3. Try resetting the timer
4. Check if another timer is already running

#### Issue: Sound doesn't play
**Solution:**
- Add MP3 files to `src/renderer/public/sounds/`
- Or use the Web Audio fallback beep (already works)
- Check system volume
- Check app volume in settings

#### Issue: Tasks don't save
**Solution:**
1. Check browser console for localStorage errors
2. Make sure you have storage permission
3. Clear localStorage and restart: `localStorage.clear()`
4. Check browser privacy settings

#### Issue: CSV export doesn't work
**Solution:**
1. Make sure you have completed at least one session
2. Check browser download permissions
3. Try different browser if in development mode
4. Check Downloads folder

#### Issue: Logo doesn't show
**Solution:**
- Add your logo PNG to `src/renderer/public/StudientLogoAndName.png`
- Or it will show "Studient" text fallback
- Make sure file name matches exactly (case-sensitive)

---

### 🚨 Performance Issues

#### Issue: Timer drifts/lags
**Solution:**
- This shouldn't happen due to Date.now() implementation
- If it does: Check system resources
- Close other resource-intensive apps
- Check browser console for errors

#### Issue: App feels slow
**Solution:**
1. Close session history if it has many records
2. Clear old history: Use "Clear History" button
3. Reduce animation effects by disabling transitions in CSS

---

### 🚨 Data Issues

#### Issue: Lost all my data!
**Solution:**
- Data is in browser localStorage
- If using Electron app: Data is in user data folder
- Windows: `%APPDATA%/studient-pomo`
- Mac: `~/Library/Application Support/studient-pomo`
- Linux: `~/.config/studient-pomo`

**Prevention:**
- Export CSV regularly
- Back up localStorage:
  ```javascript
  // In browser console
  console.log(localStorage.getItem('studient-history'))
  ```

---

### 🚨 TypeScript Issues

#### Issue: Type errors in IDE
**Solution:**
```bash
# Run type checker
npm run typecheck

# Or in VSCode, reload window:
# Ctrl+Shift+P -> "Reload Window"
```

#### Issue: Module not found errors
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

### 🚨 Styling Issues

#### Issue: Tailwind classes not working
**Solution:**
1. Check if `tailwind.config.js` includes renderer path
2. Make sure `index.css` imports Tailwind directives
3. Restart dev server: `npm run dev`

#### Issue: Colors look wrong
**Solution:**
- Check if you're in the right mode (Focus vs Break)
- Verify gradients in App.tsx
- Clear browser cache

---

### 🔧 Development Tools

#### Clear All App Data
```javascript
// In browser console (F12)
localStorage.clear()
// Then refresh page
```

#### Inspect localStorage
```javascript
// View all stored data
console.log('Tasks:', localStorage.getItem('studient-tasks'))
console.log('History:', localStorage.getItem('studient-history'))
console.log('Settings:', localStorage.getItem('studient-settings'))
```

#### Reset to Defaults
```javascript
// In browser console
localStorage.removeItem('studient-tasks')
localStorage.removeItem('studient-history')
localStorage.removeItem('studient-settings')
// Then refresh page
```

---

### 📞 Getting Help

If you're still stuck:

1. **Check the docs:**
   - README.md
   - GETTING_STARTED.md
   - PROJECT_SUMMARY.md

2. **Check browser console:**
   - Press F12 to open DevTools
   - Look for errors in Console tab

3. **Check package versions:**
   ```bash
   npm list
   ```

4. **Clean install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **Fresh start:**
   ```bash
   # Back up your changes first!
   git clean -fdx
   npm install
   ```

---

### 🐛 Known Issues

1. **WSL dbus warnings**: Harmless, app works fine
2. **First launch delay**: Electron initializes, normal
3. **Sound file 404s**: Add files or use fallback beep
4. **Logo 404**: Add file or use text fallback

---

### ✅ Verification Checklist

Use this to verify your installation:

- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts without critical errors
- [ ] Electron window opens
- [ ] Timer displays correctly
- [ ] Tasks are visible
- [ ] Can start/pause timer
- [ ] Can switch modes
- [ ] Can edit tasks
- [ ] Can access settings
- [ ] Session history expands
- [ ] localStorage persists data (close and reopen)

---

### 📝 Reporting Issues

When reporting issues, include:
1. Operating System and version
2. Node.js version (`node --version`)
3. npm version (`npm --version`)
4. Error message (full text)
5. Steps to reproduce
6. What you expected to happen

---

**Last Updated**: January 3, 2026
**App Version**: 1.0.0

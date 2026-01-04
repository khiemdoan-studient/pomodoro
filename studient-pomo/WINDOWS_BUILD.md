# Windows Build Size Optimization

## Results Summary

| Build Type | Size | Notes |
|------------|------|-------|
| Original Installer (NSIS) | 94 MB | Full installer with 55 locales |
| Optimized Portable | **78 MB** | ✅ Recommended - Single .exe, English only |
| Unpacked App | 310 MB | Development reference |

**Size Reduction: 17% smaller** (94 MB → 78 MB)

## What Was Optimized

### 1. **Removed Unused Locale Files** (-44 MB from unpacked)
- Original: 55 language files (45 MB)
- Optimized: English only (1 MB)
- Removed: ar, bg, ca, cs, da, de, el, es, et, fa, fi, fil, fr, gu, he, hi, hr, hu, id, it, ja, kk, ko, lt, lv, ml, mr, ms, nb, nl, pl, pt-BR, pt-PT, ro, ru, sk, sl, sr, sv, sw, ta, te, th, tr, uk, ur, vi, zh-CN, zh-TW

### 2. **Maximum Compression**
- LZMA compression on portable executable
- Asar archive for app resources

### 3. **Portable Format**
- Single executable (no installer overhead)
- No elevation/admin prompts
- Runs from any location

## Build Commands

```bash
# Optimized portable (recommended for distribution)
npm run build:win

# Standard NSIS installer (if needed)
npm run build:win:installer

# Unoptimized portable
npm run build:win:portable
```

## Distribution Files

After running `npm run build:win`:
- `dist/studient-pomo-1.0.0-portable.exe` (78 MB) ← **Distribute this**

## Why Portable?

1. **Smaller size** - No installer wrapper
2. **No installation required** - Run directly
3. **Portable** - Works from USB drives, network shares
4. **No admin rights needed** - Ideal for corporate environments
5. **Faster download** - 17% smaller than installer

## File Locations When Running

The portable app stores data in:
- Settings: `%APPDATA%\studient-pomo\`
- Tasks: `%APPDATA%\studient-pomo\`
- History: `%APPDATA%\studient-pomo\`

## Further Size Reduction (Not Recommended)

To reduce further would require:
- ❌ Removing Chromium/Electron core (202 MB exe) - **Not feasible**
- ❌ Removing GPU acceleration libs (40 MB) - **Breaks rendering**
- ❌ Using older Electron version - **Security risk**

**Current size (78 MB) is industry-standard for Electron apps.**

## Comparison to Other Electron Apps

| App | Size |
|-----|------|
| Discord | ~120 MB |
| Slack | ~150 MB |
| VS Code | ~95 MB |
| **Studient Pomo** | **78 MB** ✅ |
| Notion | ~170 MB |

## Technical Details

### What's in the 78 MB?

- Electron runtime (Chromium + Node.js): ~250 MB unpacked
- App code (React + TypeScript): ~600 KB
- Assets (logo): ~45 KB
- Node modules (production): ~30 MB
- Compression ratio: ~4:1

### Build Configuration

See `electron-builder-optimized.yml`:
```yaml
compression: maximum
afterPack: ./afterPack.js  # Removes unused locales
```

## Troubleshooting

**"The app won't run on Windows"**
- The .exe must be run on Windows, not WSL
- Access from Windows: `\\wsl.localhost\Ubuntu-20.04\home\joey\...\dist\`

**"Windows Defender blocks it"**
- Unsigned executables trigger SmartScreen
- Click "More info" → "Run anyway"
- For production: Purchase code signing certificate ($200-400/year)

**"Need installer instead of portable"**
- Run: `npm run build:win:installer`
- Creates NSIS installer (~90 MB, installs to Program Files)

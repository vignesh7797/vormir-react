# Multiple Theme System

Vormir UI now includes **5 pre-built themes** that users can switch between dynamically. Each theme is in a separate CSS file and can be changed at runtime using the theme switcher utility.

## Available Themes

### 1. **Ocean Theme** (Default)
**Colors:** Deep Blue & Warm Amber  
**File:** `themes/ocean.css`  
**Vibe:** Professional, trustworthy, modern  
**Best for:** SaaS applications, dashboards, enterprise tools

**Key Colors:**
- Primary: Ocean Blue `hsl(210 85% 45%)`
- Accent: Warm Amber `hsl(35 85% 55%)`
- Dark Mode: Rich navy backgrounds

### 2. **Forest Theme**
**Colors:** Green & Earth Tones  
**File:** `themes/forest.css`  
**Vibe:** Natural, calming, organic  
**Best for:** Environmental apps, health/wellness, sustainability platforms

**Key Colors:**
- Primary: Forest Green `hsl(155 58% 38%)`
- Accent: Autumn Orange `hsl(25 90% 52%)`
- Dark Mode: Deep forest night

### 3. **Sunset Theme**
**Colors:** Orange & Pink Gradients  
**File:** `themes/sunset.css`  
**Vibe:** Creative, energetic, vibrant  
**Best for:** Creative tools, social apps, marketing sites

**Key Colors:**
- Primary: Sunset Orange `hsl(15 88% 48%)`
- Accent: Rose Pink `hsl(340 82% 52%)`
- Dark Mode: Deep twilight with warm glow

### 4. **Midnight Theme**
**Colors:** Pure Black (OLED) & Electric Blue  
**File:** `themes/midnight.css`  
**Vibe:** High-tech, sleek, futuristic  
**Best for:** Gaming apps, tech products, OLED devices

**Key Colors:**
- Primary: Electric Blue `hsl(220 85% 55%)`
- Accent: Neon Cyan `hsl(180 100% 50%)`
- Dark Mode: Pure black `#000000` (OLED optimized)

### 5. **Corporate Theme**
**Colors:** Professional Grays & Navy  
**File:** `themes/corporate.css`  
**Vibe:** Conservative, formal, trustworthy  
**Best for:** Financial apps, legal platforms, enterprise software

**Key Colors:**
- Primary: Professional Navy `hsl(215 28% 36%)`
- Accent: Muted Blue `hsl(210 40% 50%)`
- Dark Mode: Professional dark gray

## Usage

### Basic Usage

```typescript
import { setTheme, setMode, initTheme } from '@vormir/react';

// Initialize theme on app load
initTheme();

// Switch to a different theme
setTheme('forest');    // Changes to Forest theme
setTheme('sunset');    // Changes to Sunset theme
setTheme('midnight');  // Changes to Midnight theme
setTheme('corporate'); // Changes to Corporate theme
setTheme('ocean');     // Back to default Ocean theme

// Toggle dark mode
setMode('dark');       // Force dark mode
setMode('light');      // Force light mode
setMode('system');     // Follow system preference
```

### React Hook Example

```typescript
import { useState, useEffect } from 'react';
import { setTheme, setMode, getThemeConfig, type ThemeName, type ThemeMode } from '@vormir/react';

export function ThemeSwitcher() {
  const [theme, setThemeState] = useState<ThemeName>('ocean');
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    const config = getThemeConfig();
    setThemeState(config.theme);
    setModeState(config.mode);
  }, []);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
    setModeState(newMode);
  };

  return (
    <div>
      <select value={theme} onChange={(e) => handleThemeChange(e.target.value as ThemeName)}>
        <option value="ocean">Ocean</option>
        <option value="forest">Forest</option>
        <option value="sunset">Sunset</option>
        <option value="midnight">Midnight</option>
        <option value="corporate">Corporate</option>
      </select>

      <select value={mode} onChange={(e) => handleModeChange(e.target.value as ThemeMode)}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

### Next.js App Router Example

```typescript
// app/layout.tsx
import { initTheme } from '@vormir/react';
import '@vormir/react/styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('vormir-theme') || 'ocean';
                const mode = localStorage.getItem('vormir-theme-mode') || 'system';
                const effectiveMode = mode === 'system' 
                  ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                  : mode;
                
                document.documentElement.setAttribute('data-theme', theme);
                if (effectiveMode === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## How It Works

### 1. Data Attribute System
Each theme is activated using the `data-theme` attribute on the root element:

```html
<html data-theme="ocean">    <!-- Ocean theme -->
<html data-theme="forest">   <!-- Forest theme -->
<html data-theme="sunset">   <!-- Sunset theme -->
<html data-theme="midnight"> <!-- Midnight theme -->
<html data-theme="corporate"><!-- Corporate theme -->
```

### 2. Dark Mode Class
Dark mode is toggled using the `.dark` class:

```html
<html data-theme="ocean" class="dark">  <!-- Ocean theme in dark mode -->
<html data-theme="forest" class="dark"> <!-- Forest theme in dark mode -->
```

### 3. CSS Custom Properties
Each theme defines CSS variables that override the defaults:

```css
[data-theme='forest'] {
  --primary: 155 58% 38%;        /* Forest green */
  --accent: 25 90% 52%;          /* Autumn orange */
  /* ... all other variables */
}

[data-theme='forest'].dark {
  --primary: 155 52% 48%;        /* Brighter green for dark */
  --background: 155 25% 8%;      /* Deep forest night */
  /* ... dark mode overrides */
}
```

### 4. LocalStorage Persistence
User preferences are stored and restored:

```typescript
localStorage.setItem('vormir-theme', 'forest');      // Save theme
localStorage.setItem('vormir-theme-mode', 'dark');   // Save mode
```

## API Reference

### Types

```typescript
type ThemeName = 'ocean' | 'forest' | 'sunset' | 'midnight' | 'corporate';
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeConfig {
  theme: ThemeName;
  mode: ThemeMode;
}
```

### Functions

#### `initTheme()`
Initializes theme system on page load. Call once in your app root.

```typescript
initTheme();
```

#### `setTheme(theme: ThemeName)`
Switch to a different theme.

```typescript
setTheme('forest');
```

#### `setMode(mode: ThemeMode)`
Change dark/light mode.

```typescript
setMode('dark');    // Force dark
setMode('light');   // Force light
setMode('system');  // Follow OS
```

#### `toggleMode()`
Toggle between light and dark.

```typescript
toggleMode(); // light → dark or dark → light
```

#### `getThemeConfig()`
Get current theme configuration.

```typescript
const config = getThemeConfig();
// { theme: 'ocean', mode: 'system' }
```

#### `getStoredTheme()`
Get stored theme preference.

```typescript
const theme = getStoredTheme(); // 'ocean' | 'forest' | etc.
```

#### `getStoredMode()`
Get stored mode preference.

```typescript
const mode = getStoredMode(); // 'light' | 'dark' | 'system'
```

#### `getSystemTheme()`
Get OS/browser theme preference.

```typescript
const systemTheme = getSystemTheme(); // 'light' | 'dark'
```

## Theme Comparison

| Theme | Primary Hue | Vibe | Use Case |
|-------|------------|------|----------|
| **Ocean** | Blue (210°) | Professional, trustworthy | SaaS, dashboards |
| **Forest** | Green (155°) | Natural, calming | Health, sustainability |
| **Sunset** | Orange (15°) | Creative, vibrant | Social, creative tools |
| **Midnight** | Blue (220°) | Futuristic, sleek | Gaming, tech products |
| **Corporate** | Navy (215°) | Conservative, formal | Financial, enterprise |

## Color Scale System

All themes include full semantic color scales (50-900):

```css
--success-50   /* Lightest */
--success-100
--success-200
--success-300
--success-400
--success-500  /* Base */
--success-600
--success-700
--success-800
--success-900  /* Darkest */

/* Same scale for: error, warning, info */
```

Use in Tailwind:

```tsx
<div className="bg-success-100 text-success-900">
  <button className="bg-error-500 hover:bg-error-600">
    <span className="text-warning-700">Alert!</span>
  </button>
</div>
```

## Accessibility

All themes maintain WCAG AA contrast ratios:
- **Text:** 4.5:1 minimum (normal text)
- **Large Text:** 3:1 minimum (18px+ or 14px+ bold)
- **UI Components:** 3:1 minimum (borders, icons)

Midnight theme is optimized for OLED displays with pure black backgrounds to save battery and reduce burn-in.

## Best Practices

1. **Initialize Early:** Call `initTheme()` in your app root to prevent flash
2. **SSR Support:** Add inline script in `<head>` for Next.js/SSR apps
3. **Persist Preferences:** Theme utilities handle localStorage automatically
4. **System Preference:** Default to `mode: 'system'` for better UX
5. **Theme Picker:** Let users choose their preferred theme and mode

## Examples

### Complete Theme Switcher Component

```tsx
import { useState, useEffect } from 'react';
import { 
  setTheme, 
  setMode, 
  toggleMode, 
  getThemeConfig, 
  type ThemeName, 
  type ThemeMode 
} from '@vormir/react';
import { Button, Select, Stack, Text } from '@vormir/react';

export function ThemeControl() {
  const [theme, setThemeState] = useState<ThemeName>('ocean');
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    const config = getThemeConfig();
    setThemeState(config.theme);
    setModeState(config.mode);
  }, []);

  const themes = [
    { value: 'ocean', label: '🌊 Ocean', desc: 'Deep blue & amber' },
    { value: 'forest', label: '🌲 Forest', desc: 'Green & earth tones' },
    { value: 'sunset', label: '🌅 Sunset', desc: 'Orange & pink' },
    { value: 'midnight', label: '🌙 Midnight', desc: 'Pure black OLED' },
    { value: 'corporate', label: '💼 Corporate', desc: 'Professional gray' },
  ];

  return (
    <Stack spacing="md">
      <div>
        <Text weight="semibold">Theme</Text>
        <Select
          value={theme}
          onChange={(e) => {
            const newTheme = e.target.value as ThemeName;
            setTheme(newTheme);
            setThemeState(newTheme);
          }}
        >
          {themes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label} - {t.desc}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Text weight="semibold">Mode</Text>
        <Stack direction="row" spacing="sm">
          <Button
            variant={mode === 'light' ? 'primary' : 'outline'}
            onClick={() => {
              setMode('light');
              setModeState('light');
            }}
          >
            ☀️ Light
          </Button>
          <Button
            variant={mode === 'dark' ? 'primary' : 'outline'}
            onClick={() => {
              setMode('dark');
              setModeState('dark');
            }}
          >
            🌙 Dark
          </Button>
          <Button
            variant={mode === 'system' ? 'primary' : 'outline'}
            onClick={() => {
              setMode('system');
              setModeState('system');
            }}
          >
            💻 System
          </Button>
        </Stack>
      </div>

      <Button onClick={toggleMode}>
        Toggle Dark Mode
      </Button>
    </Stack>
  );
}
```

## Migration from Single Theme

If you were using the old single theme system:

**Before:**
```typescript
// No theme switching available
// Only had light/dark mode
```

**After:**
```typescript
import { setTheme, setMode } from '@vormir/react';

// Choose any theme
setTheme('forest');

// Mode still works the same
setMode('dark');
```

All existing code continues to work - the Ocean theme is the default and matches the previous design.

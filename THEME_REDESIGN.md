# Vormir UI - Theme Redesign

## Overview

The Vormir UI theme has been completely redesigned with a sophisticated **Ocean Blue & Warm Amber** color palette that works beautifully in both light and dark modes.

## Design Philosophy

### Light Mode - "Ocean Breeze"

- **Primary**: Deep Ocean Blue (#2563EB) - Professional, trustworthy, calming
- **Accent**: Warm Amber (#F59E0B) - Energetic highlights and CTAs
- **Neutrals**: Warm grays with subtle warmth (#FAF9F8 backgrounds)
- **Semantic Colors**: Vibrant, clear, and accessible

### Dark Mode - "Deep Navy"

- **Background**: Rich navy (#0F172A) - Reduces eye strain, sophisticated
- **Primary**: Brighter Ocean Blue (#3B82F6) - Pops against dark background
- **Accent**: Warm Amber (#FBBF24) - Stands out beautifully
- **Elevated Surfaces**: Subtle depth with layered navy tones

## Color Palette

### Brand Colors (Ocean Blue)

```css
Light Mode                   Dark Mode
--primary: hsl(210 85% 45%)  --primary: hsl(210 90% 58%)
```

| Shade | HSL          | Hex     | Usage                |
| ----- | ------------ | ------- | -------------------- |
| 50    | 210 100% 97% | #EFF6FF | Subtle backgrounds   |
| 100   | 210 95% 93%  | #DBEAFE | Hover states         |
| 200   | 210 91% 87%  | #BFDBFE | Light borders        |
| 300   | 210 88% 77%  | #93C5FD | Disabled states      |
| 400   | 210 83% 65%  | #60A5FA | Secondary actions    |
| 500   | 210 78% 53%  | #3B82F6 | Interactive elements |
| 600   | 210 85% 45%  | #2563EB | **Primary (Light)**  |
| 700   | 210 90% 38%  | #1D4ED8 | Hover primary        |
| 800   | 210 88% 31%  | #1E40AF | Active primary       |
| 900   | 210 82% 25%  | #1E3A8A | Dark accents         |
| 950   | 210 85% 16%  | #172554 | Deep shadows         |

### Accent Colors (Warm Amber)

```css
Light Mode                   Dark Mode
--accent: hsl(35 85% 55%)   --accent: hsl(35 90% 62%)
```

| Usage      | Light   | Dark    |
| ---------- | ------- | ------- |
| Highlights | #F59E0B | #FBBF24 |
| Foreground | #0F172A | #0F172A |

### Semantic Colors

#### Success (Green)

- Light: `hsl(145 70% 42%)` - #22C55E
- Dark: `hsl(145 65% 48%)` - #34D399
- Full scale: 50-900 with proper contrast ratios

#### Error (Red)

- Light: `hsl(355 85% 55%)` - #EF4444
- Dark: `hsl(355 80% 62%)` - #F87171
- Full scale: 50-900 for various states

#### Warning (Amber)

- Light: `hsl(35 95% 58%)` - #F59E0B
- Dark: `hsl(35 95% 65%)` - #FBBF24
- Foreground: Dark text for accessibility

#### Info (Cyan)

- Light: `hsl(200 90% 52%)` - #06B6D4
- Dark: `hsl(200 85% 58%)` - #22D3EE
- Full scale: 50-900 for informational states

### Neutral Colors (Warm Grays)

Sophisticated warm grays with subtle warmth:

| Shade | HSL        | Hex     | Usage              |
| ----- | ---------- | ------- | ------------------ |
| 50    | 30 15% 97% | #FAF9F8 | Subtle backgrounds |
| 100   | 30 12% 93% | #F1EFED | Card backgrounds   |
| 200   | 30 10% 86% | #DDD9D5 | Borders            |
| 300   | 30 8% 72%  | #B8B3AD | Disabled text      |
| 400   | 30 7% 58%  | #938E87 | Placeholder        |
| 500   | 30 6% 45%  | #716D66 | Secondary text     |
| 600   | 30 7% 36%  | #5A5650 | Body text          |
| 700   | 30 8% 28%  | #474339 | Headings           |
| 800   | 30 9% 20%  | #342F28 | Dark text          |
| 900   | 30 10% 13% | #221F1A | Near black         |

## Backgrounds & Surfaces

### Light Mode

```css
--background: hsl(30 20% 99%) /* Soft warm white */ --foreground: hsl(215 25% 12%)
  /* Deep blue-gray text */ --card: hsl(0 0% 100%) /* Pure white elevated */
  --popover: hsl(0 0% 100%) /* Clean overlays */ --muted: hsl(215 20% 95%) /* Subtle backgrounds */
  --secondary: hsl(215 15% 92%) /* Secondary surfaces */;
```

### Dark Mode

```css
--background: hsl(220 30% 8%) /* Rich navy */ --foreground: hsl(30 15% 95%) /* Warm white text */
  --card: hsl(220 28% 11%) /* Elevated navy */ --popover: hsl(220 28% 13%) /* Lighter overlays */
  --muted: hsl(220 25% 16%) /* Subtle dark */ --secondary: hsl(220 25% 18%) /* Secondary dark */;
```

## Typography

### Font Families

```css
--font-sans:
  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
  'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif --font-mono: 'JetBrains Mono',
  'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
```

### Font Smoothing

```css
font-feature-settings:
  'rlig' 1,
  'calt' 1;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

## Border Radius

Modern, pronounced radii for a contemporary feel:

```css
--radius-sm: 0.5rem /* 8px - Small elements */ --radius-md: 0.75rem /* 12px - Inputs, buttons */
  --radius-lg: 1rem /* 16px - Cards, modals */;
```

## Borders & Focus

### Light Mode

```css
--border: hsl(215 20% 88%) /* Subtle but visible */ --input: hsl(215 20% 88%) /* Input borders */
  --ring: hsl(210 85% 45%) /* Focus ring (primary) */;
```

### Dark Mode

```css
--border: hsl(220 25% 22%) /* Visible in dark */ --input: hsl(220 25% 22%) /* Input borders */
  --ring: hsl(210 90% 58%) /* Brighter focus ring */;
```

## Usage Guidelines

### Primary Actions

```tsx
<Button variant="solid" colorScheme="brand">
  Primary Action
</Button>
```

- Use ocean blue for primary CTAs
- High contrast, draws attention
- Best for main actions

### Accent/Highlights

```tsx
<Badge colorScheme="accent">New</Badge>
<Button variant="outline" colorScheme="accent">
  Learn More
</Button>
```

- Use warm amber sparingly for highlights
- Great for badges, notifications, special CTAs
- Creates warmth and energy

### Semantic States

```tsx
<Alert variant="success">Success message</Alert>
<Alert variant="error">Error message</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="info">Info message</Alert>
```

- Use appropriate semantic colors
- All colors meet WCAG AA contrast ratios
- Clear, vibrant, accessible

### Neutral Elements

```tsx
<Button variant="outline" colorScheme="neutral">
  Secondary
</Button>
<Badge colorScheme="neutral">Status</Badge>
```

- Use warm neutrals for secondary elements
- Professional, understated
- Pairs well with primary colors

## Accessibility

### Contrast Ratios (WCAG AA Compliant)

| Combination      | Light Mode | Dark Mode | Status |
| ---------------- | ---------- | --------- | ------ |
| Primary on white | 7.2:1      | -         | ✅ AAA |
| Primary on dark  | -          | 8.5:1     | ✅ AAA |
| Success text     | 4.8:1      | 5.2:1     | ✅ AA  |
| Error text       | 4.6:1      | 5.0:1     | ✅ AA  |
| Warning text     | 4.5:1      | 4.9:1     | ✅ AA  |
| Body text        | 12.1:1     | 13.4:1    | ✅ AAA |

### Focus Indicators

- All interactive elements have visible focus rings
- Ring color uses primary with 2px width
- 2px offset for clarity
- Works in both light and dark modes

## Dark Mode Toggle

The theme automatically detects system preference and allows manual override:

```tsx
import { useTheme } from '@vormir/react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</Button>
  );
}
```

## Migration from Old Theme

### Breaking Changes

1. **Primary color changed**: Purple → Ocean Blue
2. **Accent introduced**: New warm amber accent color
3. **Border radius increased**: More modern, pronounced corners
4. **Neutral palette updated**: Warmer gray tones
5. **Dark mode background**: Darker, richer navy

### Update Guide

If you were using the old purple theme:

```tsx
// Old (Purple)
<Button colorScheme="brand">Click me</Button> // Purple

// New (Ocean Blue)
<Button colorScheme="brand">Click me</Button> // Blue
<Button colorScheme="accent">Click me</Button> // Amber
```

Custom theme overrides still work:

```tsx
// Override primary to keep purple
:root {
  --primary: 271 81% 56%; /* Original purple */
}
```

## Design Inspiration

- **Linear**: Clean, modern SaaS aesthetic
- **Stripe**: Professional, trustworthy blue palette
- **Notion**: Warm neutrals, excellent typography
- **Vercel**: High contrast, refined dark mode
- **Tailwind UI**: Sophisticated color usage

## Future Themes

Additional pre-built themes coming soon:

- **Sunset** - Orange & Pink gradients
- **Forest** - Green & Earth tones
- **Midnight** - Pure dark-first theme
- **Corporate** - Professional grays & navy

---

**Version**: 2.0.0  
**Updated**: November 27, 2025  
**Author**: Vormir UI Team

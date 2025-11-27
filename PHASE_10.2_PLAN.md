# Phase 10.2: Advanced Theme Customization

**Status:** 📋 Planning  
**Date:** November 27, 2025  
**Dependencies:** Phase 10 (Multi-theme System)

## Overview

Extend the theme system beyond color palettes to include comprehensive UI customization including typography, spacing, border radius, shadows, transitions, and component-specific styling. Each theme should have a unique visual personality through these additional design tokens.

## Current State

✅ **Completed in Phase 10:**
- 5 color themes (Ocean, Forest, Sunset, Midnight, Corporate)
- Color palettes with semantic scales
- Light/dark mode support
- Basic border radius variables (`--radius-lg`, `--radius-md`, `--radius-sm`)

❌ **Missing:**
- Typography system (font families, sizes, weights, line heights)
- Spacing/padding scale
- Shadow system
- Transition/animation timings
- Component-specific border radius
- Focus ring styles
- Component size variants per theme

## Goals

Create a comprehensive design system where each theme has:

1. **Typography System**
   - Font families (heading, body, mono)
   - Font size scale (xs → 5xl)
   - Font weights (normal, medium, semibold, bold)
   - Line heights
   - Letter spacing

2. **Spacing System**
   - Consistent spacing scale (0.5 → 96)
   - Component-specific padding
   - Gap/margin utilities

3. **Border & Radius**
   - Multiple radius values (none, sm, base, md, lg, xl, 2xl, full)
   - Component-specific radius (buttons, cards, inputs)
   - Border widths

4. **Shadow System**
   - Elevation levels (xs, sm, base, md, lg, xl, 2xl)
   - Glow effects for focus states
   - Theme-specific shadow colors

5. **Transitions & Animations**
   - Duration scale (75ms → 1000ms)
   - Easing functions
   - Component-specific animations

6. **Focus & Interaction States**
   - Focus ring styles (width, offset, color)
   - Hover states
   - Active states
   - Disabled states

## Theme Personalities

### 🌊 Ocean Theme
- **Typography:** Modern sans-serif (Inter, System UI)
- **Radius:** Rounded (8px/12px/16px) - Friendly but professional
- **Shadows:** Soft, subtle elevation
- **Transitions:** Smooth (200-300ms)
- **Style:** Clean, modern, approachable

### 🌲 Forest Theme
- **Typography:** Organic, slightly rounded (Nunito, Rounded sans)
- **Radius:** Very rounded (12px/16px/24px) - Soft, natural
- **Shadows:** Diffused, warm-tinted
- **Transitions:** Gentle (250-400ms)
- **Style:** Calm, organic, flowing

### 🌅 Sunset Theme
- **Typography:** Bold, expressive (Poppins, geometric sans)
- **Radius:** Mixed (sharp cards, rounded buttons)
- **Shadows:** Strong, dramatic with color tints
- **Transitions:** Energetic (150-250ms)
- **Style:** Bold, dynamic, playful

### 🌙 Midnight Theme
- **Typography:** Futuristic, tech-focused (Space Grotesk, monospace)
- **Radius:** Sharp (2px/4px/6px) - Angular, tech aesthetic
- **Shadows:** Neon glows, strong contrast
- **Transitions:** Snappy (100-200ms)
- **Style:** Futuristic, high-tech, gaming

### 💼 Corporate Theme
- **Typography:** Traditional serif for headings (Georgia, serif)
- **Radius:** Conservative (4px/6px/8px) - Minimal curves
- **Shadows:** Crisp, minimal
- **Transitions:** Professional (200ms consistent)
- **Style:** Formal, trustworthy, traditional

## Implementation Plan

### Task 1: Typography System (2-3 hours)

Create typography tokens for each theme:

```css
[data-theme='ocean'] {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Georgia', serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### Task 2: Spacing System (1-2 hours)

Define spacing scale and component padding:

```css
[data-theme='ocean'] {
  /* Spacing Scale */
  --space-0: 0;
  --space-0-5: 0.125rem;   /* 2px */
  --space-1: 0.25rem;      /* 4px */
  --space-2: 0.5rem;       /* 8px */
  --space-3: 0.75rem;      /* 12px */
  --space-4: 1rem;         /* 16px */
  --space-5: 1.25rem;      /* 20px */
  --space-6: 1.5rem;       /* 24px */
  --space-8: 2rem;         /* 32px */
  --space-10: 2.5rem;      /* 40px */
  --space-12: 3rem;        /* 48px */
  --space-16: 4rem;        /* 64px */
  --space-20: 5rem;        /* 80px */
  --space-24: 6rem;        /* 96px */
  
  /* Component Padding */
  --button-padding-sm: var(--space-2) var(--space-3);
  --button-padding-md: var(--space-3) var(--space-4);
  --button-padding-lg: var(--space-4) var(--space-6);
  
  --card-padding: var(--space-6);
  --input-padding: var(--space-3) var(--space-4);
}
```

### Task 3: Border Radius System (1 hour)

Extend radius tokens for components:

```css
[data-theme='ocean'] {
  /* Base Radius */
  --radius-none: 0;
  --radius-sm: 0.5rem;     /* 8px */
  --radius-base: 0.625rem; /* 10px */
  --radius-md: 0.75rem;    /* 12px */
  --radius-lg: 1rem;       /* 16px */
  --radius-xl: 1.25rem;    /* 20px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
  
  /* Component Radius */
  --button-radius: var(--radius-md);
  --card-radius: var(--radius-lg);
  --input-radius: var(--radius-md);
  --badge-radius: var(--radius-full);
  --avatar-radius: var(--radius-full);
  --dialog-radius: var(--radius-xl);
}

/* Midnight theme - sharp/angular */
[data-theme='midnight'] {
  --radius-sm: 0.125rem;   /* 2px */
  --radius-base: 0.25rem;  /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  /* ... */
}

/* Forest theme - very rounded */
[data-theme='forest'] {
  --radius-sm: 0.75rem;    /* 12px */
  --radius-base: 1rem;     /* 16px */
  --radius-md: 1.25rem;    /* 20px */
  --radius-lg: 1.5rem;     /* 24px */
  /* ... */
}
```

### Task 4: Shadow System (2 hours)

Create elevation levels with theme-specific colors:

```css
[data-theme='ocean'] {
  /* Shadow Colors */
  --shadow-color: 210 40% 20%;
  --shadow-color-strong: 210 50% 10%;
  
  /* Elevation Levels */
  --shadow-xs: 0 1px 2px 0 hsl(var(--shadow-color) / 0.05);
  --shadow-sm: 0 1px 3px 0 hsl(var(--shadow-color) / 0.1),
               0 1px 2px -1px hsl(var(--shadow-color) / 0.1);
  --shadow-base: 0 4px 6px -1px hsl(var(--shadow-color) / 0.1),
                 0 2px 4px -2px hsl(var(--shadow-color) / 0.1);
  --shadow-md: 0 10px 15px -3px hsl(var(--shadow-color) / 0.1),
               0 4px 6px -4px hsl(var(--shadow-color) / 0.1);
  --shadow-lg: 0 20px 25px -5px hsl(var(--shadow-color) / 0.1),
               0 8px 10px -6px hsl(var(--shadow-color) / 0.1);
  --shadow-xl: 0 25px 50px -12px hsl(var(--shadow-color) / 0.25);
  --shadow-2xl: 0 50px 100px -20px hsl(var(--shadow-color) / 0.25);
  
  /* Focus/Glow Effects */
  --shadow-focus: 0 0 0 3px hsl(var(--primary) / 0.2);
  --shadow-glow: 0 0 20px hsl(var(--primary) / 0.3);
}

/* Midnight theme - neon glows */
[data-theme='midnight'] {
  --shadow-focus: 0 0 0 2px hsl(var(--primary)),
                  0 0 20px hsl(var(--primary) / 0.5);
  --shadow-glow: 0 0 30px hsl(var(--primary) / 0.6),
                 0 0 60px hsl(var(--accent) / 0.3);
}

/* Sunset theme - colorful shadows */
[data-theme='sunset'] {
  --shadow-base: 0 4px 6px -1px hsl(15 40% 30% / 0.15),
                 0 2px 4px -2px hsl(340 40% 30% / 0.1);
}
```

### Task 5: Transitions & Animations (1-2 hours)

Define timing and easing:

```css
[data-theme='ocean'] {
  /* Duration */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
  
  /* Easing Functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* Component Transitions */
  --transition-base: var(--duration-200) var(--ease-out);
  --transition-button: var(--duration-150) var(--ease-out);
  --transition-dialog: var(--duration-300) var(--ease-out);
  --transition-tooltip: var(--duration-100) var(--ease-out);
}

/* Midnight theme - snappy */
[data-theme='midnight'] {
  --transition-base: var(--duration-150) var(--ease-out);
  --transition-button: var(--duration-100) var(--ease-out);
}

/* Forest theme - gentle */
[data-theme='forest'] {
  --transition-base: var(--duration-300) var(--ease-out);
  --transition-button: var(--duration-250) var(--ease-out);
}
```

### Task 6: Focus & Interaction States (1 hour)

Define focus rings and state styles:

```css
[data-theme='ocean'] {
  /* Focus Ring */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: hsl(var(--primary) / 0.6);
  
  /* Hover States */
  --hover-opacity: 0.9;
  --hover-scale: 1.02;
  
  /* Active States */
  --active-opacity: 0.95;
  --active-scale: 0.98;
  
  /* Disabled States */
  --disabled-opacity: 0.5;
  --disabled-cursor: not-allowed;
}

/* Midnight theme - glowing focus */
[data-theme='midnight'] {
  --focus-ring-width: 2px;
  --focus-ring-offset: 0px;
  --focus-ring-color: hsl(var(--primary));
  --focus-ring-glow: 0 0 20px hsl(var(--primary) / 0.5);
}
```

### Task 7: Update Component Styles (3-4 hours)

Modify component CSS to use theme tokens:

**Before:**
```tsx
// Button.tsx
<button className="rounded-md px-4 py-2 shadow-sm transition-colors" />
```

**After:**
```tsx
// Button component should respect theme tokens
<button 
  style={{
    borderRadius: 'var(--button-radius)',
    padding: 'var(--button-padding-md)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition-button)',
    fontFamily: 'var(--font-sans)',
  }}
/>
```

Update these components:
- ✅ Button
- ✅ Input
- ✅ Card
- ✅ Badge
- ✅ Alert
- ✅ Dialog/Modal
- ✅ Tooltip
- ✅ Select
- ✅ Checkbox
- ✅ Radio
- ✅ Switch

### Task 8: Tailwind Configuration (1 hour)

Extend Tailwind config to use theme tokens:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        // ... rest of scale
      },
      spacing: {
        // Use CSS variables
        0.5: 'var(--space-0-5)',
        1: 'var(--space-1)',
        // ... rest
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        base: 'var(--radius-base)',
        md: 'var(--radius-md)',
        // ... rest
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        // ... rest
      },
      transitionDuration: {
        75: 'var(--duration-75)',
        100: 'var(--duration-100)',
        // ... rest
      },
    },
  },
}
```

### Task 9: Documentation (1-2 hours)

Update THEMES.md with:
- Typography system explanation
- Spacing guidelines
- Shadow usage examples
- Transition best practices
- Component customization guide
- Migration guide for existing users

### Task 10: Storybook Enhancement (1 hour)

Add Storybook controls to preview:
- Font size preview
- Spacing visualization
- Shadow levels comparison
- Animation speed controls

## Success Criteria

✅ Each theme has unique visual personality beyond colors  
✅ Typography scales are consistent and readable  
✅ Spacing follows 4px/8px grid system  
✅ Shadows create proper elevation hierarchy  
✅ Transitions feel natural and themed  
✅ Focus states are accessible (WCAG 2.4.7)  
✅ All 46 components use theme tokens  
✅ Tailwind utilities respect theme variables  
✅ Documentation covers all new tokens  
✅ Storybook demos showcase differences

## Timeline Estimate

**Total:** 14-18 hours (2-3 days)

- Task 1: Typography System - 2-3h
- Task 2: Spacing System - 1-2h
- Task 3: Border Radius - 1h
- Task 4: Shadow System - 2h
- Task 5: Transitions - 1-2h
- Task 6: Focus States - 1h
- Task 7: Component Updates - 3-4h
- Task 8: Tailwind Config - 1h
- Task 9: Documentation - 1-2h
- Task 10: Storybook - 1h

## Breaking Changes

⚠️ **Potential Breaking Changes:**

1. Component styles may shift if they were using hardcoded values
2. Spacing might change slightly with new scale
3. Border radius will vary significantly per theme
4. Shadow intensity might differ

**Migration Strategy:**
- Provide fallback values for all new tokens
- Create migration guide with before/after examples
- Add deprecation warnings for hardcoded styles
- Version bump to v2.0.0 for major changes

## Future Enhancements

After Phase 10.2:
- Custom theme builder UI
- Theme preview generator
- Export themes as JSON/CSS
- Community theme marketplace
- Per-component theme overrides
- CSS-in-JS theme provider alternative
- Theme A/B testing utilities

## References

- [Material Design Type System](https://material.io/design/typography)
- [Tailwind CSS Customization](https://tailwindcss.com/docs/theme)
- [Radix UI Themes](https://www.radix-ui.com/themes/docs/theme/overview)
- [Chakra UI Theme](https://chakra-ui.com/docs/styled-system/theme)
- [shadcn/ui Themes](https://ui.shadcn.com/themes)

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-XX

### 🎉 Initial Release

First public release of @vormir/react - A modern, accessible, and customizable React UI component library.

### ✨ Features

#### Core Features
- **TypeScript First** - Fully typed components with excellent IntelliSense support
- **Accessibility** - WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly
- **Dark Mode** - Built-in light/dark mode support with seamless switching
- **Theming System** - 5 pre-built themes (default, ocean, forest, sunset, midnight, corporate) with 160+ design tokens each
- **Tree-shakeable** - Optimized bundle sizes with ESM and CJS support
- **Responsive Design** - Mobile-first approach across all components
- **Animations** - Smooth transitions powered by Framer Motion

#### Component Library (47 Components)

**Primitives (6)**
- Box - Polymorphic container component
- Text - Typography with variants
- Button - Interactive buttons with multiple variants
- Input - Text input fields
- Label - Form labels
- Slot - Composition primitive

**Layout Components (4)**
- Container - Responsive max-width container
- Flex - Flexbox layout
- Grid - CSS Grid layout
- Stack - Vertical/horizontal stack with spacing

**Form Components (9)**
- Checkbox - Accessible checkbox inputs
- Radio - Radio button groups
- Switch - Toggle switches
- Select - Dropdown select menus
- Textarea - Multi-line text inputs
- FormControl - Form field wrapper with validation
- FormErrorMessage - Error message display
- FormHelperText - Helper text for forms
- FormLabel - Enhanced form labels

**Feedback Components (8)**
- Alert - Inline notifications with variants
- Toast - Temporary toast notifications
- Modal - Accessible modal dialogs
- Drawer - Slide-out panels
- Tooltip - Contextual help text
- Popover - Floating content containers
- Progress - Progress indicators (bar and circular)
- Skeleton - Loading placeholders

**Navigation Components (6)**
- Menu - Dropdown menus
- Tabs - Tabbed interfaces
- Breadcrumbs - Navigation trails
- Pagination - Page navigation
- Sidebar - Side navigation with nested items
- CommandPalette - Keyboard-driven command interface

**Data Display Components (10)**
- Card - Content containers with header/body/footer
- Badge - Status indicators and labels
- Avatar - User profile images with fallbacks
- Accordion - Collapsible content sections
- List - Ordered and unordered lists
- Table - Data tables with sorting
- Timeline - Event timelines
- Stat - Statistical displays
- Code - Syntax highlighted code blocks
- Kbd - Keyboard shortcut display

**Advanced Components (4)**
- DatePicker - Date selection with calendar
- ColorPicker - Color selection tool
- Slider - Range input sliders
- Combobox - Searchable select with autocomplete

### 🎨 Theming

- **5 Pre-built Themes**: Default, Ocean, Forest, Sunset, Midnight, Corporate
- **160+ Design Tokens** per theme covering:
  - Colors (brand, accent, neutral, semantic)
  - Typography (font families, sizes, weights, line heights)
  - Spacing scale
  - Border radii
  - Shadows
  - Z-index layers
- **CSS Variables** - Runtime theme switching without rebuilds
- **Custom Themes** - Extensible theme system for custom branding

### 📦 Package Features

- **Dual Module Support** - ESM and CommonJS builds
- **Type Declarations** - Complete TypeScript definitions (.d.ts)
- **Optimized Exports** - Separate exports for core components and theme
- **Peer Dependencies** - React 18+ support
- **Tailwind CSS Integration** - Seamless integration with Tailwind

### 📚 Documentation

- Comprehensive README with installation and usage examples
- Component API documentation with TypeScript types
- Theming guide with customization examples
- Storybook integration with 15+ example stories

### 🔧 Development Tools

- **Storybook** - Interactive component playground
- **Vitest** - Unit testing setup
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Turborepo** - Optimized monorepo builds

### 🚀 Build System

- **Vite** - Lightning-fast builds
- **PostCSS** - CSS processing with Tailwind
- **TypeScript 5.x** - Latest TypeScript features
- **Tree-shaking** - Dead code elimination

### 📝 Repository

- MIT License
- Contributing guidelines
- Code of conduct
- Issue and PR templates

---

## Future Releases

See our [PROJECT_ROADMAP.md](../../PROJECT_ROADMAP.md) for planned features and improvements.

### Planned for 0.2.0
- Additional form validation features
- More animation presets
- Performance optimizations
- Additional accessibility improvements
- Expanded test coverage

### Under Consideration
- React Server Components support
- Additional component variants
- More pre-built themes
- Component composition utilities
- Advanced form builders

---

**Note**: This is the initial release. While we've tested thoroughly, please report any issues on our [GitHub Issues](https://github.com/vignesh7797/vormir-react/issues) page.

[0.1.0]: https://github.com/vignesh7797/vormir-react/releases/tag/v0.1.0

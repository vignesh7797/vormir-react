# Vormir UI

<div align="center">

**A modern, customizable, and accessible React UI library**

[![npm version](https://img.shields.io/npm/v/@vormir/react.svg)](https://www.npmjs.com/package/@vormir/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb)](https://reactjs.org/)

Built with TypeScript, Tailwind CSS, and Radix UI primitives

[Documentation](#documentation) · [Components](#components) · [Examples](#examples) · [Contributing](CONTRIBUTING.md)

</div>

---

## ✨ Features

- 🎨 **Modern Design** - Beautiful, contemporary aesthetics with smooth animations
- 🌓 **Light & Dark Mode** - Built-in theme support with system preference detection
- ♿ **Accessibility First** - WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly
- 🎯 **TypeScript** - Fully typed with comprehensive type definitions
- 🎭 **Customizable** - Extensive theming system with design tokens
- 📦 **Tree-shakeable** - Import only what you need
- 🚀 **Performance** - Optimized bundle sizes and runtime performance
- 🔧 **Developer Experience** - Intuitive API with excellent autocomplete
- 🎪 **Headless UI** - Built on Radix UI primitives for maximum flexibility

## 📦 Installation

```bash
# npm
npm install @vormir/react

# pnpm
pnpm add @vormir/react

# yarn
yarn add @vormir/react
```

## 🚀 Quick Start

```tsx
import { 
  ThemeProvider, 
  Container, 
  Stack, 
  Text, 
  Input, 
  Label, 
  Button 
} from '@vormir/react';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Container maxWidth="md">
        <Stack spacing={6}>
          <Text size="3xl" weight="bold" align="center">
            Welcome to Vormir UI
          </Text>
          
          <Stack spacing={4}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
              />
            </div>
            
            <Button variant="solid" colorScheme="brand" fullWidth>
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
```

### Phase 6 Components Usage

```tsx
import { 
  Slider, 
  Drawer, 
  Popover, 
  ContextMenu,
  Combobox,
  MultiSelect,
  DatePicker,
  ColorPicker,
  Button
} from '@vormir/react';
import { useState } from 'react';

// Slider - Range input
function SliderExample() {
  const [value, setValue] = useState(50);
  return (
    <Slider 
      min={0} 
      max={100} 
      value={value} 
      onChange={setValue}
      showTooltip
      marks={[0, 25, 50, 75, 100]}
    />
  );
}

// Drawer - Side panel
function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Drawer Title"
        position="right"
        size="md"
      >
        <p>Drawer content goes here</p>
      </Drawer>
    </>
  );
}

// Combobox - Autocomplete
function ComboboxExample() {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
  return (
    <Combobox
      options={options}
      placeholder="Select a fruit..."
      allowCustom
    />
  );
}

// DatePicker - Calendar
function DatePickerExample() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker
      mode="single"
      value={date}
      onChange={setDate}
    />
  );
}

// ColorPicker - Color selection
function ColorPickerExample() {
  const [color, setColor] = useState('#3b82f6');
  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      showRgbInputs
    />
  );
}
```

## 🎨 Components

Vormir UI provides a comprehensive set of components:

### Foundation
- **ThemeProvider** - Theme management with light/dark mode
- **Button** - Interactive button with multiple variants

### Primitives (✅ Phase 1)
- **Box** - Polymorphic container component
- **Text** - Typography with 14 sizes, 9 weights, 6 colors
- **Input** - Text input with 3 variants and validation states
- **Label** - Form label with required indicator

### Layout (✅ Phase 1)
- **Container** - Responsive container with 6 max-width options
- **Grid** - CSS Grid system with 12-column layout
- **Flex** - Flexbox container with full alignment control
- **Stack** - Vertical/horizontal spacing component

### Form Components (✅ Phase 2)
- **Checkbox** - Checkbox with indeterminate state and 3 sizes
- **RadioGroup** - Radio buttons with vertical/horizontal orientation
- **Switch** - Toggle switch with smooth animations
- **Textarea** - Multi-line input with auto-resize support
- **Select** - Dropdown with groups, search, and keyboard navigation
- **FormControl** - Form wrapper with context (isRequired, isInvalid, etc.)
- **FormErrorMessage** - Error display with icon
- **FormHelperText** - Helper text for form guidance

### Feedback Components (✅ Phase 3)
- **Alert** - Notification banners with 5 variants and closable option
- **Toast** - Temporary notifications with provider, 6 positions, auto-dismiss
- **Modal/Dialog** - Overlay with focus trap, ESC key, body scroll lock
- **Tooltip** - Contextual help with 4 positions and custom delays
- **Progress** - Linear and circular progress indicators with variants
- **Skeleton** - Loading placeholders with pulse animation

### Navigation Components (✅ Phase 4)
- **Menu** - Dropdown menus with submenus, keyboard navigation, 6 positions
- **Tabs** - Tabbed interface with 3 variants (default, pills, enclosed)
- **Breadcrumbs** - Navigation trails with collapsing and custom separators
- **Pagination** - Page navigation with info display and size selector
- **Sidebar** - Collapsible side navigation with overlay mode
- **CommandPalette** - Keyboard-driven command menu (⌘K) with search

### Data Display Components (✅ Phase 5)
- **Card** - Content container with 4 variants, image support, interactive mode
- **Badge** - Status indicators with 4 variants, 6 colors, removable option
- **Avatar** - User profile images with fallbacks, status indicators, groups
- **Accordion** - Collapsible sections with single/multiple mode
- **List** - Styled lists with icons, hover effects, custom spacing
- **Table** - Data tables with sorting, selection, striped variants
- **Timeline** - Event timeline with colors, icons, solid variant
- **Stat** - Statistical display with trends, icons, 3 variants
- **Code** - Syntax-highlighted code with line numbers and copy button
- **Kbd** - Keyboard shortcut display

### Advanced Input & Media Components (✅ Phase 6)
- **Slider** - Range slider with single/dual thumbs, keyboard navigation, marks
- **Drawer** - Side panel overlay with 4 positions, 4 sizes, animations
- **Popover** - Floating content container with positioning and arrow
- **ContextMenu** - Right-click menu with submenus and keyboard shortcuts
- **Combobox** - Autocomplete input with search and custom values
- **MultiSelect** - Multi-selection dropdown with checkboxes and badges
- **DatePicker** - Calendar with single/range mode and date constraints
- **ColorPicker** - Color selection with presets, HEX/RGB inputs

### Coming Soon (Phase 7+)
- Advanced (Carousel, FileUpload, Transfer, TreeSelect)
- And many more...

## 🎭 Theme Customization

Vormir UI uses CSS variables for theming, making it easy to customize:

```tsx
import { ThemeProvider } from '@vormir/react';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

Toggle theme programmatically:

```tsx
import { useTheme } from '@vormir/react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

## 📚 Documentation

Full documentation is coming soon! For now, check out:

- [Project Roadmap](PROJECT_ROADMAP.md) - Complete development plan
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/vignesh7797/vormir-react.git
cd vormir-react

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run tests
pnpm test

# Run Storybook (coming soon)
pnpm storybook
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [Vignesh](LICENSE)

## 🙏 Acknowledgments

Built with inspiration from:
- [Radix UI](https://radix-ui.com/) - Accessible component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component architecture
- [Chakra UI](https://chakra-ui.com/) - Developer experience
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📞 Support

- 🐛 [Report a bug](https://github.com/vignesh7797/vormir-react/issues/new?labels=bug)
- 💡 [Request a feature](https://github.com/vignesh7797/vormir-react/issues/new?labels=enhancement)
- 💬 [Discussions](https://github.com/vignesh7797/vormir-react/discussions)

---

<div align="center">

**Built with ❤️ by [Vignesh](https://github.com/vignesh7797)**

[⭐ Star us on GitHub](https://github.com/vignesh7797/vormir-react)

</div>

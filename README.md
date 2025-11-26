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

### Coming Soon (Phase 3+)
- Feedback (Alert, Toast, Modal, Tooltip, Progress, Skeleton)
- Navigation (Menu, Tabs, Breadcrumbs, Pagination)
- Data Display (Card, Table, Badge, Avatar, Accordion)
- Advanced (DatePicker, Carousel, FileUpload, CommandMenu)
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

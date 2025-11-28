# 🎉 @vormir-tech/react v0.1.0 - Initial Release

We're thrilled to announce the first public release of **@vormir-tech/react** - a modern, accessible, and customizable React UI component library!

## 📦 Installation

```bash
npm install @vormir-tech/react
# or
pnpm add @vormir-tech/react
# or
yarn add @vormir-tech/react
```

## ✨ What's Included

### Core Features
- **47 Production-Ready Components** - Comprehensive UI toolkit covering all common use cases
- **TypeScript First** - Fully typed with excellent IntelliSense support
- **Accessibility Built-in** - WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly
- **Dark Mode Support** - Seamless light/dark mode switching with 5 pre-built themes
- **Tree-shakeable** - Optimized bundle sizes with ESM and CJS support
- **Modern Stack** - Built with React 18+, Tailwind CSS, and Radix UI primitives

### Component Categories

**🎨 Primitives (6 components)**
- Box, Text, Button, Input, Label, Slot

**📐 Layout (4 components)**
- Container, Flex, Grid, Stack

**📝 Forms (9 components)**
- Checkbox, Radio, Switch, Select, Textarea, FormControl, FormErrorMessage, FormHelperText, FormLabel

**💬 Feedback (8 components)**
- Alert, Toast, Modal, Drawer, Tooltip, Popover, Progress, Skeleton

**🧭 Navigation (6 components)**
- Menu, Tabs, Breadcrumbs, Pagination, Sidebar, CommandPalette

**📊 Data Display (10 components)**
- Card, Badge, Avatar, Accordion, List, Table, Timeline, Stat, Code, Kbd

**🚀 Advanced (4 components)**
- DatePicker, ColorPicker, Slider, Combobox

### 🎨 Theming System

5 beautiful pre-built themes with 160+ design tokens each:
- **Default** - Clean, modern neutral theme
- **Ocean** - Calming blue and teal tones
- **Forest** - Natural green and earth colors  
- **Sunset** - Warm orange and pink gradients
- **Midnight** - Sophisticated dark-first design
- **Corporate** - Professional, minimal aesthetic

Each theme includes:
- Complete color palettes (brand, accent, neutral, semantic)
- Typography scale (font families, sizes, weights, line heights)
- Spacing system
- Border radii
- Elevation shadows
- CSS variables for runtime switching

### 📚 Documentation

- ✅ Comprehensive README with examples
- ✅ Detailed CHANGELOG documenting all features
- ✅ Contributing guidelines
- ✅ GitHub issue and PR templates
- ✅ Storybook integration with 15+ example stories
- ✅ Complete TypeScript definitions

### 🔧 Package Details

- **Package Name:** `@vormir-tech/react`
- **Version:** 0.1.0
- **Size:** 305.2 KB (compressed), 1.5 MB (unpacked)
- **License:** MIT
- **Bundle Formats:** ESM + CommonJS
- **Type Definitions:** ✅ Included

## 🚀 Quick Start

```tsx
import { ThemeProvider, Button } from '@vormir-tech/react';

function App() {
  return (
    <ThemeProvider defaultTheme="ocean">
      <Button variant="solid" colorScheme="brand">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

### Dark Mode

```tsx
import { ThemeProvider, useTheme, Button } from '@vormir-tech/react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
}
```

## 🎯 Use Cases

Perfect for:
- ✅ Enterprise dashboards and admin panels
- ✅ SaaS applications
- ✅ Marketing websites and landing pages
- ✅ E-commerce platforms
- ✅ Content management systems
- ✅ Internal tools and utilities
- ✅ Rapid prototyping

## 📦 What's Next?

This is just the beginning! Here's what's planned for future releases:

### v0.2.0 (Coming Soon)
- Additional form validation features
- More animation presets
- Performance optimizations
- Expanded test coverage
- More component variants

### Future Roadmap
- Custom documentation site with live playground
- React Server Components support
- Additional pre-built themes
- Advanced form builders
- Chart and data visualization components

## 🙏 Acknowledgments

Built with inspiration from amazing projects:
- [Radix UI](https://radix-ui.com/) - Accessible component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component architecture
- [Chakra UI](https://chakra-ui.com/) - Developer experience
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/vignesh7797/vormir-react/blob/main/CONTRIBUTING.md) for details.

## 🐛 Found a Bug?

Please report issues on our [GitHub Issues](https://github.com/vignesh7797/vormir-react/issues) page.

## 📞 Support

- 📫 **Issues:** [GitHub Issues](https://github.com/vignesh7797/vormir-react/issues)
- 📚 **Documentation:** Check out our comprehensive README
- 💬 **Discussions:** [GitHub Discussions](https://github.com/vignesh7797/vormir-react/discussions) (coming soon)

## 📄 License

MIT © [Vignesh](https://github.com/vignesh7797)

---

**Thank you for trying @vormir-tech/react!** We're excited to see what you build with it. Don't forget to ⭐ star the repository if you find it useful!

## 📊 Stats

- **226 files** in the npm package
- **47 components** ready to use
- **5 themes** out of the box
- **160+ design tokens** per theme
- **100% TypeScript** coverage
- **MIT Licensed** - Free for commercial use

---

**Made with ❤️ by the Vormir team**

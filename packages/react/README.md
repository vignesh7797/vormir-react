# @vormir/react

A modern, accessible, and customizable React UI component library with built-in theming and dark mode support.

[![npm version](https://img.shields.io/npm/v/@vormir/react.svg)](https://www.npmjs.com/package/@vormir/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **47+ Accessible Components** - Comprehensive set of UI components built with accessibility in mind
- 🌓 **Built-in Dark Mode** - Seamless light/dark mode with 5 pre-built themes
- 🎯 **TypeScript First** - Fully typed components with excellent IntelliSense support
- 📦 **Tree-shakeable** - Import only what you need, optimized bundle sizes
- 🎭 **Customizable** - Extensive theming system with CSS variables
- ♿ **Accessible** - WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly
- 🚀 **Modern Stack** - Built with React 18+, Tailwind CSS, and Radix UI primitives
- 📱 **Responsive** - Mobile-first design approach
- 🎬 **Smooth Animations** - Powered by Framer Motion
- 🔧 **Developer Experience** - Excellent DX with comprehensive prop types

## 📦 Installation

```bash
# npm
npm install @vormir/react

# pnpm
pnpm add @vormir/react

# yarn
yarn add @vormir/react
```

### Peer Dependencies

Make sure you have React installed:

```bash
npm install react react-dom
```

### Tailwind CSS Setup

Vormir uses Tailwind CSS for styling. Add the following to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@vormir/react/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Import the global styles in your app:

```tsx
import '@vormir/react/dist/style.css';
```

## 🚀 Quick Start

Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider, Button } from '@vormir/react';

function App() {
  return (
    <ThemeProvider>
      <Button>Click me!</Button>
    </ThemeProvider>
  );
}
```

### Dark Mode

```tsx
import { ThemeProvider, useTheme, Button } from '@vormir/react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

## 📚 Components

### Primitives
- **Box** - Polymorphic container component
- **Text** - Typography component with variants
- **Button** - Interactive button with multiple variants
- **Input** - Text input field
- **Label** - Form label component
- **Slot** - Composition primitive

### Layout
- **Container** - Responsive max-width container
- **Flex** - Flexbox layout
- **Grid** - CSS Grid layout
- **Stack** - Vertical/horizontal stack with spacing

### Form Components
- **Checkbox** - Checkbox input
- **Radio** - Radio button group
- **Switch** - Toggle switch
- **Select** - Dropdown select menu
- **Textarea** - Multi-line text input
- **FormControl** - Form field wrapper with validation
- **FormErrorMessage** - Error message display
- **FormHelperText** - Helper text for form fields

### Feedback
- **Alert** - Inline notifications
- **Toast** - Temporary notifications
- **Modal** - Modal dialogs
- **Drawer** - Slide-out panels
- **Tooltip** - Contextual help text
- **Popover** - Floating content container
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders

### Navigation
- **Menu** - Dropdown menus
- **Tabs** - Tabbed interfaces
- **Breadcrumbs** - Navigation trails
- **Pagination** - Page navigation
- **Sidebar** - Side navigation
- **CommandPalette** - Keyboard-driven command menu

### Data Display
- **Card** - Content containers
- **Badge** - Status indicators
- **Avatar** - User profile images
- **Accordion** - Collapsible content
- **List** - List components
- **Table** - Data tables
- **Timeline** - Event timelines
- **Stat** - Statistical displays
- **Code** - Code blocks
- **Kbd** - Keyboard shortcuts

### Advanced
- **DatePicker** - Date selection
- **ColorPicker** - Color selection
- **Slider** - Range input
- **Combobox** - Searchable select
- **MultiSelect** - Multiple selection
- **ContextMenu** - Right-click menus

## 🎨 Theming

Vormir comes with 5 pre-built themes:

```tsx
import { ThemeProvider } from '@vormir/react';

function App() {
  return (
    <ThemeProvider 
      defaultTheme="ocean" // 'default' | 'ocean' | 'forest' | 'sunset' | 'midnight' | 'corporate'
    >
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Custom Theme

Create your own theme by extending the default theme:

```tsx
const customTheme = {
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      // ... more shades
      900: '#0c4a6e',
    },
  },
  // ... more customization
};

<ThemeProvider theme={customTheme}>
  {/* Your app */}
</ThemeProvider>
```

## 🔧 Usage Examples

### Button Variants

```tsx
import { Button } from '@vormir/react';

<Button variant="solid">Solid Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>

<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Form with Validation

```tsx
import { 
  FormControl, 
  FormLabel, 
  Input, 
  FormErrorMessage,
  Button 
} from '@vormir/react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={!!error}>
        <FormLabel>Email</FormLabel>
        <Input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Data Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@vormir/react';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Toast Notifications

```tsx
import { useToast, Button } from '@vormir/react';

function NotificationDemo() {
  const toast = useToast();

  return (
    <Button 
      onClick={() => {
        toast({
          title: 'Success!',
          description: 'Your changes have been saved.',
          variant: 'success',
        });
      }}
    >
      Show Toast
    </Button>
  );
}
```

## 🎯 TypeScript Support

All components are fully typed with comprehensive TypeScript definitions:

```tsx
import type { ButtonProps } from '@vormir/react';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 📖 Documentation

- **Storybook**: [Coming soon]
- **GitHub**: [https://github.com/vignesh7797/vormir-react](https://github.com/vignesh7797/vormir-react)
- **Examples**: Check the `/examples` folder in the repository

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/vignesh7797/vormir-react/blob/main/CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/vignesh7797/vormir-react.git
cd vormir-react

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run Storybook
pnpm storybook

# Run tests
pnpm test
```

## 📝 License

MIT © [Vignesh](https://github.com/vignesh7797)

## 🙏 Acknowledgments

Built with inspiration from:
- [Radix UI](https://radix-ui.com/) - Accessible component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component architecture
- [Chakra UI](https://chakra-ui.com/) - Developer experience
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 💬 Support

- 📫 Issues: [GitHub Issues](https://github.com/vignesh7797/vormir-react/issues)
- 💡 Discussions: [GitHub Discussions](https://github.com/vignesh7797/vormir-react/discussions)

---

Made with ❤️ by Vignesh

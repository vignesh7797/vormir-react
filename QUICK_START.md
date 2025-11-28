# Quick Start Guide - Vormir UI v1.0.0

## 🚀 Getting Started

### For Contributors

#### 1. Clone and Setup
```bash
git clone https://github.com/vignesh7797/vormir-react.git
cd vormir-react
pnpm install
```

#### 2. Build the packages
```bash
pnpm build
```

#### 3. Verify everything works
```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Test (when tests are added)
pnpm test
```

#### 4. Start developing!
```bash
# Build in watch mode
cd packages/react
pnpm dev

# Or use Storybook (coming soon)
pnpm storybook
```

---

## 📦 For Package Users (After Publishing)

### Installation
```bash
npm install @vormir-tech/react
# or
pnpm add @vormir-tech/react
# or
yarn add @vormir-tech/react
```

### Basic Usage
```tsx
import { ThemeProvider, Button } from '@vormir-tech/react';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="p-8">
        <Button variant="solid" colorScheme="brand">
          Hello Vormir UI!
        </Button>
      </div>
    </ThemeProvider>
  );
}
```

### With Theme Toggle
```tsx
import { ThemeProvider, useTheme, Button } from '@vormir/react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle to {theme === 'light' ? 'dark' : 'light'} mode
    </Button>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <div className="min-h-screen bg-background text-foreground p-8">
        <ThemeToggle />
        <h1 className="text-4xl font-bold mt-8">Welcome to Vormir UI</h1>
      </div>
    </ThemeProvider>
  );
}
```

---

## 🎨 Button Examples

```tsx
import { Button } from '@vormir/react';
import { Save, Download } from 'lucide-react';

function Examples() {
  return (
    <div className="space-y-4">
      {/* Variants */}
      <Button variant="solid">Solid Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>

      {/* Sizes */}
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>

      {/* Color Schemes */}
      <Button colorScheme="brand">Brand</Button>
      <Button colorScheme="success">Success</Button>
      <Button colorScheme="error">Error</Button>
      <Button colorScheme="warning">Warning</Button>

      {/* With Icons */}
      <Button leftIcon={<Save className="h-4 w-4" />}>
        Save
      </Button>
      <Button rightIcon={<Download className="h-4 w-4" />}>
        Download
      </Button>

      {/* Loading State */}
      <Button isLoading>Loading...</Button>

      {/* Disabled */}
      <Button disabled>Disabled</Button>
    </div>
  );
}
```

---

## 🛠️ Development Workflow

### Creating a New Component

1. Create component directory:
```bash
mkdir -p packages/react/src/components/MyComponent
```

2. Create component files:
```typescript
// packages/react/src/components/MyComponent/MyComponent.tsx
import { forwardRef } from 'react';

export interface MyComponentProps {
  children: React.ReactNode;
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

```typescript
// packages/react/src/components/MyComponent/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

3. Export from main index:
```typescript
// packages/react/src/index.ts
export { MyComponent } from './components/MyComponent';
export type { MyComponentProps } from './components/MyComponent';
```

4. Build and test:
```bash
pnpm build
```

---

### Adding a Changeset

When making changes:

```bash
pnpm changeset
```

Choose:
- Package(s) to bump
- Semver bump type (major/minor/patch)
- Description of changes

This will create a changeset file that will be used for versioning and changelog generation.

---

## 📝 Common Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Build specific package
pnpm --filter @vormir/react build

# Watch mode for development
cd packages/react && pnpm dev

# Type check
pnpm typecheck

# Lint
pnpm lint

# Format code
npx prettier --write "**/*.{ts,tsx,md,json}"

# Run tests
pnpm test

# Test in watch mode
pnpm test:watch

# Clean build artifacts
pnpm clean

# Create a changeset
pnpm changeset

# Version packages (updates package.json and CHANGELOG)
pnpm version-packages

# Publish to npm (after versioning)
pnpm release
```

---

## 🔧 Troubleshooting

### Build Errors

**Issue:** TypeScript errors about module resolution
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Issue:** Vite build fails
```bash
# Clear dist and rebuild
cd packages/react
rm -rf dist
pnpm build
```

### Type Errors

**Issue:** "Cannot find module '@/utils'"
- Check that `tsconfig.json` has the path alias configured
- Ensure `baseUrl` is set to "."

### Git Hooks

**Issue:** Pre-commit hook fails
```bash
# Run formatting manually
npx prettier --write "**/*.{ts,tsx,md,json}"

# Run lint manually
pnpm lint
```

---

## 🎯 Current Status (Phase 0 Complete)

### ✅ Available Components
- ThemeProvider
- Button

### ✅ Available Hooks  
- useTheme

### ✅ Available Utilities
- cn (className merging)

### 🚧 Coming Soon (Phase 1)
- Box, Text, Input, Label
- Grid, Flex, Stack, Container
- More components...

---

## 📚 Documentation

- [Project Roadmap](PROJECT_ROADMAP.md) - Complete 27-week development plan
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines
- [Phase 0 Summary](PHASE_0_COMPLETE.md) - Setup completion details

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run `pnpm changeset` to document your changes
6. Push and create a PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📞 Need Help?

- 📖 Check the documentation files
- 🐛 [Open an issue](https://github.com/vignesh7797/vormir-react/issues)
- 💬 [Start a discussion](https://github.com/vignesh7797/vormir-react/discussions)

---

**Happy coding! 🚀**

*Last updated: November 25, 2025*

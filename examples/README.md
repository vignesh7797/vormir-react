# Vormir Examples & Templates

Real-world usage examples demonstrating how to build production-ready applications with Vormir components.

## 📁 Examples

### Landing Page Template
**Location:** `examples/landing-page/LandingPage.tsx`

A complete marketing landing page featuring:
- ✅ Responsive navigation with mobile menu
- ✅ Hero section with gradient text and CTAs
- ✅ Newsletter subscription form
- ✅ Features grid (6 feature cards)
- ✅ Pricing section (3 tier pricing cards)
- ✅ Testimonials with ratings
- ✅ Call-to-action section
- ✅ Footer with links

**Components Used:** Box, Container, Flex, Stack, Text, Button, Card, Input, Grid, Badge, Avatar

**Features Demonstrated:**
- Responsive layouts with Grid and Flex
- Theme-aware components (dark mode support)
- Gradient backgrounds and styling
- Form handling (newsletter)
- Icon integration (lucide-react)
- Mobile-first design

---

### Dashboard Template
**Location:** `examples/dashboard/Dashboard.tsx`

A comprehensive admin dashboard interface featuring:
- ✅ Collapsible sidebar navigation
- ✅ Top header with search and user menu
- ✅ Stats overview cards with trend indicators
- ✅ Data tables with avatars and badges
- ✅ Recent activity feed
- ✅ Responsive layout

**Components Used:** Sidebar, Menu, Table, Avatar, Badge, Card, Grid, Flex, Button, Input

**Features Demonstrated:**
- Complex navigation patterns
- Data visualization layouts
- State management (sidebar, tabs)
- Table with custom cells
- User authentication UI patterns

---

## 🚀 Usage

### 1. Import Components

```tsx
import {
  Box,
  Container,
  Button,
  Card,
  // ... other components
} from '@vormir/react';
```

### 2. Use in Your App

```tsx
import { LandingPage } from './examples/landing-page/LandingPage';

function App() {
  return <LandingPage />;
}
```

### 3. Customize Themes

All examples support theme switching:

```tsx
import { ThemeProvider } from '@vormir/react';

function App() {
  return (
    <ThemeProvider theme="ocean">
      <LandingPage />
    </ThemeProvider>
  );
}
```

Available themes:
- `ocean` (default) - Professional blue/teal
- `forest` - Organic green/earth tones
- `sunset` - Energetic orange/pink
- `midnight` - Sharp, futuristic dark
- `corporate` - Conservative, minimal

---

## 📦 Example Framework Integration

### Next.js App Router

```bash
# Create Next.js app
npx create-next-app@latest my-app
cd my-app

# Install Vormir
npm install @vormir/react

# Copy example
cp examples/landing-page/LandingPage.tsx app/page.tsx
```

### Vite + React

```bash
# Create Vite app
npm create vite@latest my-app -- --template react-ts
cd my-app

# Install Vormir
npm install @vormir/react

# Copy example
cp examples/landing-page/LandingPage.tsx src/App.tsx
```

---

## 🎨 Customization

### Colors

Examples use semantic color tokens that adapt to your theme:

```tsx
<Text color="muted">         // Uses theme muted color
<Box className="bg-primary"> // Uses theme primary color
<Badge variant="success">    // Uses theme success color
```

### Spacing

Use Tailwind utilities or component props:

```tsx
<Stack className="space-y-4">  // Tailwind spacing
<Flex gap={4}>                  // Component prop
<Container maxWidth="xl">       // Predefined breakpoints
```

### Typography

```tsx
<Text size="4xl" weight="bold">
<Text as="h1" size="6xl">
<Text color="muted">
```

---

## 📱 Responsive Design

All examples are mobile-first and responsive:

```tsx
// Grid with responsive columns
<Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Conditional rendering for mobile
<Box className="hidden md:flex">    // Show on desktop
<Box className="md:hidden">          // Show on mobile

// Responsive text sizes
<Text size="xl" className="md:text-2xl lg:text-4xl">
```

---

## 🔍 Component Patterns

### Layout Pattern

```tsx
<Container maxWidth="xl">
  <Grid className="grid-cols-1 md:grid-cols-3 gap-8">
    <Card className="p-6">
      {/* Content */}
    </Card>
  </Grid>
</Container>
```

### Navigation Pattern

```tsx
<Flex className="items-center justify-between">
  {/* Logo */}
  <Flex className="items-center gap-2">...</Flex>
  
  {/* Nav Items */}
  <Flex className="gap-4">...</Flex>
</Flex>
```

### Form Pattern

```tsx
<Stack className="space-y-4">
  <Input placeholder="Email" />
  <Button className="w-full">Submit</Button>
</Stack>
```

### Card Grid Pattern

```tsx
<Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id} className="p-6">
      {/* Card content */}
    </Card>
  ))}
</Grid>
```

---

## 🎯 Best Practices

1. **Component Composition**
   - Use Box/Flex/Stack for layout
   - Use Container for consistent max-width
   - Use Grid for responsive grids

2. **Type Safety**
   - All examples are fully typed
   - Use TypeScript for better DX

3. **Accessibility**
   - Semantic HTML (as prop)
   - ARIA labels where needed
   - Keyboard navigation support

4. **Performance**
   - Import only what you need
   - Use memoization for expensive renders
   - Lazy load heavy components

5. **Theming**
   - Use semantic color tokens
   - Avoid hardcoded colors
   - Test with all themes

---

## 📚 Additional Resources

- **Documentation:** [vormir.dev/docs](https://vormir.dev/docs)
- **Storybook:** [vormir.dev/storybook](https://vormir.dev/storybook)
- **GitHub:** [github.com/vormir/react](https://github.com/vormir/react)

---

## 🤝 Contributing

Want to add your own example? 

1. Create a new directory in `examples/`
2. Build your template
3. Add documentation to this README
4. Submit a PR

---

## 📄 License

All examples are MIT licensed and free to use in your projects.

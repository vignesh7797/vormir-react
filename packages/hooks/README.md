# @vormir/hooks

A comprehensive collection of React hooks for common patterns and interactions.

## Installation

```bash
npm install @vormir/hooks
# or
yarn add @vormir/hooks
# or
pnpm add @vormir/hooks
```

## Hooks

### Core Utility Hooks
- `useMediaQuery` - Responsive breakpoint detection
- `useDisclosure` - Boolean state management (open/close)
- `useClipboard` - Copy to clipboard functionality
- `useLocalStorage` - Persistent state in localStorage
- `useSessionStorage` - Session-based state
- `useDebounce` - Debounce values
- `useThrottle` - Throttle function calls
- `useToggle` - Boolean toggle state

### DOM Interaction Hooks
- `useClickOutside` - Detect outside clicks
- `useKeyPress` - Keyboard event handling
- `useScrollPosition` - Track scroll position
- `useWindowSize` - Window dimensions
- `useIntersectionObserver` - Visibility detection

### State Management Hooks
- `usePrevious` - Access previous state/props
- `useCounter` - Counter state management
- `useArray` - Array state helpers
- `useAsync` - Async operation state
- `useStep` - Multi-step wizard state
- `useForm` - Form state management

### Lifecycle Hooks
- `useInterval` - Declarative intervals
- `useTimeout` - Declarative timeouts
- `useEventListener` - Event listener management
- `useLockBodyScroll` - Prevent body scrolling
- `usePortal` - Portal rendering

### UI Interaction Hooks
- `useHover` - Hover state detection
- `useFocus` - Focus state management
- `useFetch` - Data fetching hook

## License

MIT

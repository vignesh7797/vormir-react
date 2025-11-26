import type { Meta, StoryObj } from '@storybook/react';
import { useLocalStorage } from '@vormir/hooks';
import { Box, Text, Button, Input, Stack, Switch } from '@vormir/react';

const meta = {
  title: 'Hooks/Core Utility/useLocalStorage',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hook for syncing state with localStorage. Automatically persists and restores state across page reloads.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseLocalStorageDemo() {
  const [name, setName, removeName] = useLocalStorage('demo-name', 'John Doe');
  const [count, setCount, removeCount] = useLocalStorage('demo-count', 0);
  const [isDark, setIsDark, removeDark] = useLocalStorage('demo-theme', false);
  const [preferences, setPreferences, removePreferences] = useLocalStorage('demo-prefs', {
    notifications: true,
    newsletter: false,
  });

  return (
    <Stack spacing={6} className="w-[600px]">
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">String Value</Text>
        <Stack spacing={2}>
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
          />
          <div className="flex gap-2">
            <Button onClick={() => setName('Jane Smith')} size="sm" variant="outline">
              Set to "Jane Smith"
            </Button>
            <Button onClick={removeName} size="sm" variant="ghost">
              Remove
            </Button>
          </div>
          <Text className="text-sm text-neutral-600 dark:text-neutral-400">
            Value stored in localStorage: <strong>{name}</strong>
          </Text>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Number Value (Counter)</Text>
        <Stack spacing={2}>
          <div className="flex items-center gap-4">
            <Button onClick={() => setCount((c: number) => c - 1)} size="sm">-</Button>
            <Text className="text-3xl font-bold min-w-[60px] text-center">{count}</Text>
            <Button onClick={() => setCount((c: number) => c + 1)} size="sm">+</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setCount(0)} size="sm" variant="outline">
              Reset to 0
            </Button>
            <Button onClick={removeCount} size="sm" variant="ghost">
              Remove
            </Button>
          </div>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Boolean Value (Theme)</Text>
        <Stack spacing={2}>
          <div className="flex items-center gap-3">
            <Switch checked={isDark} onCheckedChange={setIsDark} />
            <Text>Dark Mode: {isDark ? 'Enabled' : 'Disabled'}</Text>
          </div>
          <Button onClick={removeDark} size="sm" variant="ghost" className="self-start">
            Remove Preference
          </Button>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Object Value (Settings)</Text>
        <Stack spacing={2}>
          <div className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <Text>Notifications</Text>
            <Switch 
              checked={preferences.notifications}
              onCheckedChange={(checked: boolean) => setPreferences({...preferences, notifications: checked})}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <Text>Newsletter</Text>
            <Switch 
              checked={preferences.newsletter}
              onCheckedChange={(checked: boolean) => setPreferences({...preferences, newsletter: checked})}
            />
          </div>
          <Button onClick={removePreferences} size="sm" variant="ghost" className="self-start">
            Remove All Settings
          </Button>
        </Stack>
      </Box>

      <Box className="p-4 bg-brand-50 dark:bg-brand-900/20 rounded">
        <Text className="text-sm font-medium mb-2">💡 Try This:</Text>
        <Text className="text-sm">
          Change any values above, then refresh the page. Your changes will persist! 
          Open DevTools → Application → Local Storage to see the stored values.
        </Text>
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseLocalStorageDemo />,
};

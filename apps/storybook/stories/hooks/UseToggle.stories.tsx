import type { Meta, StoryObj } from '@storybook/react';
import { useToggle } from '@vormir/hooks';
import { Box, Text, Button, Stack, Switch } from '@vormir/react';
import { Eye, EyeOff, Volume2, VolumeX, Wifi, WifiOff } from 'lucide-react';

const meta = {
  title: 'Hooks/Core Utility/useToggle',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hook for toggling boolean values. Simple alternative to useState for boolean flags.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseToggleDemo() {
  const [isVisible, toggleVisible, setVisible] = useToggle(false);
  const [isMuted, toggleMuted] = useToggle(true);
  const [isOnline, toggleOnline, setOnline] = useToggle(true);
  const [darkMode, toggleDarkMode] = useToggle(false);

  return (
    <Stack spacing={6} className="w-[600px]">
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Password Visibility</Text>
        <Stack spacing={2}>
          <div className="flex gap-2">
            <input 
              type={isVisible ? 'text' : 'password'}
              value="MySecretPassword123"
              readOnly
              className="flex-1 px-3 py-2 border rounded bg-white dark:bg-neutral-800 dark:border-neutral-700"
            />
            <Button onClick={toggleVisible} variant="outline">
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setVisible(true)} size="sm" variant="ghost">
              Show
            </Button>
            <Button onClick={() => setVisible(false)} size="sm" variant="ghost">
              Hide
            </Button>
            <Button onClick={toggleVisible} size="sm" variant="ghost">
              Toggle
            </Button>
          </div>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Audio Control</Text>
        <Stack spacing={2}>
          <Button 
            onClick={toggleMuted}
            size="lg"
            variant={isMuted ? 'outline' : 'solid'}
            className="w-full"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-5 w-5 mr-2" />
                Muted
              </>
            ) : (
              <>
                <Volume2 className="h-5 w-5 mr-2" />
                Playing Sound
              </>
            )}
          </Button>
          <Box className={`p-4 rounded text-center ${isMuted ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-brand-100 dark:bg-brand-900/30'}`}>
            <Text className="text-sm">
              {isMuted ? '🔇 Sound is muted' : '🔊 Sound is playing'}
            </Text>
          </Box>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Connection Status</Text>
        <Stack spacing={2}>
          <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <Wifi className="h-5 w-5 text-success" />
              ) : (
                <WifiOff className="h-5 w-5 text-error" />
              )}
              <div>
                <Text className="font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </Text>
                <Text className="text-xs text-neutral-600 dark:text-neutral-400">
                  Connection status
                </Text>
              </div>
            </div>
            <Button onClick={toggleOnline} size="sm">
              Toggle
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setOnline(true)} size="sm" variant="ghost" className="flex-1">
              Go Online
            </Button>
            <Button onClick={() => setOnline(false)} size="sm" variant="ghost" className="flex-1">
              Go Offline
            </Button>
          </div>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Theme Switcher</Text>
        <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded">
          <Text className="font-medium">
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </Text>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>
      </Box>

      <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded">
        <Text className="text-sm font-mono">
          const [value, toggle, setValue] = useToggle(initialValue);
        </Text>
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseToggleDemo />,
};

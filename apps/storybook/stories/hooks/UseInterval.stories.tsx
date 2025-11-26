import type { Meta, StoryObj } from '@storybook/react';
import { useInterval } from '@vormir/hooks';
import { Box, Text, Button, Stack } from '@vormir/react';
import { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const meta = {
  title: 'Hooks/Lifecycle/useInterval',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Declarative interval hook. Automatically cleans up intervals on unmount. Pass null as delay to pause.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseIntervalDemo() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(1000);

  const [clock, setClock] = useState(new Date());
  const [progress, setProgress] = useState(0);

  useInterval(() => {
    setCount(c => c + 1);
  }, isRunning ? delay : null);

  useInterval(() => {
    setClock(new Date());
  }, 1000);

  useInterval(() => {
    setProgress(p => (p >= 100 ? 0 : p + 1));
  }, 50);

  return (
    <Stack spacing={6} className="w-[600px]">
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Counter with Pause/Resume</Text>
        <Stack spacing={2}>
          <div className="text-center mb-4">
            <Text className="text-6xl font-bold text-brand-600 dark:text-brand-400">
              {count}
            </Text>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={() => setIsRunning(!isRunning)}
              size="lg"
              leftIcon={isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            >
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button 
              onClick={() => {
                setCount(0);
                setIsRunning(false);
              }}
              size="lg"
              variant="outline"
              leftIcon={<RotateCcw className="h-5 w-5" />}
            >
              Reset
            </Button>
          </div>

          <Box className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded">
            <Text className="text-sm font-medium mb-2">Interval Speed:</Text>
            <div className="flex gap-2">
              <Button 
                onClick={() => setDelay(2000)}
                size="sm"
                variant={delay === 2000 ? 'solid' : 'outline'}
              >
                Slow (2s)
              </Button>
              <Button 
                onClick={() => setDelay(1000)}
                size="sm"
                variant={delay === 1000 ? 'solid' : 'outline'}
              >
                Normal (1s)
              </Button>
              <Button 
                onClick={() => setDelay(500)}
                size="sm"
                variant={delay === 500 ? 'solid' : 'outline'}
              >
                Fast (0.5s)
              </Button>
              <Button 
                onClick={() => setDelay(100)}
                size="sm"
                variant={delay === 100 ? 'solid' : 'outline'}
              >
                Rapid (0.1s)
              </Button>
            </div>
          </Box>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Live Clock</Text>
        <div className="text-center">
          <Text className="text-4xl font-mono font-bold">
            {clock.toLocaleTimeString()}
          </Text>
          <Text className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Updates every second
          </Text>
        </div>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Progress Bar</Text>
        <Stack spacing={2}>
          <Box className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-4">
            <div 
              className="bg-brand-500 h-4 rounded-full transition-all duration-50"
              style={{ width: `${progress}%` }}
            />
          </Box>
          <Text className="text-center text-2xl font-bold">{progress}%</Text>
          <Text className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            Updates every 50ms
          </Text>
        </Stack>
      </Box>

      <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded">
        <Text className="text-sm font-mono">
          useInterval(callback, delay) // Pass null as delay to pause
        </Text>
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseIntervalDemo />,
};

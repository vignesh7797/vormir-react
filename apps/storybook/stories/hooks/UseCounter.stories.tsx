import type { Meta, StoryObj } from '@storybook/react';
import { useCounter } from '@vormir/hooks';
import { Box, Text, Button, Stack } from '@vormir/react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

const meta = {
  title: 'Hooks/State Management/useCounter',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hook for managing counter state with increment, decrement, reset, and set methods. Supports min/max boundaries.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseCounterDemo() {
  const basic = useCounter(0);
  const withLimits = useCounter(5, 0, 10);
  const likes = useCounter(42);

  return (
    <Stack spacing={6} className="w-[600px]">
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Basic Counter</Text>
        <Stack spacing={2}>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={basic.decrement} size="lg" variant="outline">
              <Minus className="h-5 w-5" />
            </Button>
            <Text className="text-5xl font-bold min-w-[120px] text-center">
              {basic.count}
            </Text>
            <Button onClick={basic.increment} size="lg" variant="outline">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => basic.set(0)} size="sm" variant="ghost">
              Set to 0
            </Button>
            <Button onClick={() => basic.set(100)} size="sm" variant="ghost">
              Set to 100
            </Button>
            <Button onClick={basic.reset} size="sm" variant="ghost">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Counter with Min/Max (0-10)</Text>
        <Stack spacing={2}>
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={withLimits.decrement} 
              size="lg" 
              disabled={withLimits.count <= 0}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <Box className="text-center">
              <Text className="text-4xl font-bold">{withLimits.count}</Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                Range: 0-10
              </Text>
            </Box>
            <Button 
              onClick={withLimits.increment} 
              size="lg"
              disabled={withLimits.count >= 10}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-2">
            <div 
              className="bg-brand-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(withLimits.count / 10) * 100}%` }}
            />
          </div>

          <div className="flex gap-2 justify-center mt-2">
            <Button onClick={() => withLimits.set(0)} size="sm" variant="ghost">
              Min (0)
            </Button>
            <Button onClick={() => withLimits.set(5)} size="sm" variant="ghost">
              Middle (5)
            </Button>
            <Button onClick={() => withLimits.set(10)} size="sm" variant="ghost">
              Max (10)
            </Button>
            <Button onClick={withLimits.reset} size="sm" variant="ghost">
              Reset (5)
            </Button>
          </div>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Like Counter</Text>
        <Stack spacing={2}>
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <Button 
                onClick={likes.increment}
                size="lg"
                className="mb-2"
              >
                👍 Like
              </Button>
              <Text className="text-2xl font-bold">{likes.count} likes</Text>
            </div>
            <div className="text-center">
              <Button 
                onClick={likes.decrement}
                size="lg"
                variant="outline"
                className="mb-2"
              >
                👎 Unlike
              </Button>
            </div>
          </div>
          <Button onClick={likes.reset} size="sm" variant="ghost" className="self-center">
            Reset to 42
          </Button>
        </Stack>
      </Box>

      <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded">
        <Text className="text-sm font-mono">
          const {'{ count, increment, decrement, reset, set }'} = useCounter(initialValue, min, max);
        </Text>
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseCounterDemo />,
};

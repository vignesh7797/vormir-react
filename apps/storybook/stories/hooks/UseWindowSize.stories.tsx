import type { Meta, StoryObj } from '@storybook/react';
import { useWindowSize } from '@vormir/hooks';
import { Box, Text, Stack } from '@vormir/react';
import { Monitor } from 'lucide-react';

const meta = {
  title: 'Hooks/DOM Interaction/useWindowSize',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hook that tracks window dimensions. Updates in real-time when the window is resized.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseWindowSizeDemo() {
  const { width, height } = useWindowSize();
  
  const getDeviceType = () => {
    if (width < 768) return { type: 'Mobile', color: 'bg-error' };
    if (width < 1024) return { type: 'Tablet', color: 'bg-warning' };
    return { type: 'Desktop', color: 'bg-success' };
  };

  const device = getDeviceType();
  const aspectRatio = (width / height).toFixed(2);

  return (
    <Stack spacing={6} className="w-[600px]">
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900 text-center">
        <Monitor className="h-12 w-12 mx-auto mb-4 text-brand-500" />
        <Text as="h2" size="4xl" weight="bold" className="mb-2">
          {width} × {height}
        </Text>
        <Text className="text-neutral-600 dark:text-neutral-400">
          Current window dimensions
        </Text>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Device Type</Text>
        <div className={`${device.color} text-white p-4 rounded-lg text-center`}>
          <Text className="text-2xl font-bold">{device.type}</Text>
          <Text className="text-sm opacity-90 mt-1">
            {device.type === 'Mobile' && 'Width < 768px'}
            {device.type === 'Tablet' && '768px ≤ Width < 1024px'}
            {device.type === 'Desktop' && 'Width ≥ 1024px'}
          </Text>
        </div>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Window Details</Text>
        <div className="grid grid-cols-2 gap-3">
          <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <Text className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Width</Text>
            <Text className="text-2xl font-bold">{width}px</Text>
          </Box>
          <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <Text className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Height</Text>
            <Text className="text-2xl font-bold">{height}px</Text>
          </Box>
          <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <Text className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Aspect Ratio</Text>
            <Text className="text-2xl font-bold">{aspectRatio}</Text>
          </Box>
          <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <Text className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Total Pixels</Text>
            <Text className="text-2xl font-bold">{(width * height).toLocaleString()}</Text>
          </Box>
        </div>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Visual Size Representation</Text>
        <Box className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded">
          <div className="relative bg-brand-500 rounded" style={{ 
            height: '120px',
            width: `${Math.min((width / 1920) * 100, 100)}%` 
          }}>
            <Text className="absolute inset-0 flex items-center justify-center text-white font-bold">
              {Math.round((width / 1920) * 100)}%
            </Text>
          </div>
          <Text className="text-xs text-center mt-2 text-neutral-600 dark:text-neutral-400">
            Width compared to 1920px (typical desktop)
          </Text>
        </Box>
      </Box>

      <Box className="p-4 bg-brand-50 dark:bg-brand-900/20 rounded">
        <Text className="text-sm">
          <strong>💡 Try This:</strong> Resize your browser window to see the values update in real-time!
        </Text>
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseWindowSizeDemo />,
};

import type { Meta, StoryObj } from '@storybook/react';
import { useMediaQuery } from '@vormir/hooks';
import { Box, Text, Stack } from '@vormir/react';

const meta = {
  title: 'Hooks/Core Utility/useMediaQuery',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hook that tracks whether a media query matches. Useful for responsive design and adapting UI based on screen size.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseMediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  return (
    <Stack spacing={4}>
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Screen Size Detection</Text>
        <Stack spacing={2}>
          <Box className={`p-3 rounded ${isMobile ? 'bg-brand-100 dark:bg-brand-900' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
            <Text className="font-medium">Mobile (≤768px): {isMobile ? '✓ Active' : '✗ Inactive'}</Text>
          </Box>
          <Box className={`p-3 rounded ${isTablet ? 'bg-brand-100 dark:bg-brand-900' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
            <Text className="font-medium">Tablet (769px-1024px): {isTablet ? '✓ Active' : '✗ Inactive'}</Text>
          </Box>
          <Box className={`p-3 rounded ${isDesktop ? 'bg-brand-100 dark:bg-brand-900' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
            <Text className="font-medium">Desktop (≥1025px): {isDesktop ? '✓ Active' : '✗ Inactive'}</Text>
          </Box>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Other Queries</Text>
        <Stack spacing={2}>
          <Box className="p-3 rounded bg-neutral-100 dark:bg-neutral-800">
            <Text className="font-medium">Dark Mode Preference: {isDarkMode ? '✓ Yes' : '✗ No'}</Text>
          </Box>
          <Box className="p-3 rounded bg-neutral-100 dark:bg-neutral-800">
            <Text className="font-medium">Portrait Orientation: {isPortrait ? '✓ Yes' : '✗ No'}</Text>
          </Box>
        </Stack>
      </Box>

      <Box className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded text-sm">
        <Text className="font-mono">Resize your browser to see the queries update in real-time!</Text>
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseMediaQueryDemo />,
};

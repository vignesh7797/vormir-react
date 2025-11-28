import type { Meta, StoryObj } from '@storybook/react';
import { useDebounce } from '@vormir/hooks';
import { Box, Text, Input, Stack } from '@vormir/react';
import { useState, useEffect } from 'react';

const meta = {
  title: 'Hooks/Core Utility/useDebounce',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hook that debounces a value. Perfect for search inputs and other scenarios where you want to delay updates.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseDebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [immediateCount, setImmediateCount] = useState(0);
  const [debouncedCount, setDebouncedCount] = useState(0);
  
  const debouncedSearch = useDebounce(searchTerm, 500);
  const debouncedFast = useDebounce(searchTerm, 250);
  const debouncedSlow = useDebounce(searchTerm, 1000);

  useEffect(() => {
    setImmediateCount(c => c + 1);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch) {
      setDebouncedCount(c => c + 1);
    }
  }, [debouncedSearch]);

  const mockResults = debouncedSearch ? [
    `Result for "${debouncedSearch}" #1`,
    `Result for "${debouncedSearch}" #2`,
    `Result for "${debouncedSearch}" #3`,
  ] : [];

  return (
    <Stack spacing={6} className="w-[600px]">
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Search with Debounce</Text>
        <Stack spacing={2}>
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search... (500ms delay)"
          />
          
          <div className="grid grid-cols-2 gap-3 mt-2">
            <Box className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
              <Text className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Immediate Updates</Text>
              <Text className="font-bold text-lg">{immediateCount}</Text>
            </Box>
            <Box className="p-3 bg-brand-100 dark:bg-brand-900/30 rounded">
              <Text className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Debounced Updates</Text>
              <Text className="font-bold text-lg text-brand-600 dark:text-brand-400">{debouncedCount}</Text>
            </Box>
          </div>

          {debouncedSearch && (
            <Box className="mt-3">
              <Text className="text-sm font-medium mb-2">Search Results:</Text>
              <Stack spacing={1}>
                {mockResults.map((result, i) => (
                  <Box key={i} className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-sm">
                    {result}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Different Delays</Text>
        <Stack spacing={2}>
          <Box className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <Text className="text-xs font-medium mb-1">Fast (250ms)</Text>
            <Text className="font-mono text-sm">{debouncedFast || '(empty)'}</Text>
          </Box>
          <Box className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <Text className="text-xs font-medium mb-1">Medium (500ms)</Text>
            <Text className="font-mono text-sm">{debouncedSearch || '(empty)'}</Text>
          </Box>
          <Box className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <Text className="text-xs font-medium mb-1">Slow (1000ms)</Text>
            <Text className="font-mono text-sm">{debouncedSlow || '(empty)'}</Text>
          </Box>
        </Stack>
      </Box>

      <Box className="p-4 bg-brand-50 dark:bg-brand-900/20 rounded">
        <Text className="text-sm">
          <strong>💡 Use Case:</strong> Type rapidly in the search box. Notice how the debounced values 
          update only after you stop typing, reducing unnecessary API calls or expensive operations.
        </Text>
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseDebounceDemo />,
};

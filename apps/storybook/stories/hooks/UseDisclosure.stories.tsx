import type { Meta, StoryObj } from '@storybook/react';
import { useDisclosure } from '@vormir/hooks';
import { Box, Text, Button, Stack } from '@vormir/react';

const meta = {
  title: 'Hooks/Core Utility/useDisclosure',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hook for managing boolean state with open, close, and toggle functions. Perfect for modals, dropdowns, and other UI elements.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseDisclosureDemo() {
  const modal = useDisclosure();
  const dropdown = useDisclosure(false);
  const panel = useDisclosure(true);

  return (
    <Stack spacing={6}>
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900 w-[500px]">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Modal Example</Text>
        <Stack spacing={2}>
          <div className="flex gap-2">
            <Button onClick={modal.open} size="sm">Open</Button>
            <Button onClick={modal.close} size="sm" variant="outline">Close</Button>
            <Button onClick={modal.toggle} size="sm" variant="ghost">Toggle</Button>
          </div>
          {modal.isOpen && (
            <Box className="p-4 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded animate-fade-in">
              <Text className="font-medium text-brand-900 dark:text-brand-100">Modal is Open!</Text>
              <Text className="text-sm mt-1">This simulates a modal state</Text>
            </Box>
          )}
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900 w-[500px]">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Dropdown Example</Text>
        <div className="relative">
          <Button onClick={dropdown.toggle} size="sm">
            {dropdown.isOpen ? 'Hide' : 'Show'} Menu
          </Button>
          {dropdown.isOpen && (
            <Box className="absolute top-full mt-2 p-3 bg-white dark:bg-neutral-800 border rounded-lg shadow-lg animate-fade-in w-48">
              <Stack spacing={1}>
                <button className="text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
                  Option 1
                </button>
                <button className="text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
                  Option 2
                </button>
                <button className="text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
                  Option 3
                </button>
              </Stack>
            </Box>
          )}
        </div>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900 w-[500px]">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Collapsible Panel (Initially Open)</Text>
        <Button onClick={panel.toggle} size="sm" className="mb-3">
          {panel.isOpen ? 'Collapse' : 'Expand'}
        </Button>
        {panel.isOpen && (
          <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded">
            <Text>This panel was initially open. The useDisclosure hook accepts an initial state parameter.</Text>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseDisclosureDemo />,
};

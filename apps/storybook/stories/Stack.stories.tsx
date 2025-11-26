import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Box, Text } from '@vormir/react';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    spacing: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around'],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const StackItem = ({ children }: { children: React.ReactNode }) => (
  <Box className="rounded-lg border border-border bg-primary p-4 text-center text-primary-foreground">
    <Text weight="semibold">{children}</Text>
  </Box>
);

export const Default: Story = {
  render: () => (
    <Stack spacing={4}>
      <StackItem>Item 1</StackItem>
      <StackItem>Item 2</StackItem>
      <StackItem>Item 3</StackItem>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Spacing: 2 (0.5rem)
        </Text>
        <Stack direction="vertical" spacing={2}>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Spacing: 4 (1rem)
        </Text>
        <Stack direction="vertical" spacing={4}>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Spacing: 8 (2rem)
        </Text>
        <Stack direction="vertical" spacing={8}>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Spacing: 2 (0.5rem)
        </Text>
        <Stack direction="horizontal" spacing={2}>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Spacing: 4 (1rem)
        </Text>
        <Stack direction="horizontal" spacing={4}>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Spacing: 8 (2rem)
        </Text>
        <Stack direction="horizontal" spacing={8}>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Align: Start (Left)
        </Text>
        <Stack direction="vertical" spacing={4} align="start" className="w-full">
          <StackItem>Short</StackItem>
          <StackItem>Medium Length</StackItem>
          <StackItem>Very Long Item Text</StackItem>
        </Stack>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Align: Center
        </Text>
        <Stack direction="vertical" spacing={4} align="center" className="w-full">
          <StackItem>Short</StackItem>
          <StackItem>Medium Length</StackItem>
          <StackItem>Very Long Item Text</StackItem>
        </Stack>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Align: End (Right)
        </Text>
        <Stack direction="vertical" spacing={4} align="end" className="w-full">
          <StackItem>Short</StackItem>
          <StackItem>Medium Length</StackItem>
          <StackItem>Very Long Item Text</StackItem>
        </Stack>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Align: Stretch (Full Width)
        </Text>
        <Stack direction="vertical" spacing={4} align="stretch" className="w-full">
          <StackItem>Short</StackItem>
          <StackItem>Medium Length</StackItem>
          <StackItem>Very Long Item Text</StackItem>
        </Stack>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <Stack spacing={4} className="w-96">
      <Box className="rounded-lg border border-border bg-card p-6">
        <Text size="xl" weight="bold">
          Sign Up
        </Text>
      </Box>
      <Box className="rounded-lg border border-border bg-card p-4">
        <Text weight="semibold">Full Name</Text>
      </Box>
      <Box className="rounded-lg border border-border bg-card p-4">
        <Text weight="semibold">Email</Text>
      </Box>
      <Box className="rounded-lg border border-border bg-card p-4">
        <Text weight="semibold">Password</Text>
      </Box>
      <Box className="rounded-lg border border-border bg-primary p-4 text-center text-primary-foreground">
        <Text weight="bold">Submit</Text>
      </Box>
    </Stack>
  ),
};

export const CardStack: Story = {
  render: () => (
    <Stack spacing={6} className="w-96">
      <Box className="rounded-lg border border-border bg-card p-6">
        <Stack spacing={2}>
          <Text size="lg" weight="bold">
            Card Title 1
          </Text>
          <Text color="muted">This is a card with vertically stacked content.</Text>
        </Stack>
      </Box>
      <Box className="rounded-lg border border-border bg-card p-6">
        <Stack spacing={2}>
          <Text size="lg" weight="bold">
            Card Title 2
          </Text>
          <Text color="muted">Another card demonstrating consistent spacing.</Text>
        </Stack>
      </Box>
      <Box className="rounded-lg border border-border bg-card p-6">
        <Stack spacing={2}>
          <Text size="lg" weight="bold">
            Card Title 3
          </Text>
          <Text color="muted">Perfect for lists of items or content sections.</Text>
        </Stack>
      </Box>
    </Stack>
  ),
};

export const HorizontalButtons: Story = {
  render: () => (
    <Stack direction="horizontal" spacing={4}>
      <Box className="rounded-lg border border-border bg-card px-6 py-3">
        <Text weight="semibold">Cancel</Text>
      </Box>
      <Box className="rounded-lg border border-border bg-primary px-6 py-3 text-primary-foreground">
        <Text weight="semibold">Submit</Text>
      </Box>
    </Stack>
  ),
};

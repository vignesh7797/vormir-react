import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@vormir/react';

const meta = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box className="rounded-lg border border-border bg-card p-6">
      <p>This is a Box component</p>
    </Box>
  ),
};

export const DifferentElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Box as="div" className="rounded border border-border p-4">
        Rendered as div (default)
      </Box>
      <Box as="section" className="rounded border border-border p-4">
        Rendered as section
      </Box>
      <Box as="article" className="rounded border border-border p-4">
        Rendered as article
      </Box>
    </div>
  ),
};

export const Styled: Story = {
  render: () => (
    <div className="space-y-4">
      <Box className="rounded-lg bg-primary p-6 text-primary-foreground">
        Primary Box
      </Box>
      <Box className="rounded-lg bg-success p-6 text-success-foreground">
        Success Box
      </Box>
      <Box className="rounded-lg bg-error p-6 text-error-foreground">
        Error Box
      </Box>
    </div>
  ),
};

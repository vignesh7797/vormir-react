import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@vormir/react';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 4,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

export const Avatar: Story = {
  render: () => <Skeleton variant="circular" width={80} height={80} />,
};

export const Card: Story = {
  render: () => (
    <div className="w-80 border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
      <Skeleton height={200} />
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Skeleton height={300} />
      <Skeleton variant="text" width="80%" height={32} />
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} />
        </div>
      </div>
      <Skeleton variant="text" lines={8} />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="70%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Table: Story = {
  render: () => (
    <div className="w-full space-y-2">
      <div className="grid grid-cols-4 gap-4 p-4 border-b">
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      ))}
    </div>
  ),
};

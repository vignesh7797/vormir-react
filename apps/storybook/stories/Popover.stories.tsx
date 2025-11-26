import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Button } from '@vormir/react';

const meta = {
  title: 'Phase 6: Advanced Input/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const PopoverContent = () => (
  <div className="space-y-2">
    <h3 className="font-semibold text-sm">Popover Title</h3>
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      This is the popover content. You can put any content here.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    trigger: <Button>Open Popover</Button>,
    children: <PopoverContent />,
  },
};

export const Top: Story = {
  args: {
    trigger: <Button>Top Popover</Button>,
    position: 'top',
    children: <PopoverContent />,
  },
};

export const Bottom: Story = {
  args: {
    trigger: <Button>Bottom Popover</Button>,
    position: 'bottom',
    children: <PopoverContent />,
  },
};

export const Left: Story = {
  args: {
    trigger: <Button>Left Popover</Button>,
    position: 'left',
    children: <PopoverContent />,
  },
};

export const Right: Story = {
  args: {
    trigger: <Button>Right Popover</Button>,
    position: 'right',
    children: <PopoverContent />,
  },
};

export const AlignStart: Story = {
  args: {
    trigger: <Button>Align Start</Button>,
    position: 'bottom',
    align: 'start',
    children: <PopoverContent />,
  },
};

export const AlignCenter: Story = {
  args: {
    trigger: <Button>Align Center</Button>,
    position: 'bottom',
    align: 'center',
    children: <PopoverContent />,
  },
};

export const AlignEnd: Story = {
  args: {
    trigger: <Button>Align End</Button>,
    position: 'bottom',
    align: 'end',
    children: <PopoverContent />,
  },
};

export const NoArrow: Story = {
  args: {
    trigger: <Button>No Arrow</Button>,
    showArrow: false,
    children: <PopoverContent />,
  },
};

export const WithForm: Story = {
  args: {
    trigger: <Button>Open Form</Button>,
    position: 'bottom',
    children: (
      <div className="space-y-3 w-64">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded"
            placeholder="Enter email"
          />
        </div>
        <Button variant="solid" size="sm" className="w-full">
          Submit
        </Button>
      </div>
    ),
  },
};

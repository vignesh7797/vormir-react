import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, Button } from '@vormir/react';
import { useState } from 'react';

const meta = {
  title: 'Phase 6: Advanced Input/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerDemo = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer {...args} open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            This is the drawer content. You can put any content here.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'Drawer Title',
    description: 'This is a drawer description',
    position: 'right',
    size: 'md',
  },
};

export const Left: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'Left Drawer',
    position: 'left',
    size: 'md',
  },
};

export const Top: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'Top Drawer',
    position: 'top',
    size: 'md',
  },
};

export const Bottom: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'Bottom Drawer',
    position: 'bottom',
    size: 'md',
  },
};

export const Small: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'Small Drawer',
    position: 'right',
    size: 'sm',
  },
};

export const Large: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'Large Drawer',
    position: 'right',
    size: 'lg',
  },
};

export const FullSize: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'Full Size Drawer',
    position: 'right',
    size: 'full',
  },
};

export const NoHeader: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'right',
    size: 'md',
  },
};

export const NoOverlayClose: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'No Overlay Close',
    description: 'Click overlay won\'t close this drawer',
    position: 'right',
    size: 'md',
    closeOnOverlayClick: false,
  },
};

export const NoEscapeClose: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    title: 'No Escape Close',
    description: 'Press ESC won\'t close this drawer',
    position: 'right',
    size: 'md',
    closeOnEscape: false,
  },
};

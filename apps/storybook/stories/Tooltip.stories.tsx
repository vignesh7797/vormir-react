import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from '@vormir/react';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
    children: <Button>Hover me</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    position: 'bottom',
    children: <Button>Hover me</Button>,
  },
};

export const Left: Story = {
  args: {
    content: 'Tooltip on left',
    position: 'left',
    children: <Button>Hover me</Button>,
  },
};

export const Right: Story = {
  args: {
    content: 'Tooltip on right',
    position: 'right',
    children: <Button>Hover me</Button>,
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a tooltip with a longer message that wraps to multiple lines',
    children: <Button>Hover for long tooltip</Button>,
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'This tooltip appears after 1 second',
    delayShow: 1000,
    children: <Button>Hover me (1s delay)</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-20">
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      <div className="flex gap-8">
        <Tooltip content="Left tooltip" position="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" position="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
};

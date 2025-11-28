import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@vormir/react';
import { useState } from 'react';

const meta = {
  title: 'Phase 6: Advanced Input/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  },
};

export const WithMarks: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    marks: [0, 25, 50, 75, 100],
  },
};

export const WithTooltip: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showTooltip: true,
  },
};

export const RangeMode: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [20, 80],
    showTooltip: true,
  },
};

export const Vertical: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'vertical',
    showTooltip: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    size: 'sm',
    showTooltip: true,
  },
};

export const Large: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    size: 'lg',
    showTooltip: true,
  },
};

export const WithCustomFormat: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showTooltip: true,
    formatValue: (value: number) => `$${value}`,
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return (
      <div className="space-y-4">
        <div className="text-center text-sm font-medium">Value: {value}</div>
        <Slider {...args} value={value} onChange={(v) => typeof v === 'number' && setValue(v)} />
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setValue(25)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Set 25
          </button>
          <button
            onClick={() => setValue(50)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Set 50
          </button>
          <button
            onClick={() => setValue(75)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Set 75
          </button>
        </div>
      </div>
    );
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    showTooltip: true,
  },
};

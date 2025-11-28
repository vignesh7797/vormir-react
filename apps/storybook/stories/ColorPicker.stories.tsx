import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from '@vormir/react';
import { useState } from 'react';

const meta = {
  title: 'Phase 6: Advanced Input/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithDefaultColor: Story = {
  args: {
    defaultValue: '#ef4444',
  },
};

export const NoPresets: Story = {
  args: {
    showPresets: false,
  },
};

export const NoHexInput: Story = {
  args: {
    showInput: false,
  },
};

export const WithRgbInputs: Story = {
  args: {
    showRgbInputs: true,
  },
};

export const PresetsAndRgb: Story = {
  args: {
    showPresets: true,
    showInput: true,
    showRgbInputs: true,
  },
};

export const MinimalMode: Story = {
  args: {
    showPresets: false,
    showInput: false,
    showRgbInputs: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '#8b5cf6',
  },
};

export const CustomPresets: Story = {
  args: {
    presetColors: [
      '#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe',
      '#064e3b', '#10b981', '#34d399', '#6ee7b7', '#d1fae5',
      '#7c2d12', '#f97316', '#fb923c', '#fdba74', '#fed7aa',
      '#831843', '#ec4899', '#f472b6', '#f9a8d4', '#fce7f3',
    ],
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [color, setColor] = useState('#3b82f6');
    return (
      <div className="space-y-4">
        <ColorPicker {...args} value={color} onChange={setColor} />
        <div className="space-y-2">
          <div
            className="w-full h-16 rounded-lg border-2 border-neutral-300 dark:border-neutral-700"
            style={{ backgroundColor: color }}
          />
          <div className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
            Current Color: {color}
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setColor('#ef4444')}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Red
          </button>
          <button
            onClick={() => setColor('#10b981')}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          >
            Green
          </button>
          <button
            onClick={() => setColor('#3b82f6')}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Blue
          </button>
        </div>
      </div>
    );
  },
  args: {
    showRgbInputs: true,
  },
};

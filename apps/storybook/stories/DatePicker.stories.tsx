import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@vormir/react';
import { useState } from 'react';

const meta = {
  title: 'Phase 6: Advanced Input/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'single',
  },
};

export const WithDefaultDate: Story = {
  args: {
    mode: 'single',
    defaultValue: new Date(),
  },
};

export const Outline: Story = {
  args: {
    mode: 'single',
    variant: 'outline',
  },
};

export const Filled: Story = {
  args: {
    mode: 'single',
    variant: 'filled',
  },
};

export const Disabled: Story = {
  args: {
    mode: 'single',
    disabled: true,
    defaultValue: new Date(),
  },
};

export const WithMinDate: Story = {
  args: {
    mode: 'single',
    minDate: new Date(),
  },
};

export const WithMaxDate: Story = {
  args: {
    mode: 'single',
    maxDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  },
};

export const WithMinMaxDate: Story = {
  args: {
    mode: 'single',
    minDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    maxDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  },
};

export const RangeMode: Story = {
  args: {
    mode: 'range',
  },
};

export const RangeModeWithDefault: Story = {
  args: {
    mode: 'range',
    rangeValue: [
      new Date(new Date().setDate(new Date().getDate() - 3)),
      new Date(new Date().setDate(new Date().getDate() + 3)),
    ],
  },
};

export const ControlledSingle: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="space-y-4">
        <DatePicker {...args} value={date || undefined} onChange={setDate} />
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDate(new Date())}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Today
          </button>
          <button
            onClick={() => setDate(null)}
            className="px-3 py-1 text-sm bg-neutral-600 text-white rounded hover:bg-neutral-700"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
  args: {
    mode: 'single',
  },
};

export const ControlledRange: Story = {
  render: (args) => {
    const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
    return (
      <div className="space-y-4">
        <DatePicker {...args} mode="range" rangeValue={range} onRangeChange={setRange} />
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Start: {range[0] ? range[0].toLocaleDateString() : 'None'}
          <br />
          End: {range[1] ? range[1].toLocaleDateString() : 'None'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setRange([
                new Date(new Date().setDate(new Date().getDate() - 7)),
                new Date(),
              ])
            }
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setRange([null, null])}
            className="px-3 py-1 text-sm bg-neutral-600 text-white rounded hover:bg-neutral-700"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '@vormir/react';
import { useState } from 'react';

const meta = {
  title: 'Phase 6: Advanced Input/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const colors = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'brown', label: 'Brown' },
];

export const Default: Story = {
  args: {
    options: colors,
    placeholder: 'Select colors...',
  },
};

export const WithDefaultValues: Story = {
  args: {
    options: colors,
    defaultValue: ['red', 'blue'],
    placeholder: 'Select colors...',
  },
};

export const Outline: Story = {
  args: {
    options: colors,
    variant: 'outline',
    placeholder: 'Select colors...',
  },
};

export const Filled: Story = {
  args: {
    options: colors,
    variant: 'filled',
    placeholder: 'Select colors...',
  },
};

export const Small: Story = {
  args: {
    options: colors,
    size: 'sm',
    placeholder: 'Select colors...',
  },
};

export const Large: Story = {
  args: {
    options: colors,
    size: 'lg',
    placeholder: 'Select colors...',
  },
};

export const WithError: Story = {
  args: {
    options: colors,
    error: true,
    placeholder: 'Select colors...',
  },
};

export const Disabled: Story = {
  args: {
    options: colors,
    disabled: true,
    defaultValue: ['red', 'blue'],
    placeholder: 'Select colors...',
  },
};

export const WithMaxLimit: Story = {
  args: {
    options: colors,
    max: 3,
    placeholder: 'Select up to 3 colors...',
  },
};

export const NotSearchable: Story = {
  args: {
    options: colors,
    searchable: false,
    placeholder: 'Select colors...',
  },
};

export const HideCount: Story = {
  args: {
    options: colors,
    showCount: false,
    defaultValue: ['red', 'blue', 'green'],
    placeholder: 'Select colors...',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'red', label: 'Red' },
      { value: 'blue', label: 'Blue', disabled: true },
      { value: 'green', label: 'Green' },
      { value: 'yellow', label: 'Yellow', disabled: true },
      { value: 'purple', label: 'Purple' },
    ],
    placeholder: 'Select colors...',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="space-y-4">
        <MultiSelect {...args} value={value} onChange={setValue} />
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Selected: {value.length > 0 ? value.join(', ') : 'None'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setValue(['red', 'blue'])}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Set Red & Blue
          </button>
          <button
            onClick={() => setValue([])}
            className="px-3 py-1 text-sm bg-neutral-600 text-white rounded hover:bg-neutral-700"
          >
            Clear All
          </button>
        </div>
      </div>
    );
  },
  args: {
    options: colors,
    placeholder: 'Select colors...',
  },
};

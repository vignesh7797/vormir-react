import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from '@vormir/react';
import { useState } from 'react';

const meta = {
  title: 'Phase 6: Advanced Input/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'watermelon', label: 'Watermelon' },
];

export const Default: Story = {
  args: {
    options: fruits,
    placeholder: 'Select a fruit...',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: fruits,
    defaultValue: 'apple',
    placeholder: 'Select a fruit...',
  },
};

export const Outline: Story = {
  args: {
    options: fruits,
    variant: 'outline',
    placeholder: 'Select a fruit...',
  },
};

export const Filled: Story = {
  args: {
    options: fruits,
    variant: 'filled',
    placeholder: 'Select a fruit...',
  },
};

export const Small: Story = {
  args: {
    options: fruits,
    size: 'sm',
    placeholder: 'Select a fruit...',
  },
};

export const Large: Story = {
  args: {
    options: fruits,
    size: 'lg',
    placeholder: 'Select a fruit...',
  },
};

export const WithError: Story = {
  args: {
    options: fruits,
    error: true,
    placeholder: 'Select a fruit...',
  },
};

export const Disabled: Story = {
  args: {
    options: fruits,
    disabled: true,
    defaultValue: 'apple',
    placeholder: 'Select a fruit...',
  },
};

export const AllowCustom: Story = {
  args: {
    options: fruits,
    allowCustom: true,
    placeholder: 'Type or select a fruit...',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'cherry', label: 'Cherry' },
      { value: 'grape', label: 'Grape', disabled: true },
      { value: 'orange', label: 'Orange' },
    ],
    placeholder: 'Select a fruit...',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-4">
        <Combobox {...args} value={value} onChange={setValue} />
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Selected: {value || 'None'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setValue('apple')}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Set Apple
          </button>
          <button
            onClick={() => setValue('')}
            className="px-3 py-1 text-sm bg-neutral-600 text-white rounded hover:bg-neutral-700"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
  args: {
    options: fruits,
    placeholder: 'Select a fruit...',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Label, Stack } from '@vormir/react';
import { useState } from 'react';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(value) => setChecked(value as boolean)}
        />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <div className="flex items-center space-x-2">
        <Checkbox id="small" size="sm" />
        <Label htmlFor="small">Small checkbox</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="medium" size="md" defaultChecked />
        <Label htmlFor="medium">Medium checkbox (default)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="large" size="lg" />
        <Label htmlFor="large">Large checkbox</Label>
      </div>
    </Stack>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="indeterminate"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="indeterminate">
          {checked === 'indeterminate'
            ? 'Partially selected'
            : checked
            ? 'All selected'
            : 'None selected'}
        </Label>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Stack spacing={4}>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked" isDisabled>
          Disabled unchecked
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" isDisabled>
          Disabled checked
        </Label>
      </div>
    </Stack>
  ),
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['email']);
    
    const handleChange = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    return (
      <Stack spacing={3}>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="email"
            checked={selected.includes('email')}
            onCheckedChange={() => handleChange('email')}
          />
          <Label htmlFor="email">Email notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sms"
            checked={selected.includes('sms')}
            onCheckedChange={() => handleChange('sms')}
          />
          <Label htmlFor="sms">SMS notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="push"
            checked={selected.includes('push')}
            onCheckedChange={() => handleChange('push')}
          />
          <Label htmlFor="push">Push notifications</Label>
        </div>
      </Stack>
    );
  },
};

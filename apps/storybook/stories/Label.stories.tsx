import type { Meta, StoryObj } from '@storybook/react';
import { Label, Input } from '@vormir/react';

const meta = {
  title: 'Primitives/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label Text',
  },
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="required-input" isRequired>
        Email Address
      </Label>
      <Input id="required-input" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled-input" isDisabled>
        Disabled Field
      </Label>
      <Input id="disabled-input" disabled placeholder="Cannot edit" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <Label htmlFor="name" isRequired>
          Full Name
        </Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div>
        <Label htmlFor="email-form" isRequired>
          Email
        </Label>
        <Input id="email-form" type="email" placeholder="john@example.com" />
      </div>
      <div>
        <Label htmlFor="bio">Bio (Optional)</Label>
        <Input id="bio" placeholder="Tell us about yourself" />
      </div>
    </div>
  ),
};

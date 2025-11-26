import type { Meta, StoryObj } from '@storybook/react';
import { Input, Label, Stack } from '@vormir/react';

const meta = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'flushed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={4} className="w-80">
      <div>
        <Label>Default</Label>
        <Input placeholder="Default variant" />
      </div>
      <div>
        <Label>Filled</Label>
        <Input variant="filled" placeholder="Filled variant" />
      </div>
      <div>
        <Label>Flushed</Label>
        <Input variant="flushed" placeholder="Flushed variant" />
      </div>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={4} className="w-80">
      <div>
        <Label>Small</Label>
        <Input size="sm" placeholder="Small input" />
      </div>
      <div>
        <Label>Medium</Label>
        <Input size="md" placeholder="Medium input" />
      </div>
      <div>
        <Label>Large</Label>
        <Input size="lg" placeholder="Large input" />
      </div>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing={4} className="w-80">
      <div>
        <Label>Default</Label>
        <Input placeholder="Normal state" />
      </div>
      <div>
        <Label>Success</Label>
        <Input state="success" placeholder="Success state" defaultValue="valid@email.com" />
      </div>
      <div>
        <Label>Error</Label>
        <Input isInvalid placeholder="Error state" />
        <p className="mt-1 text-sm text-error">This field is required</p>
      </div>
      <div>
        <Label>Warning</Label>
        <Input state="warning" placeholder="Warning state" />
      </div>
    </Stack>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <Stack spacing={4} className="w-80">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div>
        <Label htmlFor="password" isRequired>
          Password
        </Label>
        <Input id="password" type="password" placeholder="••••••••" isRequired />
      </div>
      <div>
        <Label htmlFor="disabled" isDisabled>
          Disabled Field
        </Label>
        <Input id="disabled" disabled placeholder="Disabled input" />
      </div>
    </Stack>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <Stack spacing={4} className="w-80">
      <div>
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Enter text" />
      </div>
      <div>
        <Label htmlFor="email-type">Email</Label>
        <Input id="email-type" type="email" placeholder="you@example.com" />
      </div>
      <div>
        <Label htmlFor="password-type">Password</Label>
        <Input id="password-type" type="password" placeholder="••••••••" />
      </div>
      <div>
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="123" />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" />
      </div>
      <div>
        <Label htmlFor="search">Search</Label>
        <Input id="search" type="search" placeholder="Search..." />
      </div>
    </Stack>
  ),
};

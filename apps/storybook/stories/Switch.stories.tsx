import type { Meta, StoryObj } from '@storybook/react';
import { Switch, Label, Stack } from '@vormir/react';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <div className="flex items-center space-x-2">
        <Switch id="small" size="sm" />
        <Label htmlFor="small">Small switch</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="medium" size="md" defaultChecked />
        <Label htmlFor="medium">Medium switch (default)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="large" size="lg" />
        <Label htmlFor="large">Large switch</Label>
      </div>
    </Stack>
  ),
};

export const Checked: Story = {
  render: () => (
    <Stack spacing={4}>
      <div className="flex items-center space-x-2">
        <Switch id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="checked" defaultChecked />
        <Label htmlFor="checked">Checked</Label>
      </div>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack spacing={4}>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" isDisabled>
          Disabled (off)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on" isDisabled>
          Disabled (on)
        </Label>
      </div>
    </Stack>
  ),
};

export const SettingsExample: Story = {
  render: () => (
    <Stack spacing={4} className="w-80">
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Push Notifications</Label>
        <Switch id="notifications" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode">Dark Mode</Label>
        <Switch id="dark-mode" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="auto-save">Auto Save</Label>
        <Switch id="auto-save" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="analytics">Analytics</Label>
        <Switch id="analytics" />
      </div>
    </Stack>
  ),
};

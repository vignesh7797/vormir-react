import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuGroup, MenuSub } from '@vormir/react';
import { ChevronDown, User, Settings, LogOut, FileText, Folder, Plus, Download, Share2, Trash2 } from 'lucide-react';

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        Open Menu
        <ChevronDown className="h-4 w-4" />
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Billing</MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">Logout</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        My Account
        <ChevronDown className="h-4 w-4" />
      </MenuTrigger>
      <MenuContent>
        <MenuItem icon={<User className="h-4 w-4" />}>Profile</MenuItem>
        <MenuItem icon={<Settings className="h-4 w-4" />}>Settings</MenuItem>
        <MenuSeparator />
        <MenuItem icon={<LogOut className="h-4 w-4" />} variant="destructive">
          Logout
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        File
        <ChevronDown className="h-4 w-4" />
      </MenuTrigger>
      <MenuContent>
        <MenuItem icon={<FileText className="h-4 w-4" />} shortcut="⌘N">
          New File
        </MenuItem>
        <MenuItem icon={<Folder className="h-4 w-4" />} shortcut="⌘⇧N">
          New Folder
        </MenuItem>
        <MenuSeparator />
        <MenuItem icon={<Download className="h-4 w-4" />} shortcut="⌘S">
          Save
        </MenuItem>
        <MenuItem icon={<Share2 className="h-4 w-4" />} shortcut="⌘⇧S">
          Save As...
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Menu>
      <MenuTrigger variant="outline">
        Actions
        <ChevronDown className="h-4 w-4" />
      </MenuTrigger>
      <MenuContent>
        <MenuGroup label="File">
          <MenuItem icon={<Plus className="h-4 w-4" />}>New</MenuItem>
          <MenuItem icon={<Download className="h-4 w-4" />}>Save</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup label="Share">
          <MenuItem icon={<Share2 className="h-4 w-4" />}>Share Link</MenuItem>
          <MenuItem icon={<Download className="h-4 w-4" />}>Download</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup label="Danger">
          <MenuItem icon={<Trash2 className="h-4 w-4" />} variant="destructive">
            Delete
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

export const WithSubmenus: Story = {
  render: () => (
    <Menu>
      <MenuTrigger variant="ghost">
        More Options
        <ChevronDown className="h-4 w-4" />
      </MenuTrigger>
      <MenuContent>
        <MenuItem icon={<FileText className="h-4 w-4" />}>New File</MenuItem>
        <MenuSub label="Export" icon={<Download className="h-4 w-4" />}>
          <MenuItem>Export as PDF</MenuItem>
          <MenuItem>Export as PNG</MenuItem>
          <MenuItem>Export as SVG</MenuItem>
        </MenuSub>
        <MenuSub label="Share" icon={<Share2 className="h-4 w-4" />}>
          <MenuItem>Share via Email</MenuItem>
          <MenuItem>Share via Link</MenuItem>
          <MenuItem>Share to Social</MenuItem>
        </MenuSub>
        <MenuSeparator />
        <MenuItem icon={<Trash2 className="h-4 w-4" />} variant="destructive">
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Menu>
        <MenuTrigger size="sm">Bottom Start</MenuTrigger>
        <MenuContent position="bottom-start">
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger size="sm">Bottom End</MenuTrigger>
        <MenuContent position="bottom-end">
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger size="sm">Top Start</MenuTrigger>
        <MenuContent position="top-start">
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger size="sm">Top End</MenuTrigger>
        <MenuContent position="top-end">
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

export const TriggerVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Menu>
        <MenuTrigger variant="default">Default</MenuTrigger>
        <MenuContent>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger variant="outline">Outline</MenuTrigger>
        <MenuContent>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger variant="ghost">Ghost</MenuTrigger>
        <MenuContent>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

export const TriggerSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Menu>
        <MenuTrigger size="sm" variant="outline">
          Small
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger size="md" variant="outline">
          Medium
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger size="lg" variant="outline">
          Large
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Menu>
      <MenuTrigger variant="outline">Options</MenuTrigger>
      <MenuContent>
        <MenuItem>Available Option</MenuItem>
        <MenuItem disabled>Disabled Option</MenuItem>
        <MenuItem>Another Available</MenuItem>
        <MenuItem disabled>Another Disabled</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('profile');
    
    return (
      <div className="space-y-4">
        <Menu value={value} onValueChange={setValue}>
          <MenuTrigger variant="outline">
            Selected: {value}
            <ChevronDown className="h-4 w-4" />
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="profile" icon={<User className="h-4 w-4" />}>
              Profile
            </MenuItem>
            <MenuItem value="settings" icon={<Settings className="h-4 w-4" />}>
              Settings
            </MenuItem>
            <MenuItem value="billing" icon={<FileText className="h-4 w-4" />}>
              Billing
            </MenuItem>
          </MenuContent>
        </Menu>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Selected value: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from '@vormir/react';
import { Copy, Scissors, Clipboard, Trash, Edit, Share, Download } from 'lucide-react';

const meta = {
  title: 'Phase 6: Advanced Input/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Cut', icon: <Scissors className="w-4 h-4" />, onClick: () => alert('Cut') },
      { label: 'Copy', icon: <Copy className="w-4 h-4" />, onClick: () => alert('Copy') },
      { label: 'Paste', icon: <Clipboard className="w-4 h-4" />, onClick: () => alert('Paste') },
      { separator: true, label: '' },
      { label: 'Delete', icon: <Trash className="w-4 h-4" />, onClick: () => alert('Delete') },
    ],
    children: (
      <div className="w-64 h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-600">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Right-click me
        </p>
      </div>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: () => alert('Edit') },
      { label: 'Share', icon: <Share className="w-4 h-4" />, onClick: () => alert('Share') },
      { label: 'Download', icon: <Download className="w-4 h-4" />, onClick: () => alert('Download') },
      { separator: true, label: '' },
      { label: 'Delete', icon: <Trash className="w-4 h-4" />, onClick: () => alert('Delete') },
    ],
    children: (
      <div className="w-64 h-32 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-600">
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Right-click for actions
        </p>
      </div>
    ),
  },
};

export const WithShortcuts: Story = {
  args: {
    items: [
      { label: 'Cut', icon: <Scissors className="w-4 h-4" />, shortcut: '⌘X', onClick: () => alert('Cut') },
      { label: 'Copy', icon: <Copy className="w-4 h-4" />, shortcut: '⌘C', onClick: () => alert('Copy') },
      { label: 'Paste', icon: <Clipboard className="w-4 h-4" />, shortcut: '⌘V', onClick: () => alert('Paste') },
      { separator: true, label: '' },
      { label: 'Delete', icon: <Trash className="w-4 h-4" />, shortcut: '⌫', onClick: () => alert('Delete') },
    ],
    children: (
      <div className="w-64 h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-600">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Right-click to see shortcuts
        </p>
      </div>
    ),
  },
};

export const WithSubmenus: Story = {
  args: {
    items: [
      { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: () => alert('Edit') },
      {
        label: 'Share',
        icon: <Share className="w-4 h-4" />,
        items: [
          { label: 'Copy Link', onClick: () => alert('Copy Link') },
          { label: 'Email', onClick: () => alert('Email') },
          { label: 'Social Media', onClick: () => alert('Social Media') },
        ],
      },
      { separator: true, label: '' },
      { label: 'Delete', icon: <Trash className="w-4 h-4" />, onClick: () => alert('Delete') },
    ],
    children: (
      <div className="w-64 h-32 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 dark:border-purple-600">
        <p className="text-sm text-purple-600 dark:text-purple-400">
          Right-click for submenus
        </p>
      </div>
    ),
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { label: 'Cut', icon: <Scissors className="w-4 h-4" />, onClick: () => alert('Cut') },
      { label: 'Copy', icon: <Copy className="w-4 h-4" />, onClick: () => alert('Copy') },
      { label: 'Paste', icon: <Clipboard className="w-4 h-4" />, disabled: true, onClick: () => alert('Paste') },
      { separator: true, label: '' },
      { label: 'Delete', icon: <Trash className="w-4 h-4" />, disabled: true, onClick: () => alert('Delete') },
    ],
    children: (
      <div className="w-64 h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-600">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Right-click (some items disabled)
        </p>
      </div>
    ),
  },
};

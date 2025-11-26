import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '@vormir/react';

const meta = {
  title: 'Data Display/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Ctrl',
  },
};

export const SingleKey: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  ),
};

export const KeyCombination: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span>Save:</span>
      <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>S</Kbd>
    </div>
  ),
};

export const ShortcutsList: Story = {
  render: () => (
    <div className="space-y-3 w-[400px]">
      <div className="flex justify-between items-center">
        <span>Copy</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <span>+</span>
          <Kbd>C</Kbd>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Paste</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <span>+</span>
          <Kbd>V</Kbd>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Undo</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <span>+</span>
          <Kbd>Z</Kbd>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Redo</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <span>+</span>
          <Kbd>Shift</Kbd>
          <span>+</span>
          <Kbd>Z</Kbd>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Search</span>
        <div className="flex gap-1">
          <Kbd>⌘</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </div>
      </div>
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <p className="text-sm">
      Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette, or press <Kbd>?</Kbd>{' '}
      to view all keyboard shortcuts.
    </p>
  ),
};

export const ArrowKeys: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>←</Kbd>
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>→</Kbd>
    </div>
  ),
};

export const FunctionKeys: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>F1</Kbd>
      <Kbd>F2</Kbd>
      <Kbd>F5</Kbd>
      <Kbd>F12</Kbd>
    </div>
  ),
};

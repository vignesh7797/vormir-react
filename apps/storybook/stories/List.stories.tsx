import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '@vormir/react';
import { Check, X, AlertCircle } from 'lucide-react';

const meta = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unordered: Story = {
  render: () => (
    <List variant="unordered" className="w-[400px]">
      <ListItem>First item in the list</ListItem>
      <ListItem>Second item in the list</ListItem>
      <ListItem>Third item in the list</ListItem>
      <ListItem>Fourth item in the list</ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List variant="ordered" className="w-[400px]">
      <ListItem>First step in the process</ListItem>
      <ListItem>Second step in the process</ListItem>
      <ListItem>Third step in the process</ListItem>
      <ListItem>Fourth step in the process</ListItem>
    </List>
  ),
};

export const NoMarker: Story = {
  render: () => (
    <List variant="none" className="w-[400px]">
      <ListItem>Item without marker</ListItem>
      <ListItem>Another item without marker</ListItem>
      <ListItem>Third item without marker</ListItem>
    </List>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <List variant="none" className="w-[400px]">
      <ListItem icon={<Check className="h-4 w-4 text-success-500" />}>
        Item completed successfully
      </ListItem>
      <ListItem icon={<X className="h-4 w-4 text-error-500" />}>Item failed to complete</ListItem>
      <ListItem icon={<AlertCircle className="h-4 w-4 text-warning-500" />}>
        Item needs attention
      </ListItem>
    </List>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <List size="sm" variant="unordered" className="w-[400px]">
        <ListItem>Small list item</ListItem>
        <ListItem>Another small item</ListItem>
      </List>

      <List size="md" variant="unordered" className="w-[400px]">
        <ListItem>Medium list item</ListItem>
        <ListItem>Another medium item</ListItem>
      </List>

      <List size="lg" variant="unordered" className="w-[400px]">
        <ListItem>Large list item</ListItem>
        <ListItem>Another large item</ListItem>
      </List>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Extra Small Spacing</h4>
        <List spacing="xs" variant="unordered" className="w-[400px]">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Large Spacing</h4>
        <List spacing="lg" variant="unordered" className="w-[400px]">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Extra Large Spacing</h4>
        <List spacing="xl" variant="unordered" className="w-[400px]">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </div>
    </div>
  ),
};

export const HoverableItems: Story = {
  render: () => (
    <List variant="none" className="w-[400px]">
      <ListItem variant="hover">Hoverable list item</ListItem>
      <ListItem variant="hover">Another hoverable item</ListItem>
      <ListItem variant="hover">Third hoverable item</ListItem>
    </List>
  ),
};

export const Features: Story = {
  render: () => (
    <div className="w-[500px]">
      <h3 className="text-lg font-bold mb-4">Component Features</h3>
      <List variant="none" spacing="md">
        <ListItem icon={<Check className="h-5 w-5 text-success-500" />}>
          Full TypeScript support with strict types
        </ListItem>
        <ListItem icon={<Check className="h-5 w-5 text-success-500" />}>
          Dark mode compatible with theme system
        </ListItem>
        <ListItem icon={<Check className="h-5 w-5 text-success-500" />}>
          Customizable with Tailwind CSS classes
        </ListItem>
        <ListItem icon={<Check className="h-5 w-5 text-success-500" />}>
          Multiple size and spacing variants
        </ListItem>
        <ListItem icon={<Check className="h-5 w-5 text-success-500" />}>
          Support for icons and custom content
        </ListItem>
      </List>
    </div>
  ),
};

export const NestedLists: Story = {
  render: () => (
    <List variant="unordered" className="w-[400px]">
      <ListItem>
        Top level item
        <List variant="unordered" className="mt-2">
          <ListItem>Nested item 1</ListItem>
          <ListItem>Nested item 2</ListItem>
        </List>
      </ListItem>
      <ListItem>Another top level item</ListItem>
      <ListItem>
        Item with nested list
        <List variant="ordered" className="mt-2">
          <ListItem>First nested step</ListItem>
          <ListItem>Second nested step</ListItem>
        </List>
      </ListItem>
    </List>
  ),
};

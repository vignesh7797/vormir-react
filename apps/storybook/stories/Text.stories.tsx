import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@vormir/react';

const meta = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
    },
    weight: {
      control: 'select',
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'error', 'warning'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="2xs">2xs: The quick brown fox</Text>
      <Text size="xs">xs: The quick brown fox</Text>
      <Text size="sm">sm: The quick brown fox</Text>
      <Text size="base">base: The quick brown fox</Text>
      <Text size="lg">lg: The quick brown fox</Text>
      <Text size="xl">xl: The quick brown fox</Text>
      <Text size="2xl">2xl: The quick brown fox</Text>
      <Text size="3xl">3xl: The quick brown fox</Text>
      <Text size="4xl">4xl: The quick brown fox</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="thin">Thin: The quick brown fox</Text>
      <Text weight="light">Light: The quick brown fox</Text>
      <Text weight="normal">Normal: The quick brown fox</Text>
      <Text weight="medium">Medium: The quick brown fox</Text>
      <Text weight="semibold">Semibold: The quick brown fox</Text>
      <Text weight="bold">Bold: The quick brown fox</Text>
      <Text weight="extrabold">Extrabold: The quick brown fox</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default color text</Text>
      <Text color="muted">Muted color text</Text>
      <Text color="primary">Primary color text</Text>
      <Text color="success">Success color text</Text>
      <Text color="error">Error color text</Text>
      <Text color="warning">Warning color text</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Text align="left" className="block">
        Left aligned text
      </Text>
      <Text align="center" className="block">
        Center aligned text
      </Text>
      <Text align="right" className="block">
        Right aligned text
      </Text>
      <Text align="justify" className="block">
        Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </div>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <Text truncate className="block">
        This is a very long text that will be truncated with an ellipsis when it exceeds the
        container width
      </Text>
      <Text className="block">
        This text will wrap normally when it exceeds the container width
      </Text>
    </div>
  ),
};

export const DifferentElements: Story = {
  render: () => (
    <div className="space-y-2">
      <Text as="p" size="lg" weight="bold">
        Paragraph heading
      </Text>
      <Text as="p">This is paragraph text using the Text component.</Text>
      <Text as="h1" size="3xl" weight="bold">
        H1 Heading
      </Text>
      <Text as="h2" size="2xl" weight="semibold">
        H2 Heading
      </Text>
      <Text as="small" size="sm" color="muted">
        Small print text
      </Text>
    </div>
  ),
};

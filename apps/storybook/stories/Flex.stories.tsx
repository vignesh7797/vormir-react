import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Box, Text } from '@vormir/react';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'col', 'row-reverse', 'col-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'wrap-reverse'],
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const FlexItem = ({ children }: { children: React.ReactNode }) => (
  <Box className="rounded-lg border border-border bg-primary p-4 text-center text-primary-foreground">
    <Text weight="semibold">{children}</Text>
  </Box>
);

export const Default: Story = {
  render: () => (
    <Flex gap={4}>
      <FlexItem>Item 1</FlexItem>
      <FlexItem>Item 2</FlexItem>
      <FlexItem>Item 3</FlexItem>
    </Flex>
  ),
};

export const Direction: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Row (Horizontal)
        </Text>
        <Flex direction="row" gap={4}>
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Column (Vertical)
        </Text>
        <Flex direction="col" gap={4}>
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

export const Justify: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Start
        </Text>
        <Flex justify="start" gap={4} className="border border-dashed border-border p-2">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Center
        </Text>
        <Flex justify="center" gap={4} className="border border-dashed border-border p-2">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          End
        </Text>
        <Flex justify="end" gap={4} className="border border-dashed border-border p-2">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Space Between
        </Text>
        <Flex justify="between" gap={4} className="border border-dashed border-border p-2">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Start
        </Text>
        <Flex align="start" gap={4} className="h-32 border border-dashed border-border p-2">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Center
        </Text>
        <Flex align="center" gap={4} className="h-32 border border-dashed border-border p-2">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          End
        </Text>
        <Flex align="end" gap={4} className="h-32 border border-dashed border-border p-2">
          <FlexItem>1</FlexItem>
          <FlexItem>2</FlexItem>
          <FlexItem>3</FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

export const CenteredContent: Story = {
  render: () => (
    <Flex align="center" justify="center" className="h-64 border border-dashed border-border">
      <Box className="rounded-lg border border-border bg-card p-8 text-center">
        <Text size="xl" weight="bold">
          Perfectly Centered
        </Text>
        <Text color="muted">Both horizontally and vertically</Text>
      </Box>
    </Flex>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Flex wrap="wrap" gap={4} className="w-96">
      <FlexItem>Item 1</FlexItem>
      <FlexItem>Item 2</FlexItem>
      <FlexItem>Item 3</FlexItem>
      <FlexItem>Item 4</FlexItem>
      <FlexItem>Item 5</FlexItem>
      <FlexItem>Item 6</FlexItem>
      <FlexItem>Item 7</FlexItem>
      <FlexItem>Item 8</FlexItem>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Items wrap to the next line when they exceed container width',
      },
    },
  },
};

export const HeaderExample: Story = {
  render: () => (
    <Flex justify="between" align="center" className="rounded-lg border border-border bg-card p-4">
      <Text size="xl" weight="bold">
        Logo
      </Text>
      <Flex gap={4}>
        <Text>Home</Text>
        <Text>About</Text>
        <Text>Contact</Text>
      </Flex>
    </Flex>
  ),
};

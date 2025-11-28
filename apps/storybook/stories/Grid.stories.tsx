import type { Meta, StoryObj } from '@storybook/react';
import { Grid, Box, Text } from '@vormir/react';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16],
    },
    flow: {
      control: 'select',
      options: ['row', 'col', 'dense'],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Box className="rounded-lg border border-border bg-primary p-4 text-center text-primary-foreground">
    <Text weight="semibold">{children}</Text>
  </Box>
);

export const Default: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
    </Grid>
  ),
};

export const Columns: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          2 Columns
        </Text>
        <Grid cols={2} gap={4}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
        </Grid>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          3 Columns
        </Text>
        <Grid cols={3} gap={4}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
        </Grid>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          4 Columns
        </Text>
        <Grid cols={4} gap={4}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Gap: 0
        </Text>
        <Grid cols={3} gap={0}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Gap: 4 (1rem)
        </Text>
        <Grid cols={3} gap={4}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
      <div>
        <Text size="lg" weight="bold" className="mb-4">
          Gap: 8 (2rem)
        </Text>
        <Grid cols={3} gap={8}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Grid cols={1} gap={4} className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
      <GridItem>7</GridItem>
      <GridItem>8</GridItem>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid that changes columns based on screen size: 1 col (mobile), 2 cols (sm), 3 cols (md), 4 cols (lg+)',
      },
    },
  },
};

export const Dashboard: Story = {
  render: () => (
    <Grid cols={4} gap={4}>
      <Box className="col-span-4 rounded-lg border border-border bg-card p-6">
        <Text size="xl" weight="bold">
          Header - Full Width
        </Text>
      </Box>
      <Box className="col-span-3 row-span-2 rounded-lg border border-border bg-card p-6">
        <Text size="lg" weight="bold">
          Main Content
        </Text>
        <Text color="muted">Spans 3 columns and 2 rows</Text>
      </Box>
      <Box className="col-span-1 rounded-lg border border-border bg-card p-6">
        <Text weight="bold">Sidebar 1</Text>
      </Box>
      <Box className="col-span-1 rounded-lg border border-border bg-card p-6">
        <Text weight="bold">Sidebar 2</Text>
      </Box>
      <Box className="col-span-4 rounded-lg border border-border bg-card p-6">
        <Text size="xl" weight="bold">
          Footer - Full Width
        </Text>
      </Box>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example dashboard layout using col-span and row-span utilities',
      },
    },
  },
};

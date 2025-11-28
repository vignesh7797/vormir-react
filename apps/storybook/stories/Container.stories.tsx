import type { Meta, StoryObj } from '@storybook/react';
import { Container, Text, Box } from '@vormir/react';

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container>
      <Box className="rounded-lg border border-border bg-card p-8">
        <Text size="xl" weight="bold">
          Default Container
        </Text>
        <Text color="muted">This container has responsive padding and max-width.</Text>
      </Box>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <Container maxWidth="sm">
        <Box className="rounded border border-border bg-primary p-4 text-center text-primary-foreground">
          <Text weight="semibold">Small (640px)</Text>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box className="rounded border border-border bg-primary p-4 text-center text-primary-foreground">
          <Text weight="semibold">Medium (768px)</Text>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box className="rounded border border-border bg-primary p-4 text-center text-primary-foreground">
          <Text weight="semibold">Large (1024px)</Text>
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Box className="rounded border border-border bg-primary p-4 text-center text-primary-foreground">
          <Text weight="semibold">Extra Large (1280px)</Text>
        </Box>
      </Container>
      <Container maxWidth="2xl">
        <Box className="rounded border border-border bg-primary p-4 text-center text-primary-foreground">
          <Text weight="semibold">2XL (1536px)</Text>
        </Box>
      </Container>
    </div>
  ),
};

export const Centered: Story = {
  render: () => (
    <Container maxWidth="md" centerContent>
      <Box className="rounded-lg border border-border bg-card p-8 text-center">
        <Text size="2xl" weight="bold" className="mb-4">
          Centered Content
        </Text>
        <Text color="muted">
          The centerContent prop centers the content both horizontally and vertically.
        </Text>
      </Box>
    </Container>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Container maxWidth="full">
      <Box className="rounded-lg border border-border bg-card p-8">
        <Text size="xl" weight="bold">
          Full Width Container
        </Text>
        <Text color="muted">This container spans the full width with padding.</Text>
      </Box>
    </Container>
  ),
};

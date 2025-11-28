import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeGroup } from '@vormir/react';
import { X, Check } from 'lucide-react';

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="subtle">Subtle</Badge>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge color="brand">Brand</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="error">Error</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="info">Info</Badge>
        <Badge color="neutral">Neutral</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="solid" color="brand">
          Brand
        </Badge>
        <Badge variant="solid" color="success">
          Success
        </Badge>
        <Badge variant="solid" color="error">
          Error
        </Badge>
        <Badge variant="solid" color="warning">
          Warning
        </Badge>
        <Badge variant="solid" color="info">
          Info
        </Badge>
        <Badge variant="solid" color="neutral">
          Neutral
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" color="brand">
          Brand
        </Badge>
        <Badge variant="outline" color="success">
          Success
        </Badge>
        <Badge variant="outline" color="error">
          Error
        </Badge>
        <Badge variant="outline" color="warning">
          Warning
        </Badge>
        <Badge variant="outline" color="info">
          Info
        </Badge>
        <Badge variant="outline" color="neutral">
          Neutral
        </Badge>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center flex-wrap gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge icon={<Check className="h-3 w-3" />}>Verified</Badge>
      <Badge variant="solid" color="success" icon={<Check className="h-3 w-3" />}>
        Active
      </Badge>
      <Badge variant="solid" color="error" icon={<X className="h-3 w-3" />}>
        Inactive
      </Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge dot>Online</Badge>
      <Badge dot color="success">
        Available
      </Badge>
      <Badge dot color="error">
        Offline
      </Badge>
      <Badge dot color="warning">
        Away
      </Badge>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [badges, setBadges] = React.useState(['React', 'TypeScript', 'Tailwind', 'Vite']);

    return (
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <Badge
            key={badge}
            removable
            onRemove={() => setBadges(badges.filter((b) => b !== badge))}
          >
            {badge}
          </Badge>
        ))}
      </div>
    );
  },
};

export const BadgeGroupExample: Story = {
  render: () => (
    <BadgeGroup max={3}>
      <Badge>React</Badge>
      <Badge>TypeScript</Badge>
      <Badge>Tailwind</Badge>
      <Badge>Vite</Badge>
      <Badge>Vitest</Badge>
    </BadgeGroup>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Draft:</span>
        <Badge color="neutral">Draft</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Published:</span>
        <Badge color="success" dot>
          Published
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Archived:</span>
        <Badge color="warning">Archived</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Deleted:</span>
        <Badge variant="solid" color="error">
          Deleted
        </Badge>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '@vormir/react';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    fallback: 'JD',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
      <Avatar size="2xl" fallback="2X" />
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=1" fallback="JD" />
      <Avatar src="https://i.pravatar.cc/150?img=2" fallback="SM" />
      <Avatar src="https://i.pravatar.cc/150?img=3" fallback="AB" />
    </div>
  ),
};

export const FallbackInitials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar fallback="John Doe" />
      <Avatar fallback="Sarah Miller" />
      <Avatar fallback="Alex Brown" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://i.pravatar.cc/150?img=1"
        fallback="JD"
        status="online"
        statusPosition="bottom-right"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=2"
        fallback="SM"
        status="offline"
        statusPosition="bottom-right"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        fallback="AB"
        status="away"
        statusPosition="bottom-right"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=4"
        fallback="KW"
        status="busy"
        statusPosition="bottom-right"
      />
    </div>
  ),
};

export const StatusPositions: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://i.pravatar.cc/150?img=1"
        fallback="JD"
        status="online"
        statusPosition="top-left"
        size="lg"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=2"
        fallback="SM"
        status="online"
        statusPosition="top-right"
        size="lg"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        fallback="AB"
        status="online"
        statusPosition="bottom-left"
        size="lg"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=4"
        fallback="KW"
        status="online"
        statusPosition="bottom-right"
        size="lg"
      />
    </div>
  ),
};

export const AvatarGroupExample: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar src="https://i.pravatar.cc/150?img=1" fallback="JD" />
      <Avatar src="https://i.pravatar.cc/150?img=2" fallback="SM" />
      <Avatar src="https://i.pravatar.cc/150?img=3" fallback="AB" />
      <Avatar src="https://i.pravatar.cc/150?img=4" fallback="KW" />
      <Avatar src="https://i.pravatar.cc/150?img=5" fallback="LM" />
    </AvatarGroup>
  ),
};

export const LargeGroup: Story = {
  render: () => (
    <AvatarGroup max={5}>
      {Array.from({ length: 10 }, (_, i) => (
        <Avatar
          key={i}
          src={`https://i.pravatar.cc/150?img=${i + 1}`}
          fallback={`U${i + 1}`}
        />
      ))}
    </AvatarGroup>
  ),
};

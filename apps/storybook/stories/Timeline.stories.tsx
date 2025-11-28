import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from '@vormir/react';
import { Check, Package, Truck, Home } from 'lucide-react';

const meta = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Timeline className="w-[500px]">
      <TimelineItem title="Order Placed" time="2 hours ago">
        Your order has been confirmed and is being prepared.
      </TimelineItem>
      <TimelineItem title="Processing" time="1 hour ago">
        Your order is currently being processed.
      </TimelineItem>
      <TimelineItem title="Shipped" time="30 minutes ago">
        Your order has been shipped and is on its way.
      </TimelineItem>
      <TimelineItem title="Out for Delivery">
        Your order is out for delivery and will arrive soon.
      </TimelineItem>
    </Timeline>
  ),
};

export const WithColors: Story = {
  render: () => (
    <Timeline className="w-[500px]">
      <TimelineItem title="Order Placed" time="2 hours ago" color="brand">
        Your order has been confirmed and is being prepared.
      </TimelineItem>
      <TimelineItem title="Processing" time="1 hour ago" color="info">
        Your order is currently being processed.
      </TimelineItem>
      <TimelineItem title="Shipped" time="30 minutes ago" color="warning">
        Your order has been shipped and is on its way.
      </TimelineItem>
      <TimelineItem title="Delivered" color="success">
        Your order has been delivered successfully.
      </TimelineItem>
    </Timeline>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Timeline className="w-[500px]">
      <TimelineItem
        title="Order Placed"
        time="2 hours ago"
        color="brand"
        icon={<Check className="h-3 w-3" />}
      >
        Your order has been confirmed and is being prepared.
      </TimelineItem>
      <TimelineItem
        title="Processing"
        time="1 hour ago"
        color="info"
        icon={<Package className="h-3 w-3" />}
      >
        Your order is currently being processed.
      </TimelineItem>
      <TimelineItem
        title="Shipped"
        time="30 minutes ago"
        color="warning"
        icon={<Truck className="h-3 w-3" />}
      >
        Your order has been shipped and is on its way.
      </TimelineItem>
      <TimelineItem title="Delivered" color="success" icon={<Home className="h-3 w-3" />}>
        Your order has been delivered successfully.
      </TimelineItem>
    </Timeline>
  ),
};

export const SolidVariant: Story = {
  render: () => (
    <Timeline className="w-[500px]">
      <TimelineItem
        title="Order Placed"
        time="2 hours ago"
        variant="solid"
        color="brand"
        icon={<Check className="h-3 w-3" />}
      >
        Your order has been confirmed and is being prepared.
      </TimelineItem>
      <TimelineItem
        title="Processing"
        time="1 hour ago"
        variant="solid"
        color="info"
        icon={<Package className="h-3 w-3" />}
      >
        Your order is currently being processed.
      </TimelineItem>
      <TimelineItem
        title="Shipped"
        time="30 minutes ago"
        variant="solid"
        color="warning"
        icon={<Truck className="h-3 w-3" />}
      >
        Your order has been shipped and is on its way.
      </TimelineItem>
      <TimelineItem
        title="Delivered"
        variant="solid"
        color="success"
        icon={<Home className="h-3 w-3" />}
      >
        Your order has been delivered successfully.
      </TimelineItem>
    </Timeline>
  ),
};

export const ProjectMilestones: Story = {
  render: () => (
    <Timeline className="w-[600px]">
      <TimelineItem
        title="Project Kickoff"
        time="January 1, 2024"
        color="brand"
        description="Initial project setup and team alignment"
      >
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Repository created</li>
          <li>Team assigned</li>
          <li>Initial planning complete</li>
        </ul>
      </TimelineItem>
      <TimelineItem
        title="Phase 1 Complete"
        time="February 15, 2024"
        color="success"
        description="Core features implemented"
      >
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Authentication system</li>
          <li>Database schema</li>
          <li>API endpoints</li>
        </ul>
      </TimelineItem>
      <TimelineItem
        title="Beta Testing"
        time="March 1, 2024"
        color="warning"
        description="User acceptance testing in progress"
      >
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>50 beta testers onboarded</li>
          <li>Feedback collection started</li>
        </ul>
      </TimelineItem>
      <TimelineItem
        title="Launch"
        time="March 30, 2024"
        color="brand"
        description="Public release scheduled"
      />
    </Timeline>
  ),
};

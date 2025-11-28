import type { Meta, StoryObj } from '@storybook/react';
import { Stat, StatGroup } from '@vormir/react';
import { TrendingUp, DollarSign, Users, ShoppingCart } from 'lucide-react';

const meta = {
  title: 'Data Display/Stat',
  component: Stat,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$45,231',
  },
};

export const WithTrend: Story = {
  render: () => (
    <div className="flex gap-4">
      <Stat label="Revenue" value="$45,231" trend="up" trendValue="+12%" />
      <Stat label="Expenses" value="$12,456" trend="down" trendValue="-5%" />
      <Stat label="Profit" value="$32,775" trend="neutral" trendValue="0%" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Stat
        label="Total Revenue"
        value="$45,231"
        trend="up"
        trendValue="+12%"
        icon={<DollarSign className="h-5 w-5" />}
      />
      <Stat
        label="Active Users"
        value="2,345"
        trend="up"
        trendValue="+8%"
        icon={<Users className="h-5 w-5" />}
      />
      <Stat
        label="Orders"
        value="1,234"
        trend="down"
        trendValue="-3%"
        icon={<ShoppingCart className="h-5 w-5" />}
      />
    </div>
  ),
};

export const WithHelpText: Story = {
  args: {
    label: 'Total Revenue',
    value: '$45,231',
    trend: 'up',
    trendValue: '+12%',
    helpText: 'Compared to last month',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Stat
        variant="default"
        label="Default"
        value="$45,231"
        trend="up"
        trendValue="+12%"
      />
      <Stat
        variant="bordered"
        label="Bordered"
        value="$45,231"
        trend="up"
        trendValue="+12%"
      />
      <Stat variant="filled" label="Filled" value="$45,231" trend="up" trendValue="+12%" />
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <StatGroup columns={4}>
      <Stat
        variant="bordered"
        label="Total Revenue"
        value="$45,231"
        trend="up"
        trendValue="+12%"
        helpText="Compared to last month"
        icon={<DollarSign className="h-5 w-5" />}
      />
      <Stat
        variant="bordered"
        label="Active Users"
        value="2,345"
        trend="up"
        trendValue="+8%"
        helpText="New users this month"
        icon={<Users className="h-5 w-5" />}
      />
      <Stat
        variant="bordered"
        label="Total Orders"
        value="1,234"
        trend="down"
        trendValue="-3%"
        helpText="From last month"
        icon={<ShoppingCart className="h-5 w-5" />}
      />
      <Stat
        variant="bordered"
        label="Conversion Rate"
        value="3.2%"
        trend="up"
        trendValue="+0.5%"
        helpText="Last 30 days"
        icon={<TrendingUp className="h-5 w-5" />}
      />
    </StatGroup>
  ),
};

export const ThreeColumnGrid: Story = {
  render: () => (
    <StatGroup columns={3}>
      <Stat
        label="Page Views"
        value="12,543"
        trend="up"
        trendValue="+15%"
        helpText="Last 7 days"
      />
      <Stat
        label="Bounce Rate"
        value="42%"
        trend="down"
        trendValue="-5%"
        helpText="Improvement"
      />
      <Stat
        label="Avg. Session"
        value="3m 24s"
        trend="up"
        trendValue="+12s"
        helpText="Time on site"
      />
    </StatGroup>
  ),
};

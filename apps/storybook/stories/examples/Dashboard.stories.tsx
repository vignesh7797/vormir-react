import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from '../../../../examples/dashboard/Dashboard';

const meta = {
  title: 'Examples/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Dashboard Template

A comprehensive admin dashboard interface featuring:
- Collapsible sidebar navigation
- Top header with search and user menu
- Stats overview cards with trend indicators
- Data tables with avatars and badges
- Recent activity feed
- Responsive layout

**Components Used:** Sidebar, Menu, Table, Avatar, Badge, Card, Grid, Flex, Button, Input

**Features Demonstrated:**
- Complex navigation patterns
- Data visualization layouts
- State management (sidebar, tabs)
- Table with custom cells
- User authentication UI patterns

**Try different themes** to see how the dashboard adapts!
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Dashboard />,
};

export const OceanTheme: Story = {
  render: () => <Dashboard />,
  parameters: {
    theme: 'ocean',
  },
};

export const ForestTheme: Story = {
  render: () => <Dashboard />,
  parameters: {
    theme: 'forest',
  },
};

export const SunsetTheme: Story = {
  render: () => <Dashboard />,
  parameters: {
    theme: 'sunset',
  },
};

export const MidnightTheme: Story = {
  render: () => <Dashboard />,
  parameters: {
    theme: 'midnight',
  },
};

export const CorporateTheme: Story = {
  render: () => <Dashboard />,
  parameters: {
    theme: 'corporate',
  },
};

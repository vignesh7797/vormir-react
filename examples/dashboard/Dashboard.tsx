import { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  Text,
  Button,
  Card,
  Avatar,
  Badge,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNavItem,
} from '../../packages/react/src';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Activity,
} from 'lucide-react';

/**
 * Dashboard Template
 * 
 * A comprehensive admin dashboard showcasing:
 * - Sidebar navigation
 * - Top header with search and notifications
 * - Stats overview cards
 * - Data tables
 * - Charts and visualizations
 * - Recent activity feed
 * 
 * This example demonstrates real-world usage of Vormir components
 * in a production-ready admin interface.
 */

// Mock data
const stats = [
  {
    label: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up' as const,
    icon: DollarSign,
  },
  {
    label: 'Active Users',
    value: '2,350',
    change: '+15.3%',
    trend: 'up' as const,
    icon: Users,
  },
  {
    label: 'Orders',
    value: '1,234',
    change: '-4.3%',
    trend: 'down' as const,
    icon: ShoppingCart,
  },
  {
    label: 'Products',
    value: '567',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Package,
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: '$129.00',
    status: 'completed',
    date: '2025-11-27',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    amount: '$249.00',
    status: 'pending',
    date: '2025-11-27',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    amount: '$399.00',
    status: 'processing',
    date: '2025-11-26',
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    amount: '$89.00',
    status: 'completed',
    date: '2025-11-26',
  },
  {
    id: 'ORD-005',
    customer: 'Charlie Wilson',
    email: 'charlie@example.com',
    amount: '$179.00',
    status: 'cancelled',
    date: '2025-11-25',
  },
];

const activities = [
  {
    action: 'New order received',
    user: 'John Doe',
    time: '2 minutes ago',
    type: 'order',
  },
  {
    action: 'Payment processed',
    user: 'Jane Smith',
    time: '15 minutes ago',
    type: 'payment',
  },
  {
    action: 'Product updated',
    user: 'Admin',
    time: '1 hour ago',
    type: 'product',
  },
  {
    action: 'User registered',
    user: 'Bob Johnson',
    time: '2 hours ago',
    type: 'user',
  },
];

const statusColors = {
  completed: 'success' as const,
  pending: 'warning' as const,
  processing: 'info' as const,
  cancelled: 'error' as const,
};

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Flex className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onOpenChange={setSidebarOpen}
        variant="default"
        className="border-r border-neutral-200 dark:border-neutral-800"
      >
        <SidebarHeader className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <Flex align="center" gap="3">
            <Box className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Text weight="bold" className="text-white">V</Text>
            </Box>
            <Text size="lg" weight="bold">Vormir</Text>
          </Flex>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <nav className="space-y-1">
            <SidebarNavItem
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard className="w-4 h-4" />
              <Text size="sm">Overview</Text>
            </SidebarNavItem>
            
            <SidebarNavItem
              active={activeTab === 'customers'}
              onClick={() => setActiveTab('customers')}
            >
              <Users className="w-4 h-4" />
              <Text size="sm">Customers</Text>
            </SidebarNavItem>
            
            <SidebarNavItem
              active={activeTab === 'orders'}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingCart className="w-4 h-4" />
              <Text size="sm">Orders</Text>
            </SidebarNavItem>
            
            <SidebarNavItem
              active={activeTab === 'analytics'}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 className="w-4 h-4" />
              <Text size="sm">Analytics</Text>
            </SidebarNavItem>
            
            <SidebarNavItem
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-4 h-4" />
              <Text size="sm">Settings</Text>
            </SidebarNavItem>
          </nav>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <Flex align="center" gap="3">
            <Avatar
              src="https://i.pravatar.cc/150?img=1"
              fallback="AD"
              size="sm"
              status="online"
            />
            <Box className="flex-1 min-w-0">
              <Text size="sm" weight="medium" className="truncate">
                Admin User
              </Text>
              <Text size="xs" color="muted" className="truncate">
                admin@vormir.com
              </Text>
            </Box>
          </Flex>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <Box className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Box className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
          <Flex justify="between" align="center">
            <Flex align="center" gap="4" className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <LayoutDashboard className="w-4 h-4" />
              </Button>

              <Box className="flex-1 max-w-md">
                <Input
                  placeholder="Search..."
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </Box>
            </Flex>

            <Flex align="center" gap="3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>

              <Menu>
                <MenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Avatar
                      src="https://i.pravatar.cc/150?img=1"
                      fallback="AD"
                      size="xs"
                    />
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Help</MenuItem>
                  <MenuItem variant="destructive">Logout</MenuItem>
                </MenuContent>
              </Menu>
            </Flex>
          </Flex>
        </Box>

        {/* Page Content */}
        <Box className="flex-1 overflow-auto p-6">
          <Container maxWidth="full">
            {/* Page Title */}
            <Box className="mb-6">
              <Text size="3xl" weight="bold">Dashboard</Text>
              <Text color="muted" className="mt-1">
                Welcome back! Here's what's happening with your store today.
              </Text>
            </Box>

            {/* Stats Grid */}
            <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="6" className="mb-8">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-6">
                  <Flex justify="between" align="start" className="mb-4">
                    <Box className="p-2 bg-primary/10 rounded-lg">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </Box>
                    <Badge variant={stat.trend === 'up' ? 'success' : 'error'}>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {stat.change}
                    </Badge>
                  </Flex>
                  <Text size="2xl" weight="bold" className="mb-1">
                    {stat.value}
                  </Text>
                  <Text size="sm" color="muted">
                    {stat.label}
                  </Text>
                </Card>
              ))}
            </Grid>

            <Grid cols={{ base: 1, lg: 3 }} gap="6">
              {/* Recent Orders */}
              <Card className="lg:col-span-2">
                <Box className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <Flex justify="between" align="center">
                    <Text size="lg" weight="semibold">Recent Orders</Text>
                    <Button variant="ghost" size="sm">View All</Button>
                  </Flex>
                </Box>
                <Box className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Text size="sm" weight="medium">{order.id}</Text>
                          </TableCell>
                          <TableCell>
                            <Flex align="center" gap="2">
                              <Avatar
                                src={`https://i.pravatar.cc/150?u=${order.email}`}
                                fallback={order.customer[0]}
                                size="xs"
                              />
                              <Box>
                                <Text size="sm" weight="medium">
                                  {order.customer}
                                </Text>
                                <Text size="xs" color="muted">
                                  {order.email}
                                </Text>
                              </Box>
                            </Flex>
                          </TableCell>
                          <TableCell>
                            <Text size="sm" weight="medium">{order.amount}</Text>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusColors[order.status]}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Text size="sm" color="muted">{order.date}</Text>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Card>

              {/* Recent Activity */}
              <Card>
                <Box className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <Text size="lg" weight="semibold">Recent Activity</Text>
                </Box>
                <Box className="p-6">
                  <Box className="space-y-4">
                    {activities.map((activity, index) => (
                      <Flex key={index} gap="3">
                        <Box className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-primary" />
                        </Box>
                        <Box className="flex-1 min-w-0">
                          <Text size="sm" weight="medium" className="mb-1">
                            {activity.action}
                          </Text>
                          <Text size="xs" color="muted">
                            {activity.user} · {activity.time}
                          </Text>
                        </Box>
                      </Flex>
                    ))}
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Flex>
  );
}

export default Dashboard;

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarToggle,
} from '@vormir/react';
import {
  Home,
  Search,
  Settings,
  User,
  Mail,
  Bell,
  FileText,
  Folder,
  Calendar,
  BarChart,
} from 'lucide-react';
import { Box, Text, Button } from '@vormir/react';

const meta = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible sidebar component with support for collapsed state, mobile overlay, and customizable navigation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <Text as="h2" weight="semibold" className="text-lg">
              MyApp
            </Text>
            <SidebarToggle />
          </SidebarHeader>

          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem href="#" active icon={<Home className="h-4 w-4" />}>
                Home
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Search className="h-4 w-4" />}>
                Search
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Mail className="h-4 w-4" />}>
                Messages
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Bell className="h-4 w-4" />}>
                Notifications
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Calendar className="h-4 w-4" />}>
                Calendar
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<BarChart className="h-4 w-4" />}>
                Analytics
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <Text size="sm" weight="medium">
                  John Doe
                </Text>
                <Text size="xs" color="muted">
                  john@example.com
                </Text>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto">
          <Box className="max-w-4xl">
            <Text as="h1" size="4xl" weight="bold" className="mb-4">
              Main Content Area
            </Text>
            <Text className="text-neutral-600 dark:text-neutral-400">
              This is the main content area. The sidebar is always visible on desktop and can be toggled on
              mobile devices. Try resizing your browser window to see the responsive behavior.
            </Text>
          </Box>
        </main>
      </div>
    );
  },
};

export const WithOverlay: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex h-screen">
        <Sidebar variant="overlay" isOpen={isOpen} onOpenChange={setIsOpen}>
          <SidebarHeader>
            <Text as="h2" weight="semibold" className="text-lg">
              MyApp
            </Text>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              ×
            </Button>
          </SidebarHeader>

          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem href="#" active icon={<Home className="h-4 w-4" />}>
                Home
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<FileText className="h-4 w-4" />}>
                Documents
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Folder className="h-4 w-4" />}>
                Projects
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Calendar className="h-4 w-4" />}>
                Calendar
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>

          <SidebarFooter>
            <Button variant="outline" size="sm" className="w-full">
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto">
          <Button onClick={() => setIsOpen(true)} className="mb-4">
            Open Sidebar
          </Button>

          <Box className="max-w-4xl">
            <Text as="h1" size="4xl" weight="bold" className="mb-4">
              Overlay Sidebar Example
            </Text>
            <Text className="text-neutral-600 dark:text-neutral-400 mb-4">
              The overlay sidebar slides over the content when opened. Click the button above or use the
              backdrop to close it.
            </Text>
            <Text className="text-neutral-600 dark:text-neutral-400">
              This variant is useful for mobile-first designs or when you want the sidebar to overlay the
              content instead of pushing it aside.
            </Text>
          </Box>
        </main>
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <div className="flex h-screen">
        <Sidebar isCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed}>
          <SidebarHeader>
            {!isCollapsed && (
              <Text as="h2" weight="semibold" className="text-lg">
                MyApp
              </Text>
            )}
            <SidebarToggle />
          </SidebarHeader>

          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem href="#" active icon={<Home className="h-4 w-4" />}>
                Home
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Search className="h-4 w-4" />}>
                Search
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Mail className="h-4 w-4" />}>
                Messages
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Bell className="h-4 w-4" />}>
                Notifications
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Calendar className="h-4 w-4" />}>
                Calendar
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>

          <SidebarFooter>
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <Text size="sm" weight="medium">
                    John Doe
                  </Text>
                </div>
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center mx-auto">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto">
          <Box className="max-w-4xl">
            <Text as="h1" size="4xl" weight="bold" className="mb-4">
              Collapsed Sidebar Example
            </Text>
            <Text className="text-neutral-600 dark:text-neutral-400 mb-4">
              Click the toggle button in the sidebar header to expand or collapse the sidebar. When collapsed,
              only icons are shown.
            </Text>
            <Text className="text-neutral-600 dark:text-neutral-400">
              This is useful for saving screen space while keeping navigation easily accessible.
            </Text>
          </Box>
        </main>
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    return (
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <Text as="h2" weight="semibold" className="text-lg">
              Dashboard
            </Text>
            <SidebarToggle />
          </SidebarHeader>

          <SidebarContent>
            <div className="space-y-4">
              <div>
                <Text size="xs" weight="semibold" color="muted" className="px-4 mb-2">
                  MAIN
                </Text>
                <SidebarNav>
                  <SidebarNavItem href="#" active icon={<Home className="h-4 w-4" />}>
                    Dashboard
                  </SidebarNavItem>
                  <SidebarNavItem href="#" icon={<Search className="h-4 w-4" />}>
                    Search
                  </SidebarNavItem>
                </SidebarNav>
              </div>

              <div>
                <Text size="xs" weight="semibold" color="muted" className="px-4 mb-2">
                  CONTENT
                </Text>
                <SidebarNav>
                  <SidebarNavItem href="#" icon={<FileText className="h-4 w-4" />}>
                    Documents
                  </SidebarNavItem>
                  <SidebarNavItem href="#" icon={<Folder className="h-4 w-4" />}>
                    Projects
                  </SidebarNavItem>
                </SidebarNav>
              </div>

              <div>
                <Text size="xs" weight="semibold" color="muted" className="px-4 mb-2">
                  ANALYTICS
                </Text>
                <SidebarNav>
                  <SidebarNavItem href="#" icon={<BarChart className="h-4 w-4" />}>
                    Reports
                  </SidebarNavItem>
                  <SidebarNavItem href="#" icon={<Calendar className="h-4 w-4" />}>
                    Calendar
                  </SidebarNavItem>
                </SidebarNav>
              </div>

              <div>
                <Text size="xs" weight="semibold" color="muted" className="px-4 mb-2">
                  SETTINGS
                </Text>
                <SidebarNav>
                  <SidebarNavItem href="#" icon={<User className="h-4 w-4" />}>
                    Profile
                  </SidebarNavItem>
                  <SidebarNavItem href="#" icon={<Settings className="h-4 w-4" />}>
                    Settings
                  </SidebarNavItem>
                </SidebarNav>
              </div>
            </div>
          </SidebarContent>

          <SidebarFooter>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto">
          <Box className="max-w-4xl">
            <Text as="h1" size="4xl" weight="bold" className="mb-4">
              Grouped Navigation
            </Text>
            <Text className="text-neutral-600 dark:text-neutral-400">
              Navigation items can be organized into groups with headings for better organization.
            </Text>
          </Box>
        </main>
      </div>
    );
  },
};

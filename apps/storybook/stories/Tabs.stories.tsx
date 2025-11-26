import React from 'react';
import type { Meta } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@vormir/react';
import { User, Settings, Bell, Shield } from 'lucide-react';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

export const Default = () => (
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
        <p>This is the content for tab 1.</p>
      </div>
    </TabsContent>
    <TabsContent value="tab2">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
        <p>This is the content for tab 2.</p>
      </div>
    </TabsContent>
    <TabsContent value="tab3">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
        <p>This is the content for tab 3.</p>
      </div>
    </TabsContent>
  </Tabs>
);

export const WithIcons = () => (
  <Tabs defaultValue="profile">
    <TabsList>
      <TabsTrigger value="profile" icon={<User className="h-4 w-4" />}>
        Profile
      </TabsTrigger>
      <TabsTrigger value="settings" icon={<Settings className="h-4 w-4" />}>
        Settings
      </TabsTrigger>
      <TabsTrigger value="notifications" icon={<Bell className="h-4 w-4" />}>
        Notifications
      </TabsTrigger>
      <TabsTrigger value="security" icon={<Shield className="h-4 w-4" />}>
        Security
      </TabsTrigger>
    </TabsList>
    <TabsContent value="profile">
      <div className="p-4">Profile settings content</div>
    </TabsContent>
    <TabsContent value="settings">
      <div className="p-4">General settings content</div>
    </TabsContent>
    <TabsContent value="notifications">
      <div className="p-4">Notification preferences content</div>
    </TabsContent>
    <TabsContent value="security">
      <div className="p-4">Security settings content</div>
    </TabsContent>
  </Tabs>
);

export const Pills = () => (
  <Tabs defaultValue="all" variant="pills">
    <TabsList>
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="active">Active</TabsTrigger>
      <TabsTrigger value="completed">Completed</TabsTrigger>
      <TabsTrigger value="archived">Archived</TabsTrigger>
    </TabsList>
    <TabsContent value="all">
      <div className="p-4">Showing all items</div>
    </TabsContent>
    <TabsContent value="active">
      <div className="p-4">Showing active items</div>
    </TabsContent>
    <TabsContent value="completed">
      <div className="p-4">Showing completed items</div>
    </TabsContent>
    <TabsContent value="archived">
      <div className="p-4">Showing archived items</div>
    </TabsContent>
  </Tabs>
);

export const Enclosed = () => (
  <Tabs defaultValue="preview" variant="enclosed">
    <TabsList>
      <TabsTrigger value="preview">Preview</TabsTrigger>
      <TabsTrigger value="code">Code</TabsTrigger>
      <TabsTrigger value="styles">Styles</TabsTrigger>
    </TabsList>
    <TabsContent value="preview">
      <div className="border border-t-0 p-4 rounded-b-md">Preview content</div>
    </TabsContent>
    <TabsContent value="code">
      <div className="border border-t-0 p-4 rounded-b-md">Code content</div>
    </TabsContent>
    <TabsContent value="styles">
      <div className="border border-t-0 p-4 rounded-b-md">Styles content</div>
    </TabsContent>
  </Tabs>
);

export const Vertical = () => (
  <Tabs defaultValue="general" orientation="vertical">
    <TabsList>
      <TabsTrigger value="general">General</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
      <TabsTrigger value="team">Team</TabsTrigger>
      <TabsTrigger value="advanced">Advanced</TabsTrigger>
    </TabsList>
    <TabsContent value="general">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">General Settings</h3>
        <p>Configure general application settings.</p>
      </div>
    </TabsContent>
    <TabsContent value="billing">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Billing</h3>
        <p>Manage billing and subscription.</p>
      </div>
    </TabsContent>
    <TabsContent value="team">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Team</h3>
        <p>Manage team members and permissions.</p>
      </div>
    </TabsContent>
    <TabsContent value="advanced">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Advanced</h3>
        <p>Advanced configuration options.</p>
      </div>
    </TabsContent>
  </Tabs>
);

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  CommandPalette,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandEmpty,
} from '@vormir/react';
import {
  File,
  Folder,
  Settings,
  User,
  Mail,
  Calendar,
  Search,
  Home,
  Bell,
  LogOut,
} from 'lucide-react';
import { Button } from '@vormir/react';

const meta = {
  title: 'Components/Advanced/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A command palette component for keyboard-driven navigation. Press ⌘K (Mac) or Ctrl+K (Windows) to open.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <Button onClick={() => setOpen(true)}>
          Open Command Palette <kbd className="ml-2 text-xs">⌘K</kbd>
        </Button>

        <CommandPalette isOpen={open} onOpenChange={setOpen}>
          <CommandGroup heading="Navigation">
            <CommandItem icon={<Home className="h-4 w-4" />} value="Home" shortcut="⌘H">
              Home
            </CommandItem>
            <CommandItem icon={<Search className="h-4 w-4" />} value="Search" shortcut="⌘F">
              Search
            </CommandItem>
            <CommandItem icon={<Bell className="h-4 w-4" />} value="Notifications">
              Notifications
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem icon={<File className="h-4 w-4" />} value="New File" shortcut="⌘N">
              New File
            </CommandItem>
            <CommandItem icon={<Folder className="h-4 w-4" />} value="New Folder">
              New Folder
            </CommandItem>
            <CommandItem icon={<Mail className="h-4 w-4" />} value="Send Email">
              Send Email
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem icon={<User className="h-4 w-4" />} value="Profile" shortcut="⌘P">
              Profile Settings
            </CommandItem>
            <CommandItem icon={<Settings className="h-4 w-4" />} value="Settings" shortcut="⌘,">
              System Settings
            </CommandItem>
            <CommandItem icon={<LogOut className="h-4 w-4" />} value="Logout">
              Log Out
            </CommandItem>
          </CommandGroup>

          <CommandEmpty>No results found.</CommandEmpty>
        </CommandPalette>
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (value: string) => {
      setSelected(value);
      setTimeout(() => setSelected(null), 2000);
    };

    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-4">
        <Button onClick={() => setOpen(true)}>
          Open Command Palette <kbd className="ml-2 text-xs">⌘K</kbd>
        </Button>

        {selected && (
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Selected: <strong>{selected}</strong>
          </div>
        )}

        <CommandPalette isOpen={open} onOpenChange={setOpen} placeholder="Search commands...">
          <CommandGroup heading="Files">
            <CommandItem
              icon={<File className="h-4 w-4" />}
              value="Dashboard"
              keywords={['home', 'main', 'overview']}
              onSelect={() => handleSelect('Dashboard')}
            >
              Dashboard
            </CommandItem>
            <CommandItem
              icon={<File className="h-4 w-4" />}
              value="Projects"
              keywords={['work', 'tasks']}
              onSelect={() => handleSelect('Projects')}
            >
              Projects
            </CommandItem>
            <CommandItem
              icon={<File className="h-4 w-4" />}
              value="Reports"
              keywords={['analytics', 'data']}
              onSelect={() => handleSelect('Reports')}
            >
              Reports
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent">
            <CommandItem
              icon={<Calendar className="h-4 w-4" />}
              value="Meeting Notes"
              onSelect={() => handleSelect('Meeting Notes')}
            >
              Meeting Notes - Today
            </CommandItem>
            <CommandItem
              icon={<File className="h-4 w-4" />}
              value="Budget 2024"
              onSelect={() => handleSelect('Budget 2024')}
            >
              Budget 2024
            </CommandItem>
          </CommandGroup>

          <CommandEmpty>
            <div className="py-4">
              <p className="text-sm font-medium mb-1">No results found</p>
              <p className="text-xs text-neutral-400">Try searching for something else</p>
            </div>
          </CommandEmpty>
        </CommandPalette>
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <Button onClick={() => setOpen(true)}>Open Command Palette</Button>

        <CommandPalette isOpen={open} onOpenChange={setOpen}>
          <CommandGroup heading="Actions">
            <CommandItem icon={<File className="h-4 w-4" />} value="New File">
              New File
            </CommandItem>
            <CommandItem icon={<Folder className="h-4 w-4" />} value="New Folder" disabled>
              New Folder (Coming Soon)
            </CommandItem>
            <CommandItem icon={<Mail className="h-4 w-4" />} value="Send Email">
              Send Email
            </CommandItem>
            <CommandItem icon={<Settings className="h-4 w-4" />} value="Settings" disabled>
              Settings (Admin Only)
            </CommandItem>
          </CommandGroup>

          <CommandEmpty>No results found.</CommandEmpty>
        </CommandPalette>
      </div>
    );
  },
};

export const KeyboardNavigation: Story = {
  render: () => {
    const [open, setOpen] = useState(true); // Open by default for demo

    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="text-center space-y-2 mb-4">
          <p className="text-sm font-medium">Keyboard Shortcuts:</p>
          <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            <div><kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">⌘K</kbd> Open/Close</div>
            <div><kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">↑↓</kbd> Navigate</div>
            <div><kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">Enter</kbd> Select</div>
            <div><kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">Esc</kbd> Close</div>
          </div>
        </div>

        <Button onClick={() => setOpen(true)}>Reopen Command Palette</Button>

        <CommandPalette isOpen={open} onOpenChange={setOpen}>
          <CommandGroup heading="Quick Actions">
            <CommandItem icon={<Home className="h-4 w-4" />} value="Home" shortcut="⌘H">
              Go to Home
            </CommandItem>
            <CommandItem icon={<Search className="h-4 w-4" />} value="Search" shortcut="⌘F">
              Search Files
            </CommandItem>
            <CommandItem icon={<User className="h-4 w-4" />} value="Profile" shortcut="⌘P">
              View Profile
            </CommandItem>
            <CommandItem icon={<Settings className="h-4 w-4" />} value="Settings" shortcut="⌘,">
              Open Settings
            </CommandItem>
            <CommandItem icon={<Bell className="h-4 w-4" />} value="Notifications" shortcut="⌘N">
              View Notifications
            </CommandItem>
          </CommandGroup>

          <CommandEmpty>No commands found.</CommandEmpty>
        </CommandPalette>
      </div>
    );
  },
};

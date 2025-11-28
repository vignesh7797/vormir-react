import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@vormir/react';
import { Save, Download, Trash2 } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    colorScheme: {
      control: 'select',
      options: ['brand', 'success', 'error', 'warning'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button colorScheme="brand">Brand</Button>
      <Button colorScheme="success">Success</Button>
      <Button colorScheme="error">Error</Button>
      <Button colorScheme="warning">Warning</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<Save className="h-4 w-4" />}>Save</Button>
      <Button rightIcon={<Download className="h-4 w-4" />}>Download</Button>
      <Button leftIcon={<Trash2 className="h-4 w-4" />} colorScheme="error">
        Delete
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button isLoading>Loading</Button>
      <Button isLoading variant="outline">
        Loading
      </Button>
      <Button isLoading colorScheme="success">
        Saving...
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
      <Button disabled colorScheme="success">
        Disabled
      </Button>
    </div>
  ),
};

export const AllVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Solid Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid" colorScheme="brand">
            Brand
          </Button>
          <Button variant="solid" colorScheme="success">
            Success
          </Button>
          <Button variant="solid" colorScheme="error">
            Error
          </Button>
          <Button variant="solid" colorScheme="warning">
            Warning
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Outline Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" colorScheme="brand">
            Brand
          </Button>
          <Button variant="outline" colorScheme="success">
            Success
          </Button>
          <Button variant="outline" colorScheme="error">
            Error
          </Button>
          <Button variant="outline" colorScheme="warning">
            Warning
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Ghost Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="ghost">Default</Button>
          <Button variant="ghost" colorScheme="success">
            Success
          </Button>
          <Button variant="ghost" colorScheme="error">
            Error
          </Button>
        </div>
      </div>
    </div>
  ),
};

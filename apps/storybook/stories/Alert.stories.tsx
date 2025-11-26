import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '@vormir/react';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Visual variant of the alert',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    hideIcon: {
      control: 'boolean',
      description: 'Hide the default icon',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert message with some important information.
        </AlertDescription>
      </>
    ),
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is an informational message to keep you updated on the latest changes.
        </AlertDescription>
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully. You can now proceed to the next step.
        </AlertDescription>
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Please review your input carefully before submitting the form.
        </AlertDescription>
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: (
      <>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An error occurred while processing your request. Please try again later.
        </AlertDescription>
      </>
    ),
  },
};

export const Closable: Story = {
  args: {
    variant: 'info',
    closable: true,
    children: (
      <>
        <AlertTitle>Closable Alert</AlertTitle>
        <AlertDescription>
          Click the X button to dismiss this alert.
        </AlertDescription>
      </>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    hideIcon: true,
    children: (
      <>
        <AlertTitle>No Icon</AlertTitle>
        <AlertDescription>
          This alert doesn't display an icon.
        </AlertDescription>
      </>
    ),
  },
};

export const SimpleText: Story = {
  args: {
    variant: 'info',
    children: 'This is a simple alert with just text, no title.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an informational alert.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a success alert.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a warning alert.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is an error alert.</AlertDescription>
      </Alert>
    </div>
  ),
};

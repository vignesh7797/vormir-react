import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from '@vormir/react';
import { Button } from '@vormir/react';

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() =>
          addToast({
            title: 'Success!',
            description: 'Your changes have been saved.',
            variant: 'success',
          })
        }
      >
        Show Success Toast
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Error occurred',
            description: 'There was a problem with your request.',
            variant: 'error',
          })
        }
        variant="outline"
      >
        Show Error Toast
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Warning',
            description: 'Please review your changes carefully.',
            variant: 'warning',
          })
        }
        variant="ghost"
      >
        Show Warning Toast
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Information',
            description: 'This is some useful information.',
            variant: 'info',
          })
        }
        variant="outline"
      >
        Show Info Toast
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <ToastDemo />
    </ToastProvider>
  ),
};

export const TopRight: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastDemo />
    </ToastProvider>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <ToastDemo />
    </ToastProvider>
  ),
};

export const BottomLeft: Story = {
  render: () => (
    <ToastProvider position="bottom-left">
      <ToastDemo />
    </ToastProvider>
  ),
};

function SimpleToastDemo() {
  const { addToast } = useToast();

  return (
    <div className="flex gap-4">
      <Button onClick={() => addToast({ title: 'Simple toast!' })}>
        Simple Toast
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'No auto-dismiss',
            description: 'This toast will not dismiss automatically.',
            duration: Infinity,
          })
        }
        variant="outline"
      >
        Persistent Toast
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Quick toast',
            description: 'Dismisses in 2 seconds.',
            duration: 2000,
          })
        }
        variant="ghost"
      >
        Quick Toast (2s)
      </Button>
    </div>
  );
}

export const CustomDuration: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <SimpleToastDemo />
    </ToastProvider>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Button } from '@vormir/react';
import { useState } from 'react';

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a modal dialog. Click outside or press ESC to close.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm">
            Modal content goes here. You can add any content you want including forms,
            images, or other components.
          </p>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalDemo size="xl" />,
};

function ConfirmDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" colorScheme="error" onClick={() => setOpen(true)}>
        Delete Account
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} size="sm">
        <ModalHeader>
          <ModalTitle>Are you absolutely sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button colorScheme="error" onClick={() => setOpen(false)}>
            Delete Account
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export const ConfirmationDialog: Story = {
  render: () => <ConfirmDialog />,
};

function FormModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit Profile</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>
          <ModalTitle>Edit Profile</ModalTitle>
          <ModalDescription>
            Make changes to your profile here. Click save when you're done.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export const WithForm: Story = {
  render: () => <FormModal />,
};

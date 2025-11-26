import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, Label, Stack } from '@vormir/react';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'flushed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={4} className="w-96">
      <div>
        <Label>Default</Label>
        <Textarea placeholder="Default variant" />
      </div>
      <div>
        <Label>Filled</Label>
        <Textarea variant="filled" placeholder="Filled variant" />
      </div>
      <div>
        <Label>Flushed</Label>
        <Textarea variant="flushed" placeholder="Flushed variant" />
      </div>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={4} className="w-96">
      <div>
        <Label>Small</Label>
        <Textarea size="sm" placeholder="Small textarea" />
      </div>
      <div>
        <Label>Medium</Label>
        <Textarea size="md" placeholder="Medium textarea" />
      </div>
      <div>
        <Label>Large</Label>
        <Textarea size="lg" placeholder="Large textarea" />
      </div>
    </Stack>
  ),
};

export const Resize: Story = {
  render: () => (
    <Stack spacing={4} className="w-96">
      <div>
        <Label>No Resize</Label>
        <Textarea resize="none" placeholder="Cannot be resized" />
      </div>
      <div>
        <Label>Vertical (Default)</Label>
        <Textarea resize="vertical" placeholder="Can resize vertically" />
      </div>
      <div>
        <Label>Horizontal</Label>
        <Textarea resize="horizontal" placeholder="Can resize horizontally" />
      </div>
      <div>
        <Label>Both</Label>
        <Textarea resize="both" placeholder="Can resize in any direction" />
      </div>
    </Stack>
  ),
};

export const AutoResize: Story = {
  render: () => (
    <div className="w-96">
      <Label>Auto Resize</Label>
      <Textarea
        autoResize
        placeholder="Type here and watch the textarea grow automatically..."
        defaultValue="This textarea will automatically adjust its height based on the content."
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing={4} className="w-96">
      <div>
        <Label>Default</Label>
        <Textarea placeholder="Normal state" />
      </div>
      <div>
        <Label>Success</Label>
        <Textarea
          state="success"
          placeholder="Success state"
          defaultValue="Your message has been saved!"
        />
      </div>
      <div>
        <Label>Error</Label>
        <Textarea isInvalid placeholder="Error state" />
        <p className="mt-1 text-sm text-error">This field is required</p>
      </div>
      <div>
        <Label>Warning</Label>
        <Textarea state="warning" placeholder="Warning state" />
      </div>
    </Stack>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-96">
      <Label htmlFor="bio" isRequired>
        Bio
      </Label>
      <Textarea
        id="bio"
        placeholder="Tell us about yourself..."
        defaultValue="I'm a software developer who loves building user interfaces."
      />
      <p className="mt-1 text-sm text-muted-foreground">
        Write a few sentences about yourself.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <Label isDisabled>Disabled</Label>
      <Textarea disabled placeholder="This textarea is disabled" />
    </div>
  ),
};

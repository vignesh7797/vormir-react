import type { Meta, StoryObj } from '@storybook/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Label,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Stack,
} from '@vormir/react';

const meta = {
  title: 'Forms/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <FormControl>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-96">
      <FormControl isInvalid>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Enter username" />
        <FormErrorMessage>Username is required.</FormErrorMessage>
      </FormControl>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-96">
      <FormControl isRequired>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
        <FormHelperText>Must be at least 8 characters.</FormHelperText>
      </FormControl>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <FormControl isDisabled>
        <Label htmlFor="disabled">Disabled Field</Label>
        <Input id="disabled" placeholder="Cannot edit" />
        <FormHelperText>This field is disabled.</FormHelperText>
      </FormControl>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="w-96">
      <FormControl>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself..." />
        <FormHelperText>Write a few sentences about yourself.</FormHelperText>
      </FormControl>
    </div>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <div className="w-96">
      <FormControl isRequired>
        <Label htmlFor="country">Country</Label>
        <Select>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
          </SelectContent>
        </Select>
        <FormHelperText>Choose the country you reside in.</FormHelperText>
      </FormControl>
    </div>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <Stack spacing={6} className="w-96">
      <FormControl isRequired>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" />
        <FormHelperText>Your first and last name.</FormHelperText>
      </FormControl>

      <FormControl isRequired isInvalid>
        <Label htmlFor="form-email">Email</Label>
        <Input id="form-email" type="email" placeholder="john@example.com" />
        <FormErrorMessage>Email is required.</FormErrorMessage>
      </FormControl>

      <FormControl>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
        <FormHelperText>Optional. Include country code.</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Your message here..." />
        <FormHelperText>Tell us how we can help you.</FormHelperText>
      </FormControl>
    </Stack>
  ),
};

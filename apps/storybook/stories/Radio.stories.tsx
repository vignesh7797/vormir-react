import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem, Label, Stack } from '@vormir/react';

const meta = {
  title: 'Forms/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={6}>
      <div>
        <p className="mb-3 font-semibold">Small</p>
        <RadioGroup defaultValue="sm1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sm1" id="sm1" size="sm" />
            <Label htmlFor="sm1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sm2" id="sm2" size="sm" />
            <Label htmlFor="sm2">Option 2</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <p className="mb-3 font-semibold">Medium (Default)</p>
        <RadioGroup defaultValue="md1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="md1" id="md1" size="md" />
            <Label htmlFor="md1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="md2" id="md2" size="md" />
            <Label htmlFor="md2">Option 2</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <p className="mb-3 font-semibold">Large</p>
        <RadioGroup defaultValue="lg1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lg1" id="lg1" size="lg" />
            <Label htmlFor="lg1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lg2" id="lg2" size="lg" />
            <Label htmlFor="lg2">Option 2</Label>
          </div>
        </RadioGroup>
      </div>
    </Stack>
  ),
};

export const Orientation: Story = {
  render: () => (
    <Stack spacing={6}>
      <div>
        <p className="mb-3 font-semibold">Vertical (Default)</p>
        <RadioGroup defaultValue="v1" orientation="vertical">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="v1" id="v1" />
            <Label htmlFor="v1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="v2" id="v2" />
            <Label htmlFor="v2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="v3" id="v3" />
            <Label htmlFor="v3">Option 3</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <p className="mb-3 font-semibold">Horizontal</p>
        <RadioGroup defaultValue="h1" orientation="horizontal">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="h1" id="h1" />
            <Label htmlFor="h1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="h2" id="h2" />
            <Label htmlFor="h2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="h3" id="h3" />
            <Label htmlFor="h3">Option 3</Label>
          </div>
        </RadioGroup>
      </div>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="d1" disabled />
        <Label htmlFor="d1" isDisabled>
          Disabled option
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="d2" />
        <Label htmlFor="d2">Enabled option</Label>
      </div>
    </RadioGroup>
  ),
};

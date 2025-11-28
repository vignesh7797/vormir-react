import type { Meta, StoryObj } from '@storybook/react';
import { LandingPage } from '../../../../examples/landing-page/LandingPage';

const meta = {
  title: 'Examples/Landing Page',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Landing Page Template

A complete marketing landing page showcasing:
- Responsive navigation with mobile menu
- Hero section with gradient text and CTAs
- Newsletter subscription form
- Features grid (6 feature cards)
- Pricing section (3 tier pricing cards)
- Testimonials with ratings
- Call-to-action section
- Footer with links

**Components Used:** Box, Container, Flex, Stack, Text, Button, Card, Input, Grid, Badge, Avatar

**Try different themes** to see how the landing page adapts!
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LandingPage />,
};

export const OceanTheme: Story = {
  render: () => <LandingPage />,
  parameters: {
    theme: 'ocean',
  },
};

export const ForestTheme: Story = {
  render: () => <LandingPage />,
  parameters: {
    theme: 'forest',
  },
};

export const SunsetTheme: Story = {
  render: () => <LandingPage />,
  parameters: {
    theme: 'sunset',
  },
};

export const MidnightTheme: Story = {
  render: () => <LandingPage />,
  parameters: {
    theme: 'midnight',
  },
};

export const CorporateTheme: Story = {
  render: () => <LandingPage />,
  parameters: {
    theme: 'corporate',
  },
};

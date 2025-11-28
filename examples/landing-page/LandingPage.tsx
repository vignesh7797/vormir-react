import { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Button,
  Card,
  Input,
  Grid,
  Badge,
  Avatar,
} from '../../packages/react/src';
import { Check, Star, ArrowRight, Menu, X } from 'lucide-react';

/**
 * Landing Page Template
 * 
 * A modern marketing landing page showcasing:
 * - Hero section with CTA
 * - Features grid
 * - Pricing cards
 * - Testimonials
 * - Footer
 * 
 * This example demonstrates how to build a complete
 * marketing website with Vormir components.
 */

const features = [
  {
    title: 'Lightning Fast',
    description: 'Built with performance in mind. All components are optimized for speed.',
  },
  {
    title: 'Fully Accessible',
    description: 'WCAG 2.1 compliant with keyboard navigation and screen reader support.',
  },
  {
    title: 'Dark Mode',
    description: 'Built-in dark mode support with seamless theme switching.',
  },
  {
    title: 'Customizable',
    description: 'Extensive theming system with CSS variables and Tailwind integration.',
  },
  {
    title: 'TypeScript',
    description: 'Full TypeScript support with comprehensive type definitions.',
  },
  {
    title: 'Tree Shakeable',
    description: 'Import only what you need. Optimized bundle sizes out of the box.',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for side projects and learning',
    features: [
      'All components',
      'Basic themes',
      'Community support',
      'MIT License',
    ],
    cta: 'Get Started',
    variant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For professional developers and teams',
    features: [
      'Everything in Starter',
      'Premium themes',
      'Priority support',
      'Advanced templates',
      'Early access to new features',
    ],
    cta: 'Start Free Trial',
    variant: 'solid' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom components',
      'SLA guarantees',
      'Training & consulting',
    ],
    cta: 'Contact Sales',
    variant: 'outline' as const,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Lead Developer',
    company: 'TechCorp',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Vormir has transformed how we build UIs. The components are intuitive and the theming system is incredibly flexible.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartupXYZ',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Best React component library we\'ve used. Great documentation and the TypeScript support is flawless.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Designer',
    company: 'DesignStudio',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'The accessibility features are top-notch. Finally a library that takes a11y seriously!',
    rating: 5,
  },
];

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <Box className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Navigation */}
      <Box
        as="nav"
        className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800"
      >
        <Container maxWidth="xl">
          <Flex className="h-16 items-center justify-between">
            {/* Logo */}
            <Flex className="items-center gap-2">
              <Box className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Text weight="bold" className="text-white">
                  V
                </Text>
              </Box>
              <Text size="xl" weight="bold">
                Vormir
              </Text>
            </Flex>

            {/* Desktop Nav */}
            <Flex className="hidden md:flex items-center gap-6">
              <Button variant="ghost" size="sm">
                Features
              </Button>
              <Button variant="ghost" size="sm">
                Pricing
              </Button>
              <Button variant="ghost" size="sm">
                Docs
              </Button>
              <Button variant="ghost" size="sm">
                GitHub
              </Button>
              <Button size="sm">Get Started</Button>
            </Flex>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </Flex>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <Box className="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-800">
              <Stack className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Features
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Pricing
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Docs
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  GitHub
                </Button>
                <Button className="w-full">Get Started</Button>
              </Stack>
            </Box>
          )}
        </Container>
      </Box>

      {/* Hero Section */}
      <Box className="py-20 md:py-32">
        <Container maxWidth="xl">
          <Box className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4">v1.0.0 Released 🎉</Badge>
            
            <Text
              as="h1"
              size="6xl"
              weight="extrabold"
              className="mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            >
              Build Beautiful UIs Faster
            </Text>
            
            <Text size="xl" color="muted" className="mb-8">
              A modern React component library with 47+ accessible components,
              multiple themes, and full TypeScript support.
            </Text>
            
            <Flex className="flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                View on GitHub
              </Button>
            </Flex>
            
            {/* Newsletter */}
            <Box className="max-w-md mx-auto">
              <Flex className="gap-2">
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button>Subscribe</Button>
              </Flex>
              <Text size="sm" color="muted" className="mt-2">
                Get notified about updates and new features
              </Text>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <Container maxWidth="xl">
          <Box className="text-center mb-16">
            <Text size="4xl" weight="bold" className="mb-4">
              Everything you need
            </Text>
            <Text size="lg" color="muted">
              Powerful features to build modern applications
            </Text>
          </Box>
          
          <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <Text size="xl" weight="semibold" className="mb-2">
                  {feature.title}
                </Text>
                <Text color="muted">{feature.description}</Text>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box className="py-20">
        <Container maxWidth="xl">
          <Box className="text-center mb-16">
            <Text size="4xl" weight="bold" className="mb-4">
              Simple, transparent pricing
            </Text>
            <Text size="lg" color="muted">
              Choose the plan that's right for you
            </Text>
          </Box>
          
          <Grid className="grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 relative ${
                  plan.popular ? 'border-primary border-2' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                
                <Box className="text-center mb-6">
                  <Text size="xl" weight="semibold" className="mb-2">
                    {plan.name}
                  </Text>
                  <Box className="mb-2">
                    <Text size="4xl" weight="bold" className="inline">
                      {plan.price}
                    </Text>
                    {plan.period && (
                      <Text size="lg" color="muted" className="inline">
                        {plan.period}
                      </Text>
                    )}
                  </Box>
                  <Text color="muted">{plan.description}</Text>
                </Box>
                
                <Button
                  variant={plan.variant}
                  className="w-full mb-6"
                >
                  {plan.cta}
                </Button>
                
                <Stack className="space-y-3">
                  {plan.features.map((feature) => (
                    <Flex key={feature} className="items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <Text size="sm">{feature}</Text>
                    </Flex>
                  ))}
                </Stack>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <Container maxWidth="xl">
          <Box className="text-center mb-16">
            <Text size="4xl" weight="bold" className="mb-4">
              Loved by developers
            </Text>
            <Text size="lg" color="muted">
              See what our users are saying
            </Text>
          </Box>
          
          <Grid className="grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <Flex className="items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </Flex>
                
                <Text className="mb-4">{testimonial.content}</Text>
                
                <Flex className="items-center gap-3">
                  <Avatar
                    src={testimonial.avatar}
                    fallback={testimonial.name[0]}
                    size="sm"
                  />
                  <Box>
                    <Text size="sm" weight="medium">
                      {testimonial.name}
                    </Text>
                    <Text size="sm" color="muted">
                      {testimonial.role} at {testimonial.company}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className="py-20">
        <Container maxWidth="xl">
          <Card className="p-12 text-center bg-gradient-to-r from-primary to-primary/80">
            <Text size="4xl" weight="bold" className="mb-4 text-white">
              Ready to get started?
            </Text>
            <Text size="lg" className="mb-8 text-white/90">
              Join thousands of developers building amazing applications
            </Text>
            <Flex className="flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="outline" className="bg-white">
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                View Documentation
              </Button>
            </Flex>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <Container maxWidth="xl">
          <Grid className="grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <Box>
              <Text weight="semibold" className="mb-4">
                Product
              </Text>
              <Stack className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Features
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Pricing
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Changelog
                </Button>
              </Stack>
            </Box>
            
            <Box>
              <Text weight="semibold" className="mb-4">
                Resources
              </Text>
              <Stack className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Documentation
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Examples
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  GitHub
                </Button>
              </Stack>
            </Box>
            
            <Box>
              <Text weight="semibold" className="mb-4">
                Company
              </Text>
              <Stack className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  About
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Blog
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Careers
                </Button>
              </Stack>
            </Box>
            
            <Box>
              <Text weight="semibold" className="mb-4">
                Legal
              </Text>
              <Stack className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Privacy
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  Terms
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  License
                </Button>
              </Stack>
            </Box>
          </Grid>
          
          <Box className="pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
            <Text size="sm" color="muted">
              © 2025 Vormir. All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;

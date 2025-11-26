import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage } from '@vormir/react';
import { Heart, Share2, MessageCircle } from 'lucide-react';

const meta = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-neutral-500">Card footer</p>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card variant="default" className="w-[300px]">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Default card variant</CardDescription>
        </CardHeader>
        <CardContent>Default styling with border</CardContent>
      </Card>

      <Card variant="elevated" className="w-[300px]">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Elevated card variant</CardDescription>
        </CardHeader>
        <CardContent>Has shadow for elevation effect</CardContent>
      </Card>

      <Card variant="outlined" className="w-[300px]">
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Outlined card variant</CardDescription>
        </CardHeader>
        <CardContent>Prominent border, no shadow</CardContent>
      </Card>

      <Card variant="ghost" className="w-[300px]">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
          <CardDescription>Ghost card variant</CardDescription>
        </CardHeader>
        <CardContent>No border or shadow</CardContent>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card variant="elevated" interactive className="w-[350px]">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover to see the effect</CardDescription>
      </CardHeader>
      <CardContent>
        This card has hover effects and can be clicked. Perfect for clickable cards.
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        alt="Mountain landscape"
        aspectRatio="video"
      />
      <CardHeader>
        <CardTitle>Beautiful Landscape</CardTitle>
        <CardDescription>Captured in the mountains</CardDescription>
      </CardHeader>
      <CardContent>
        Stunning mountain views from the peak. The journey was worth every step.
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="flex items-center gap-1 text-sm">
          <Heart className="h-4 w-4" />
          Like
        </button>
        <button className="flex items-center gap-1 text-sm">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="elevated" interactive className="w-[300px]">
      <CardImage
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
        alt="Headphones"
        aspectRatio="square"
      />
      <CardHeader>
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription>High-fidelity audio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">$299</span>
          <span className="text-sm text-neutral-500 line-through">$399</span>
        </div>
      </CardContent>
      <CardFooter>
        <button className="w-full bg-brand-500 text-white py-2 rounded-md hover:bg-brand-600">
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardImage
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
        alt="Person working on laptop"
        aspectRatio="video"
      />
      <CardHeader>
        <CardTitle>Getting Started with React</CardTitle>
        <CardDescription>March 15, 2024 • 5 min read</CardDescription>
      </CardHeader>
      <CardContent>
        Learn the fundamentals of React and start building modern web applications. This
        comprehensive guide covers everything you need to know.
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="Author"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm">John Doe</span>
        </div>
        <button className="flex items-center gap-1 text-sm text-neutral-600">
          <MessageCircle className="h-4 w-4" />
          12 Comments
        </button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

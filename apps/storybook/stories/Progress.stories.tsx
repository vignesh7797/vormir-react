import type { Meta, StoryObj } from '@storybook/react';
import { Progress, CircularProgress } from '@vormir/react';
import { useState, useEffect } from 'react';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Small: Story = {
  args: {
    value: 60,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    value: 75,
    size: 'lg',
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    value: 75,
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    value: 25,
    variant: 'error',
  },
};

export const WithValue: Story = {
  args: {
    value: 65,
    showValue: true,
  },
};

function AnimatedProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return <Progress value={progress} showValue />;
}

export const Animated: Story = {
  render: () => <AnimatedProgress />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm mb-2">Default</p>
        <Progress value={50} />
      </div>
      <div>
        <p className="text-sm mb-2">Success</p>
        <Progress value={100} variant="success" />
      </div>
      <div>
        <p className="text-sm mb-2">Warning</p>
        <Progress value={75} variant="warning" />
      </div>
      <div>
        <p className="text-sm mb-2">Error</p>
        <Progress value={25} variant="error" />
      </div>
    </div>
  ),
};

// Circular Progress stories
export const CircularDefault: Story = {
  render: () => <CircularProgress value={50} showValue />,
};

export const CircularSuccess: Story = {
  render: () => <CircularProgress value={100} variant="success" showValue />,
};

export const CircularLarge: Story = {
  render: () => <CircularProgress value={75} size={160} strokeWidth={12} showValue />,
};

function AnimatedCircular() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return <CircularProgress value={progress} showValue />;
}

export const CircularAnimated: Story = {
  render: () => <AnimatedCircular />,
};

export const AllCircularVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="text-center">
        <CircularProgress value={50} showValue />
        <p className="text-sm mt-2">Default</p>
      </div>
      <div className="text-center">
        <CircularProgress value={100} variant="success" showValue />
        <p className="text-sm mt-2">Success</p>
      </div>
      <div className="text-center">
        <CircularProgress value={75} variant="warning" showValue />
        <p className="text-sm mt-2">Warning</p>
      </div>
      <div className="text-center">
        <CircularProgress value={25} variant="error" showValue />
        <p className="text-sm mt-2">Error</p>
      </div>
    </div>
  ),
};

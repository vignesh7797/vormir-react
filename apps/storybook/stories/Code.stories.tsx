import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '@vormir/react';

const meta = {
  title: 'Data Display/Code',
  component: Code,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCode = `function hello(name: string) {
  return \`Hello, \${name}!\`;
}

const greeting = hello("World");
console.log(greeting);`;

export const Default: Story = {
  args: {
    children: sampleCode,
  },
};

export const WithLanguage: Story = {
  args: {
    children: sampleCode,
    language: 'TypeScript',
  },
};

export const WithLineNumbers: Story = {
  args: {
    children: sampleCode,
    language: 'TypeScript',
    showLineNumbers: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Code size="sm" language="JavaScript">
        {`const small = "Small size";`}
      </Code>
      <Code size="md" language="JavaScript">
        {`const medium = "Medium size";`}
      </Code>
      <Code size="lg" language="JavaScript">
        {`const large = "Large size";`}
      </Code>
    </div>
  ),
};

export const PrimaryVariant: Story = {
  args: {
    children: sampleCode,
    language: 'TypeScript',
    variant: 'primary',
  },
};

export const NoCopyButton: Story = {
  args: {
    children: sampleCode,
    language: 'TypeScript',
    showCopy: false,
  },
};

export const JavaScriptExample: Story = {
  args: {
    children: `// React Component
import React from 'react';

export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn-primary"
    >
      {children}
    </button>
  );
}`,
    language: 'JavaScript',
    showLineNumbers: true,
  },
};

export const PythonExample: Story = {
  args: {
    children: `# Python Function
def fibonacci(n):
    """Generate Fibonacci sequence"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate first 10 numbers
for i in range(10):
    print(fibonacci(i))`,
    language: 'Python',
    showLineNumbers: true,
  },
};

export const JSONExample: Story = {
  args: {
    children: `{
  "name": "@vormir/react",
  "version": "1.0.0",
  "description": "A modern React UI library",
  "dependencies": {
    "react": "^18.3.0",
    "tailwindcss": "^3.4.0"
  }
}`,
    language: 'JSON',
  },
};

export const ShellCommand: Story = {
  args: {
    children: `# Install package
npm install @vormir/react

# Start development server
npm run dev

# Build for production
npm run build`,
    language: 'Shell',
    showLineNumbers: true,
  },
};

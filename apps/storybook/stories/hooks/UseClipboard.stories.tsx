import type { Meta, StoryObj } from '@storybook/react';
import { useClipboard } from '@vormir/hooks';
import { Box, Text, Button, Input, Stack } from '@vormir/react';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const meta = {
  title: 'Hooks/Core Utility/useClipboard',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hook for copying text to clipboard with automatic feedback. Includes fallback for older browsers.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function UseClipboardDemo() {
  const clipboard = useClipboard(2000);
  const [customText, setCustomText] = useState('Hello, World!');
  
  const codeSnippet = `import { useClipboard } from '@vormir/hooks';

function MyComponent() {
  const { copy, copied } = useClipboard();
  
  return (
    <button onClick={() => copy('Text to copy')}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}`;

  return (
    <Stack spacing={6} className="w-[600px]">
      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Copy Buttons</Text>
        <Stack spacing={2}>
          <div className="flex gap-2">
            <Button 
              onClick={() => clipboard.copy('Simple text copied!')}
              size="sm"
              leftIcon={clipboard.copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            >
              {clipboard.copied ? 'Copied!' : 'Copy Text'}
            </Button>
            <Button 
              onClick={() => clipboard.copy('https://github.com/vormir/react')}
              size="sm"
              variant="outline"
            >
              Copy URL
            </Button>
            <Button 
              onClick={() => clipboard.copy('user@example.com')}
              size="sm"
              variant="ghost"
            >
              Copy Email
            </Button>
          </div>
          {clipboard.value && (
            <Box className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
              <Text className="text-sm font-medium">Last copied:</Text>
              <Text className="text-sm font-mono mt-1">{clipboard.value}</Text>
            </Box>
          )}
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <Text as="h3" size="xl" weight="semibold" className="mb-4">Custom Input</Text>
        <Stack spacing={2}>
          <Input 
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter text to copy..."
          />
          <Button 
            onClick={() => clipboard.copy(customText)}
            className="w-full"
          >
            {clipboard.copied ? '✓ Copied to Clipboard!' : 'Copy Input Text'}
          </Button>
        </Stack>
      </Box>

      <Box className="p-6 border rounded-lg bg-white dark:bg-neutral-900">
        <div className="flex items-center justify-between mb-3">
          <Text as="h3" size="xl" weight="semibold">Code Snippet</Text>
          <Button 
            onClick={() => clipboard.copy(codeSnippet)}
            size="sm"
            variant="outline"
          >
            {clipboard.copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
        <Box className="bg-neutral-900 dark:bg-neutral-950 p-4 rounded text-neutral-100 font-mono text-xs overflow-x-auto">
          <pre>{codeSnippet}</pre>
        </Box>
      </Box>

      <Box className="p-4 bg-brand-50 dark:bg-brand-900/20 rounded">
        <Text className="text-sm">
          <strong>Note:</strong> The copied state automatically resets after 2 seconds (configurable timeout).
        </Text>
      </Box>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <UseClipboardDemo />,
};

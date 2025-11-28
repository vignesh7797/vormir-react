import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  setTheme,
  setMode,
  getThemeConfig,
  type ThemeName,
  type ThemeMode,
} from '@vormir/react';
import { Button } from '@vormir/react';
import { Stack } from '@vormir/react';
import { Text } from '@vormir/react';
import { Box } from '@vormir/react';
import { Badge } from '@vormir/react';

const meta = {
  title: 'Theme/Theme Switcher',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    const config = getThemeConfig();
    return config.theme;
  });
  const [currentMode, setCurrentMode] = useState<ThemeMode>(() => {
    const config = getThemeConfig();
    return config.mode;
  });

  const themes: { value: ThemeName; label: string; desc: string; emoji: string }[] = [
    { value: 'ocean', label: 'Ocean', desc: 'Deep blue & warm amber', emoji: '🌊' },
    { value: 'forest', label: 'Forest', desc: 'Green & earth tones', emoji: '🌲' },
    { value: 'sunset', label: 'Sunset', desc: 'Orange & pink gradients', emoji: '🌅' },
    { value: 'midnight', label: 'Midnight', desc: 'Pure black OLED', emoji: '🌙' },
    { value: 'corporate', label: 'Corporate', desc: 'Professional grays', emoji: '💼' },
  ];

  const handleThemeChange = (theme: ThemeName) => {
    setTheme(theme);
    setCurrentTheme(theme);
  };

  const handleModeChange = (mode: ThemeMode) => {
    setMode(mode);
    setCurrentMode(mode);
  };

  return (
    <Stack spacing="xl">
      {/* Theme Selector */}
      <Box>
        <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
          Choose Theme
        </Text>
        <Stack spacing="md">
          {themes.map((theme) => (
            <Box
              key={theme.value}
              onClick={() => handleThemeChange(theme.value)}
              style={{
                padding: '1rem',
                border: '2px solid',
                borderColor:
                  currentTheme === theme.value
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--border))',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                backgroundColor:
                  currentTheme === theme.value
                    ? 'hsl(var(--accent) / 0.1)'
                    : 'hsl(var(--card))',
              }}
            >
              <Stack direction="row" align="center" spacing="md">
                <Text size="2xl">{theme.emoji}</Text>
                <Box style={{ flex: 1 }}>
                  <Text weight="semibold">{theme.label}</Text>
                  <Text size="sm" color="muted">
                    {theme.desc}
                  </Text>
                </Box>
                {currentTheme === theme.value && (
                  <Badge variant="success">Active</Badge>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Mode Selector */}
      <Box>
        <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
          Choose Mode
        </Text>
        <Stack direction="row" spacing="md">
          <Button
            variant={currentMode === 'light' ? 'primary' : 'outline'}
            onClick={() => handleModeChange('light')}
            style={{ flex: 1 }}
          >
            ☀️ Light
          </Button>
          <Button
            variant={currentMode === 'dark' ? 'primary' : 'outline'}
            onClick={() => handleModeChange('dark')}
            style={{ flex: 1 }}
          >
            🌙 Dark
          </Button>
          <Button
            variant={currentMode === 'system' ? 'primary' : 'outline'}
            onClick={() => handleModeChange('system')}
            style={{ flex: 1 }}
          >
            💻 System
          </Button>
        </Stack>
      </Box>

      {/* Color Preview */}
      <Box>
        <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
          Color Preview
        </Text>
        <Stack spacing="md">
          {/* Primary */}
          <Stack direction="row" spacing="sm" align="center">
            <Box
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'hsl(var(--primary))',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <Box>
              <Text weight="semibold">Primary</Text>
              <Text size="sm" color="muted">
                Main brand color
              </Text>
            </Box>
          </Stack>

          {/* Accent */}
          <Stack direction="row" spacing="sm" align="center">
            <Box
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'hsl(var(--accent))',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <Box>
              <Text weight="semibold">Accent</Text>
              <Text size="sm" color="muted">
                Highlights & CTAs
              </Text>
            </Box>
          </Stack>

          {/* Semantic Colors */}
          <Stack direction="row" spacing="sm">
            <Box
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'hsl(var(--success))',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <Box
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'hsl(var(--error))',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <Box
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'hsl(var(--warning))',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <Box
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'hsl(var(--info))',
                borderRadius: 'var(--radius-md)',
              }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Component Examples */}
      <Box>
        <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
          Component Examples
        </Text>
        <Stack spacing="md">
          <Stack direction="row" spacing="md">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </Stack>

          <Stack direction="row" spacing="md">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export const ThemeSwitcherDemo: Story = {
  render: () => <ThemeSwitcher />,
};

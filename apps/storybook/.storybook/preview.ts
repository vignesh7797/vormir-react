import type { Preview } from '@storybook/react';
import '../../../packages/react/src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'ocean', title: '🌊 Ocean', left: '🌊' },
          { value: 'forest', title: '🌲 Forest', left: '🌲' },
          { value: 'sunset', title: '🌅 Sunset', left: '🌅' },
          { value: 'midnight', title: '🌙 Midnight', left: '🌙' },
          { value: 'corporate', title: '💼 Corporate', left: '💼' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Light or Dark mode',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: '☀️ Light', left: '☀️' },
          { value: 'dark', title: '🌙 Dark', left: '🌙' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

// Decorator to apply theme and mode
preview.decorators = [
  (Story, context) => {
    const theme = context.globals.theme || 'ocean';
    const mode = context.globals.mode || 'light';
    
    // Apply theme and mode to document
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    return Story();
  },
];

export default preview;

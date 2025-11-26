import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  describe('Rendering', () => {
    it('renders as span by default', () => {
      render(<Text>Default Text</Text>);
      const text = screen.getByText('Default Text');
      expect(text.tagName).toBe('SPAN');
    });

    it('renders children correctly', () => {
      render(<Text>Test Content</Text>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Polymorphic as Prop', () => {
    it('renders as paragraph', () => {
      render(<Text as="p">Paragraph</Text>);
      const text = screen.getByText('Paragraph');
      expect(text.tagName).toBe('P');
    });

    it('renders as h1', () => {
      render(<Text as="h1">Heading 1</Text>);
      const text = screen.getByText('Heading 1');
      expect(text.tagName).toBe('H1');
    });

    it('renders as h2', () => {
      render(<Text as="h2">Heading 2</Text>);
      const text = screen.getByText('Heading 2');
      expect(text.tagName).toBe('H2');
    });

    it('renders as div', () => {
      render(<Text as="div">Div Text</Text>);
      const text = screen.getByText('Div Text');
      expect(text.tagName).toBe('DIV');
    });

    it('renders as label', () => {
      render(<Text as="label">Label Text</Text>);
      const text = screen.getByText('Label Text');
      expect(text.tagName).toBe('LABEL');
    });
  });

  describe('Sizes', () => {
    it('renders base size by default', () => {
      render(<Text>Base Size</Text>);
      const text = screen.getByText('Base Size');
      expect(text).toHaveClass('text-base');
    });

    it('renders xs size', () => {
      render(<Text size="xs">Extra Small</Text>);
      const text = screen.getByText('Extra Small');
      expect(text).toHaveClass('text-xs');
    });

    it('renders sm size', () => {
      render(<Text size="sm">Small</Text>);
      const text = screen.getByText('Small');
      expect(text).toHaveClass('text-sm');
    });

    it('renders lg size', () => {
      render(<Text size="lg">Large</Text>);
      const text = screen.getByText('Large');
      expect(text).toHaveClass('text-lg');
    });

    it('renders xl size', () => {
      render(<Text size="xl">Extra Large</Text>);
      const text = screen.getByText('Extra Large');
      expect(text).toHaveClass('text-xl');
    });

    it('renders 2xl size', () => {
      render(<Text size="2xl">2X Large</Text>);
      const text = screen.getByText('2X Large');
      expect(text).toHaveClass('text-2xl');
    });
  });

  describe('Weights', () => {
    it('renders normal weight by default', () => {
      render(<Text>Normal Weight</Text>);
      const text = screen.getByText('Normal Weight');
      expect(text).toHaveClass('font-normal');
    });

    it('renders thin weight', () => {
      render(<Text weight="thin">Thin</Text>);
      const text = screen.getByText('Thin');
      expect(text).toHaveClass('font-thin');
    });

    it('renders medium weight', () => {
      render(<Text weight="medium">Medium</Text>);
      const text = screen.getByText('Medium');
      expect(text).toHaveClass('font-medium');
    });

    it('renders semibold weight', () => {
      render(<Text weight="semibold">Semibold</Text>);
      const text = screen.getByText('Semibold');
      expect(text).toHaveClass('font-semibold');
    });

    it('renders bold weight', () => {
      render(<Text weight="bold">Bold</Text>);
      const text = screen.getByText('Bold');
      expect(text).toHaveClass('font-bold');
    });
  });

  describe('Alignment', () => {
    it('renders left aligned by default', () => {
      render(<Text>Left Aligned</Text>);
      const text = screen.getByText('Left Aligned');
      expect(text).not.toHaveClass('text-center', 'text-right', 'text-justify');
    });

    it('renders center aligned', () => {
      render(<Text align="center">Centered</Text>);
      const text = screen.getByText('Centered');
      expect(text).toHaveClass('text-center');
    });

    it('renders right aligned', () => {
      render(<Text align="right">Right Aligned</Text>);
      const text = screen.getByText('Right Aligned');
      expect(text).toHaveClass('text-right');
    });

    it('renders justified', () => {
      render(<Text align="justify">Justified</Text>);
      const text = screen.getByText('Justified');
      expect(text).toHaveClass('text-justify');
    });
  });

  describe('Colors', () => {
    it('renders default color', () => {
      render(<Text>Default Color</Text>);
      const text = screen.getByText('Default Color');
      expect(text).toHaveClass('text-foreground');
    });

    it('renders muted color', () => {
      render(<Text color="muted">Muted</Text>);
      const text = screen.getByText('Muted');
      expect(text).toHaveClass('text-muted-foreground');
    });

    it('renders primary color', () => {
      render(<Text color="primary">Primary</Text>);
      const text = screen.getByText('Primary');
      expect(text).toHaveClass('text-primary');
    });

    it('renders success color', () => {
      render(<Text color="success">Success</Text>);
      const text = screen.getByText('Success');
      expect(text).toHaveClass('text-success');
    });

    it('renders error color', () => {
      render(<Text color="error">Error</Text>);
      const text = screen.getByText('Error');
      expect(text).toHaveClass('text-error');
    });

    it('renders warning color', () => {
      render(<Text color="warning">Warning</Text>);
      const text = screen.getByText('Warning');
      expect(text).toHaveClass('text-warning');
    });
  });

  describe('Truncation', () => {
    it('does not truncate by default', () => {
      render(<Text>Full Text</Text>);
      const text = screen.getByText('Full Text');
      expect(text).not.toHaveClass('truncate');
    });

    it('applies truncation when enabled', () => {
      render(<Text truncate>Long Text That Should Be Truncated</Text>);
      const text = screen.getByText('Long Text That Should Be Truncated');
      expect(text).toHaveClass('truncate');
    });
  });

  describe('asChild Prop', () => {
    it('renders child element directly when asChild is true', () => {
      render(
        <Text asChild>
          <a href="/link">Link Text</a>
        </Text>
      );
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/link');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Text className="custom-text">Styled Text</Text>);
      expect(screen.getByText('Styled Text')).toHaveClass('custom-text');
    });

    it('forwards additional HTML props', () => {
      render(<Text data-testid="custom-text" id="text-id">Props Text</Text>);
      const text = screen.getByTestId('custom-text');
      expect(text).toBeInTheDocument();
      expect(text).toHaveAttribute('id', 'text-id');
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Text aria-label="Description">Text</Text>);
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });

    it('supports role attribute', () => {
      render(<Text role="status">Status Text</Text>);
      const text = screen.getByRole('status');
      expect(text).toBeInTheDocument();
    });
  });
});

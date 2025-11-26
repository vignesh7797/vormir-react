import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  describe('Rendering', () => {
    it('renders as div by default', () => {
      render(<Stack>Stack Content</Stack>);
      const stack = screen.getByText('Stack Content');
      expect(stack.tagName).toBe('DIV');
    });

    it('renders children correctly', () => {
      render(
        <Stack>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Stack>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });
  });

  describe('Direction', () => {
    it('renders vertical direction by default', () => {
      render(<Stack>Vertical Stack</Stack>);
      const stack = screen.getByText('Vertical Stack');
      expect(stack).toHaveClass('flex-col');
    });

    it('renders horizontal direction', () => {
      render(<Stack direction="horizontal">Horizontal Stack</Stack>);
      const stack = screen.getByText('Horizontal Stack');
      expect(stack).toHaveClass('flex-row');
    });
  });

  describe('Spacing', () => {
    it('renders with spacing 0', () => {
      render(<Stack spacing={0}>No Spacing</Stack>);
      const stack = screen.getByText('No Spacing');
      expect(stack).toHaveClass('gap-0');
    });

    it('renders with spacing 4', () => {
      render(<Stack spacing={4}>Spacing 4</Stack>);
      const stack = screen.getByText('Spacing 4');
      expect(stack).toHaveClass('gap-4');
    });

    it('renders with spacing 8', () => {
      render(<Stack spacing={8}>Spacing 8</Stack>);
      const stack = screen.getByText('Spacing 8');
      expect(stack).toHaveClass('gap-8');
    });
  });

  describe('Alignment', () => {
    it('renders with start alignment', () => {
      render(<Stack align="start">Start Aligned</Stack>);
      const stack = screen.getByText('Start Aligned');
      expect(stack).toHaveClass('items-start');
    });

    it('renders with center alignment', () => {
      render(<Stack align="center">Center Aligned</Stack>);
      const stack = screen.getByText('Center Aligned');
      expect(stack).toHaveClass('items-center');
    });

    it('renders with end alignment', () => {
      render(<Stack align="end">End Aligned</Stack>);
      const stack = screen.getByText('End Aligned');
      expect(stack).toHaveClass('items-end');
    });
  });

  describe('Justification', () => {
    it('renders with start justification', () => {
      render(<Stack justify="start">Start Justified</Stack>);
      const stack = screen.getByText('Start Justified');
      expect(stack).toHaveClass('justify-start');
    });

    it('renders with center justification', () => {
      render(<Stack justify="center">Center Justified</Stack>);
      const stack = screen.getByText('Center Justified');
      expect(stack).toHaveClass('justify-center');
    });

    it('renders with space-between justification', () => {
      render(<Stack justify="between">Space Between</Stack>);
      const stack = screen.getByText('Space Between');
      expect(stack).toHaveClass('justify-between');
    });
  });

  describe('Wrap', () => {
    it('does not wrap (Stack uses flexbox but no wrap variant)', () => {
      render(<Stack>No Wrap</Stack>);
      const stack = screen.getByText('No Wrap');
      expect(stack).toHaveClass('flex');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Stack className="custom-stack">Custom</Stack>);
      expect(screen.getByText('Custom')).toHaveClass('custom-stack');
    });

    it('forwards additional HTML props', () => {
      render(<Stack data-testid="test-stack" id="stack-id">Props</Stack>);
      const stack = screen.getByTestId('test-stack');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveAttribute('id', 'stack-id');
    });
  });

  describe('Accessibility', () => {
    it('supports role attribute', () => {
      render(<Stack role="list">List Stack</Stack>);
      const stack = screen.getByRole('list');
      expect(stack).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Stack aria-label="Navigation stack">Labeled Stack</Stack>);
      expect(screen.getByLabelText('Navigation stack')).toBeInTheDocument();
    });
  });
});

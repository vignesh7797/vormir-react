import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders badge content', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders as span by default', () => {
      const { container } = render(<Badge>Badge</Badge>);
      expect(container.firstChild?.nodeName).toBe('SPAN');
    });
  });

  describe('Variants', () => {
    it('renders default variant with neutral colorScheme', () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-neutral-100', 'text-neutral-700', 'border-neutral-200');
    });

    it('renders solid variant with brand colorScheme', () => {
      const { container } = render(<Badge variant="solid" colorScheme="brand">Solid</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-brand-600', 'text-white');
    });

    it('renders subtle variant with success colorScheme', () => {
      const { container } = render(<Badge variant="subtle" colorScheme="success">Subtle</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-success-100', 'text-success-800');
    });

    it('renders outline variant with error colorScheme', () => {
      const { container } = render(<Badge variant="outline" colorScheme="error">Outline</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-transparent', 'text-error-600', 'border-error-500');
    });

    it('renders different color schemes', () => {
      const { container, rerender } = render(<Badge colorScheme="warning">Warning</Badge>);
      expect(container.firstChild as HTMLElement).toHaveClass('bg-warning-50', 'text-warning-700');
      
      rerender(<Badge colorScheme="info">Info</Badge>);
      expect(container.firstChild as HTMLElement).toHaveClass('bg-info-50', 'text-info-700');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      const { container } = render(<Badge>Medium</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-2.5', 'py-0.5', 'text-sm');
    });

    it('renders small size', () => {
      const { container } = render(<Badge size="sm">Small</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders large size', () => {
      const { container } = render(<Badge size="lg">Large</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-3', 'py-1', 'text-base');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(<Badge className="custom-badge">Custom</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-badge');
      expect(badge).toHaveClass('inline-flex', 'items-center'); // Base classes from CVA
    });

    it('forwards additional props', () => {
      render(<Badge data-testid="test-badge">Props</Badge>);
      expect(screen.getByTestId('test-badge')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Badge aria-label="Status badge">Active</Badge>);
      expect(screen.getByLabelText('Status badge')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Badge ref={ref as any}>Ref test</Badge>);
      expect(ref.current).toBeTruthy();
    });
  });
});

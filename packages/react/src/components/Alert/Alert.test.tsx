import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('Rendering', () => {
    it('renders alert content', () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.getByText('Alert message')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      const { container } = render(<Alert>Alert</Alert>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(<Alert>Default</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-background', 'text-foreground', 'border');
    });

    it('renders info variant', () => {
      const { container } = render(<Alert variant="info">Info</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-info/10', 'text-info', 'border-info/20');
    });

    it('renders success variant', () => {
      const { container } = render(<Alert variant="success">Success</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-success/10', 'text-success', 'border-success/20');
    });

    it('renders warning variant', () => {
      const { container } = render(<Alert variant="warning">Warning</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-warning/10', 'text-warning', 'border-warning/20');
    });

    it('renders error variant', () => {
      const { container } = render(<Alert variant="error">Error</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-error/10', 'text-error', 'border-error/20');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(<Alert className="custom-alert">Custom</Alert>);
      expect(container.firstChild).toHaveClass('custom-alert');
    });

    it('forwards additional props', () => {
      render(<Alert data-testid="test-alert">Props</Alert>);
      expect(screen.getByTestId('test-alert')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports role attribute', () => {
      render(<Alert role="alert">Alert</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Alert aria-label="Important alert">Message</Alert>);
      const alert = screen.getByLabelText('Important alert');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Alert ref={ref as any}>Ref test</Alert>);
      expect(ref.current).toBeTruthy();
    });
  });
});

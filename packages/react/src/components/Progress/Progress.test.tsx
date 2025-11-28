import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders progress bar', () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<Progress value={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('renders with default min and max', () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('Value', () => {
    it('displays 0% progress', () => {
      render(<Progress value={0} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('displays 50% progress', () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });

    it('displays 100% progress', () => {
      render(<Progress value={100} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps value above max', () => {
      render(<Progress value={150} max={100} />);
      const progressbar = screen.getByRole('progressbar');
      const indicator = progressbar.querySelector('div > div');
      expect(indicator).toHaveStyle({ width: '100%' });
    });

    it('clamps value below min', () => {
      render(<Progress value={-10} />);
      const progressbar = screen.getByRole('progressbar');
      const indicator = progressbar.querySelector('div > div');
      expect(indicator).toHaveStyle({ width: '0%' });
    });
  });

  describe('Indeterminate State', () => {
    it('renders with 0 value when no value provided', () => {
      render(<Progress />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('shows 0% width when no value provided', () => {
      render(<Progress />);
      const progressbar = screen.getByRole('progressbar');
      const indicator = progressbar.querySelector('div > div');
      expect(indicator).toHaveStyle({ width: '0%' });
    });
  });

  describe('Custom Min/Max', () => {
    it('supports custom max value', () => {
      render(<Progress value={50} max={200} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemax', '200');
    });

    it('calculates percentage with custom max', () => {
      render(<Progress value={50} max={200} />);
      const progressbar = screen.getByRole('progressbar');
      const indicator = progressbar.querySelector('div > div');
      // 50/200 = 25% progress
      expect(indicator).toHaveStyle({ width: '25%' });
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('h-3');
    });

    it('renders small size', () => {
      render(<Progress value={50} size="sm" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('h-2');
    });

    it('renders large size', () => {
      render(<Progress value={50} size="lg" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('h-4');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(<Progress value={50} className="custom-progress" />);
      expect(container.firstChild).toHaveClass('custom-progress');
    });

    it('forwards additional props', () => {
      render(<Progress value={50} data-testid="test-progress" />);
      expect(screen.getByTestId('test-progress')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has progressbar role', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Progress value={50} aria-label="Upload progress" />);
      expect(screen.getByLabelText('Upload progress')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(<Progress value={60} max={100} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '60');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Progress value={50} ref={ref as any} />);
      expect(ref.current).toBeTruthy();
    });
  });
});

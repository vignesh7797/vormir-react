import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  describe('Rendering', () => {
    it('renders as label element by default', () => {
      render(<Label>Label Text</Label>);
      const label = screen.getByText('Label Text');
      expect(label.tagName).toBe('LABEL');
    });

    it('renders children correctly', () => {
      render(<Label>Field Label</Label>);
      expect(screen.getByText('Field Label')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Label>Medium Label</Label>);
      const label = screen.getByText('Medium Label');
      expect(label).toHaveClass('text-sm');
    });


  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Label isDisabled>Disabled</Label>);
      const label = screen.getByText('Disabled');
      expect(label).toHaveClass('opacity-70', 'cursor-not-allowed');
    });

    it('renders required indicator', () => {
      render(<Label isRequired>Required Field</Label>);
      const label = screen.getByText('Required Field');
      const asterisk = label.querySelector('.text-error');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk?.textContent).toBe('*');
    });
  });

  describe('Association with Input', () => {
    it('associates with input via htmlFor', () => {
      render(
        <>
          <Label htmlFor="email">Email</Label>
          <input id="email" type="email" />
        </>
      );
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', 'email');
    });

    it('wraps input when no htmlFor', () => {
      render(
        <Label>
          Username
          <input type="text" />
        </Label>
      );
      const label = screen.getByText('Username');
      const input = label.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Label className="custom-label">Custom</Label>);
      expect(screen.getByText('Custom')).toHaveClass('custom-label');
    });

    it('forwards additional HTML props', () => {
      render(<Label data-testid="test-label" id="label-id">Props</Label>);
      const label = screen.getByTestId('test-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('id', 'label-id');
    });
  });

  describe('Accessibility', () => {
    it('has implicit label role', () => {
      render(<Label htmlFor="test">Test Label</Label>);
      const label = screen.getByText('Test Label');
      expect(label.tagName).toBe('LABEL');
    });

    it('supports custom aria attributes', () => {
      render(<Label aria-label="Custom label">Text</Label>);
      const label = screen.getByText('Text');
      expect(label).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Label ref={ref as any}>Ref Label</Label>);
      expect(ref.current).toBeTruthy();
      expect((ref.current as any).tagName).toBe('LABEL');
    });
  });
});

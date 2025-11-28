import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormControl, useFormControl } from './FormControl';
import { Input } from '../Input';

// Helper component to test context
const TestConsumer = () => {
  const context = useFormControl();
  return <div data-testid="context">{JSON.stringify(context)}</div>;
};

describe('FormControl', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <FormControl>
          <label>Test Label</label>
          <Input />
        </FormControl>
      );
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies space-y-2 spacing by default', () => {
      const { container } = render(
        <FormControl>
          <Input />
        </FormControl>
      );
      const formControl = container.firstChild;
      expect(formControl).toHaveClass('space-y-2');
    });
  });

  describe('Context Provider', () => {
    it('provides isRequired state', () => {
      render(
        <FormControl isRequired>
          <TestConsumer />
        </FormControl>
      );
      const context = JSON.parse(screen.getByTestId('context').textContent || '{}');
      expect(context.isRequired).toBe(true);
    });

    it('provides isDisabled state', () => {
      render(
        <FormControl isDisabled>
          <TestConsumer />
        </FormControl>
      );
      const context = JSON.parse(screen.getByTestId('context').textContent || '{}');
      expect(context.isDisabled).toBe(true);
    });

    it('provides isInvalid state', () => {
      render(
        <FormControl isInvalid>
          <TestConsumer />
        </FormControl>
      );
      const context = JSON.parse(screen.getByTestId('context').textContent || '{}');
      expect(context.isInvalid).toBe(true);
    });

    it('provides isReadOnly state', () => {
      render(
        <FormControl isReadOnly>
          <TestConsumer />
        </FormControl>
      );
      const context = JSON.parse(screen.getByTestId('context').textContent || '{}');
      expect(context.isReadOnly).toBe(true);
    });

    it('provides id for form association', () => {
      render(
        <FormControl id="test-form-control">
          <TestConsumer />
        </FormControl>
      );
      const context = JSON.parse(screen.getByTestId('context').textContent || '{}');
      expect(context.id).toBe('test-form-control');
    });

    it('provides empty object when no props', () => {
      render(<TestConsumer />);
      const context = JSON.parse(screen.getByTestId('context').textContent || '{}');
      expect(context).toEqual({});
    });
  });

  describe('Multiple States', () => {
    it('provides multiple states simultaneously', () => {
      render(
        <FormControl isRequired isInvalid id="field">
          <TestConsumer />
        </FormControl>
      );
      const context = JSON.parse(screen.getByTestId('context').textContent || '{}');
      expect(context.isRequired).toBe(true);
      expect(context.isInvalid).toBe(true);
      expect(context.id).toBe('field');
    });

    it('handles all states together', () => {
      render(
        <FormControl isRequired isDisabled isInvalid isReadOnly id="all-states">
          <TestConsumer />
        </FormControl>
      );
      const context = JSON.parse(screen.getByTestId('context').textContent || '{}');
      expect(context.isRequired).toBe(true);
      expect(context.isDisabled).toBe(true);
      expect(context.isInvalid).toBe(true);
      expect(context.isReadOnly).toBe(true);
      expect(context.id).toBe('all-states');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <FormControl className="custom-form">
          <Input />
        </FormControl>
      );
      const formControl = container.firstChild;
      expect(formControl).toHaveClass('custom-form');
      expect(formControl).toHaveClass('space-y-2');
    });

    it('forwards additional HTML props', () => {
      render(
        <FormControl data-testid="test-form">
          <Input />
        </FormControl>
      );
      const formControl = screen.getByTestId('test-form');
      expect(formControl).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <FormControl ref={ref as any}>
          <Input />
        </FormControl>
      );
      expect(ref.current).toBeTruthy();
      expect((ref.current as any).tagName).toBe('DIV');
    });
  });
});

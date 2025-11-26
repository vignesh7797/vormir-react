import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormControl } from '../FormControl';
import { FormErrorMessage } from './FormErrorMessage';

describe('FormErrorMessage', () => {
  describe('Rendering', () => {
    it('renders error message when form is invalid', () => {
      render(
        <FormControl isInvalid>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('hides when form is not invalid', () => {
      render(
        <FormControl>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
      );
      expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    });

    it('applies correct classes', () => {
      render(
        <FormControl isInvalid>
          <FormErrorMessage>Error</FormErrorMessage>
        </FormControl>
      );
      const errorMessage = screen.getByText('Error').parentElement;
      expect(errorMessage).toHaveClass('flex', 'items-center', 'gap-1.5', 'text-sm', 'text-error');
    });

    it('renders as p element', () => {
      render(
        <FormControl isInvalid>
          <FormErrorMessage>Error</FormErrorMessage>
        </FormControl>
      );
      const errorMessage = screen.getByText('Error').parentElement;
      expect(errorMessage?.tagName).toBe('P');
    });
  });

  describe('Icon', () => {
    it('renders AlertCircle icon', () => {
      const { container } = render(
        <FormControl isInvalid>
          <FormErrorMessage>Error</FormErrorMessage>
        </FormControl>
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('h-4', 'w-4', 'shrink-0');
    });
  });

  describe('FormControl Integration', () => {
    it('shows only when isInvalid is true', () => {
      const { rerender } = render(
        <FormControl>
          <FormErrorMessage>Error message</FormErrorMessage>
        </FormControl>
      );
      expect(screen.queryByText('Error message')).not.toBeInTheDocument();

      rerender(
        <FormControl isInvalid>
          <FormErrorMessage>Error message</FormErrorMessage>
        </FormControl>
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('shows with other form states', () => {
      render(
        <FormControl isInvalid isRequired isDisabled>
          <FormErrorMessage>Error with multiple states</FormErrorMessage>
        </FormControl>
      );
      expect(screen.getByText('Error with multiple states')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(
        <FormControl isInvalid>
          <FormErrorMessage className="custom-error">Custom</FormErrorMessage>
        </FormControl>
      );
      const errorMessage = screen.getByText('Custom').parentElement;
      expect(errorMessage).toHaveClass('custom-error');
      expect(errorMessage).toHaveClass('text-error');
    });

    it('forwards additional HTML props', () => {
      render(
        <FormControl isInvalid>
          <FormErrorMessage data-testid="error-test" id="error-id">
            Props
          </FormErrorMessage>
        </FormControl>
      );
      const errorMessage = screen.getByTestId('error-test');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('id', 'error-id');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <FormControl isInvalid>
          <FormErrorMessage ref={ref as any}>Ref test</FormErrorMessage>
        </FormControl>
      );
      expect(ref.current).toBeTruthy();
      expect((ref.current as any).tagName).toBe('P');
    });
  });
});

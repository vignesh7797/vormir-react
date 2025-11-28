import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormControl } from '../FormControl';
import { FormHelperText } from './FormHelperText';

describe('FormHelperText', () => {
  describe('Rendering', () => {
    it('renders helper text', () => {
      render(<FormHelperText>Enter your email address</FormHelperText>);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('applies text-sm and text-muted-foreground classes', () => {
      render(<FormHelperText>Helper text</FormHelperText>);
      const helperText = screen.getByText('Helper text');
      expect(helperText).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('renders as p element', () => {
      render(<FormHelperText>Helper text</FormHelperText>);
      const helperText = screen.getByText('Helper text');
      expect(helperText.tagName).toBe('P');
    });
  });

  describe('FormControl Integration', () => {
    it('displays when form is not invalid', () => {
      render(
        <FormControl>
          <FormHelperText>This field is optional</FormHelperText>
        </FormControl>
      );
      expect(screen.getByText('This field is optional')).toBeInTheDocument();
    });

    it('hides when form is invalid', () => {
      render(
        <FormControl isInvalid>
          <FormHelperText>This field is optional</FormHelperText>
        </FormControl>
      );
      expect(screen.queryByText('This field is optional')).not.toBeInTheDocument();
    });

    it('displays when form is required but not invalid', () => {
      render(
        <FormControl isRequired>
          <FormHelperText>Required field helper</FormHelperText>
        </FormControl>
      );
      expect(screen.getByText('Required field helper')).toBeInTheDocument();
    });

    it('displays when form is disabled but not invalid', () => {
      render(
        <FormControl isDisabled>
          <FormHelperText>Disabled field helper</FormHelperText>
        </FormControl>
      );
      expect(screen.getByText('Disabled field helper')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<FormHelperText className="custom-helper">Custom</FormHelperText>);
      const helperText = screen.getByText('Custom');
      expect(helperText).toHaveClass('custom-helper');
      expect(helperText).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('forwards additional HTML props', () => {
      render(
        <FormHelperText data-testid="helper-test" id="helper-id">
          Props
        </FormHelperText>
      );
      const helperText = screen.getByTestId('helper-test');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveAttribute('id', 'helper-id');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<FormHelperText ref={ref as any}>Ref test</FormHelperText>);
      expect(ref.current).toBeTruthy();
      expect((ref.current as any).tagName).toBe('P');
    });
  });
});

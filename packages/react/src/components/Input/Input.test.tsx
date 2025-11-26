import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with default value', () => {
      render(<Input defaultValue="Default text" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Default text');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-input');
    });

    it('renders filled variant', () => {
      render(<Input variant="filled" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('bg-muted', 'border-transparent');
    });

    it('renders flushed variant', () => {
      render(<Input variant="flushed" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-b-2', 'rounded-none');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-10', 'px-3', 'text-sm');
    });

    it('renders small size', () => {
      render(<Input size="sm" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-8', 'px-3', 'py-1');
    });

    it('renders large size', () => {
      render(<Input size="lg" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-12', 'px-4', 'py-3');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });

    it('renders readonly state', () => {
      render(<Input readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('renders required state', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('renders invalid state', () => {
      render(<Input isInvalid />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-error');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Input Types', () => {
    it('renders text type by default', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('renders email type', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders password type', () => {
      render(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('renders number type', () => {
      render(<Input type="number" />);
      const input = document.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('handles onChange event', async () => {
      const user = userEvent.setup();
      let value = '';
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        value = e.target.value;
      };

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      await user.type(input, 'Hello');
      expect(value).toBe('Hello');
    });

    it('handles onFocus event', async () => {
      const user = userEvent.setup();
      let focused = false;
      const handleFocus = () => { focused = true; };

      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      expect(focused).toBe(true);
    });

    it('handles onBlur event', async () => {
      const user = userEvent.setup();
      let blurred = false;
      const handleBlur = () => { blurred = true; };

      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      await user.tab();
      expect(blurred).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Input aria-label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Input aria-describedby="helper" />
          <span id="helper">Enter your email</span>
        </>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'helper');
    });

    it('has correct aria-invalid when invalid', () => {
      render(<Input isInvalid />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Input className="custom-input" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-input');
    });

    it('forwards additional props', () => {
      render(<Input data-testid="custom-input" />);
      expect(screen.getByTestId('custom-input')).toBeInTheDocument();
    });

    it('supports maxLength', () => {
      render(<Input maxLength={10} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
    });

    it('supports pattern', () => {
      render(<Input pattern="[0-9]*" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[0-9]*');
    });
  });
});

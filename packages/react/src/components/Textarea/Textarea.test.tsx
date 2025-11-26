import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders textarea element', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('renders with placeholder', () => {
      render(<Textarea placeholder="Enter description" />);
      expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
    });

    it('renders with default value', () => {
      render(<Textarea defaultValue="Default text content" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('Default text content');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-input');
    });

    it('renders filled variant', () => {
      render(<Textarea variant="filled" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('bg-muted');
    });

    it('renders flushed variant', () => {
      render(<Textarea variant="flushed" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('rounded-none', 'border-b-2');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('min-h-[80px]', 'px-3', 'py-2');
    });

    it('renders small size', () => {
      render(<Textarea size="sm" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('min-h-[60px]', 'text-xs');
    });

    it('renders large size', () => {
      render(<Textarea size="lg" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('min-h-[100px]', 'text-base');
    });
  });

  describe('Resize', () => {
    it('allows vertical resize by default', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-y');
    });

    it('allows horizontal resize', () => {
      render(<Textarea resize="horizontal" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-x');
    });

    it('allows both resize', () => {
      render(<Textarea resize="both" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize');
    });

    it('disables resize', () => {
      render(<Textarea resize="none" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-none');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });

    it('renders readonly state', () => {
      render(<Textarea readOnly />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('readonly');
    });

    it('renders required state', () => {
      render(<Textarea required />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeRequired();
    });

    it('renders invalid state', () => {
      render(<Textarea isInvalid />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-error');
    });
  });

  describe('User Interactions', () => {
    it('handles onChange event', async () => {
      const user = userEvent.setup();
      let value = '';
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        value = e.target.value;
      };

      render(<Textarea onChange={handleChange} />);
      const textarea = screen.getByRole('textbox');
      
      await user.type(textarea, 'Hello World');
      expect(value).toBe('Hello World');
    });

    it('handles multiline input', async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      
      await user.type(textarea, 'Line 1{Enter}Line 2{Enter}Line 3');
      expect(textarea.value).toContain('Line 1\nLine 2\nLine 3');
    });

    it('handles onFocus event', async () => {
      const user = userEvent.setup();
      let focused = false;
      const handleFocus = () => { focused = true; };

      render(<Textarea onFocus={handleFocus} />);
      const textarea = screen.getByRole('textbox');
      
      await user.click(textarea);
      expect(focused).toBe(true);
    });

    it('handles onBlur event', async () => {
      const user = userEvent.setup();
      let blurred = false;
      const handleBlur = () => { blurred = true; };

      render(<Textarea onBlur={handleBlur} />);
      const textarea = screen.getByRole('textbox');
      
      await user.click(textarea);
      await user.tab();
      expect(blurred).toBe(true);
    });
  });

  describe('Rows and Cols', () => {
    it('supports rows attribute', () => {
      render(<Textarea rows={5} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('supports cols attribute', () => {
      render(<Textarea cols={50} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('cols', '50');
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Textarea aria-label="Comment" />);
      expect(screen.getByLabelText('Comment')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Textarea aria-describedby="helper" />
          <span id="helper">Enter your comment</span>
        </>
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'helper');
    });

    it('applies error styles when invalid', () => {
      render(<Textarea isInvalid />);
      expect(screen.getByRole('textbox')).toHaveClass('border-error');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Textarea className="custom-textarea" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-textarea');
    });

    it('forwards additional props', () => {
      render(<Textarea data-testid="custom-textarea" />);
      expect(screen.getByTestId('custom-textarea')).toBeInTheDocument();
    });

    it('supports maxLength', () => {
      render(<Textarea maxLength={100} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '100');
    });

    it('supports name attribute', () => {
      render(<Textarea name="description" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'description');
    });
  });
});

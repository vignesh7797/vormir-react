import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders checkbox input', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders standalone checkbox', () => {
      render(<Checkbox aria-label="Accept terms" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      // Checkbox doesn't render children as labels - use separate Label component
    });

    it('renders without label', () => {
      render(<Checkbox aria-label="Checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.queryByText(/accept/i)).not.toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });

    it('renders checked when defaultChecked is true', () => {
      render(<Checkbox defaultChecked />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('renders controlled checked state', () => {
      const { rerender } = render(<Checkbox checked={false} onCheckedChange={() => {}} />);
      let checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      rerender(<Checkbox checked={true} onCheckedChange={() => {}} />);
      checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-5', 'w-5');
    });

    it('renders small size', () => {
      render(<Checkbox size="sm" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-4', 'w-4');
    });

    it('renders large size', () => {
      render(<Checkbox size="lg" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-6', 'w-6');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
      expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });

    it('supports aria-required', () => {
      render(<Checkbox aria-required="true" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-required', 'true');
    });

    it('supports aria-invalid', () => {
      render(<Checkbox aria-invalid="true" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('User Interactions', () => {
    it('toggles checked state on click', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveAttribute('aria-checked', 'false');
      await user.click(checkbox);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
      await user.click(checkbox);
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onCheckedChange handler', async () => {
      const user = userEvent.setup();
      let checked: boolean | 'indeterminate' = false;
      const handleChange = (newChecked: boolean | 'indeterminate') => {
        checked = newChecked;
      };

      render(<Checkbox onCheckedChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(checked).toBe(true);
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      let checked: boolean | 'indeterminate' = false;
      const handleChange = (newChecked: boolean | 'indeterminate') => {
        checked = newChecked;
      };

      render(<Checkbox disabled onCheckedChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveAttribute('aria-checked', 'false');
      await user.click(checkbox);
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
      expect(checked).toBe(false);
    });

    it('supports keyboard focus', async () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Checkbox aria-label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Checkbox aria-describedby="helper" />
          <span id="helper">Check to agree</span>
        </>
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'helper');
    });

    it('has aria-checked attribute based on state', () => {
      render(<Checkbox />);
      let checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('has aria-checked true when defaultChecked', () => {
      render(<Checkbox defaultChecked />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('has aria-invalid when specified', () => {
      render(<Checkbox aria-invalid="true" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Checkbox className="custom-checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveClass('custom-checkbox');
    });

    it('forwards additional props', () => {
      render(<Checkbox data-testid="custom-checkbox" />);
      expect(screen.getByTestId('custom-checkbox')).toBeInTheDocument();
    });

    it('supports name attribute', () => {
      render(<Checkbox name="terms" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'terms');
    });

    it('supports value attribute', () => {
      render(<Checkbox value="accepted" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'accepted');
    });
  });
});

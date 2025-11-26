import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders switch button', () => {
      render(<Switch />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<Switch aria-label="Toggle setting" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('renders unchecked by default', () => {
      render(<Switch />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'false');
    });

    it('renders checked when defaultChecked is true', () => {
      render(<Switch defaultChecked />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
    });

    it('renders controlled checked state', () => {
      const { rerender } = render(<Switch checked={false} onCheckedChange={() => {}} />);
      let switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch checked={true} onCheckedChange={() => {}} />);
      switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Switch />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveClass('h-6', 'w-11');
    });

    it('renders small size', () => {
      render(<Switch size="sm" />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveClass('h-5', 'w-9');
    });

    it('renders large size', () => {
      render(<Switch size="lg" />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveClass('h-7', 'w-14');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Switch disabled />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toBeDisabled();
      expect(switchButton).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });

    it('renders checked state styles', () => {
      render(<Switch defaultChecked />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveClass('bg-primary');
    });

    it('renders unchecked state styles', () => {
      render(<Switch />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveClass('bg-input');
    });
  });

  describe('User Interactions', () => {
    it('toggles checked state on click', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchButton = screen.getByRole('switch');

      expect(switchButton).toHaveAttribute('aria-checked', 'false');
      await user.click(switchButton);
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
      await user.click(switchButton);
      expect(switchButton).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onCheckedChange handler', async () => {
      const user = userEvent.setup();
      let checked = false;
      const handleChange = (newChecked: boolean) => {
        checked = newChecked;
      };

      render(<Switch onCheckedChange={handleChange} />);
      const switchButton = screen.getByRole('switch');

      await user.click(switchButton);
      expect(checked).toBe(true);
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      let checked = false;
      const handleChange = (newChecked: boolean) => {
        checked = newChecked;
      };

      render(<Switch disabled onCheckedChange={handleChange} />);
      const switchButton = screen.getByRole('switch');

      await user.click(switchButton);
      expect(checked).toBe(false);
      expect(switchButton).toHaveAttribute('aria-checked', 'false');
    });

    it('supports keyboard navigation (Space key)', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchButton = screen.getByRole('switch');

      switchButton.focus();
      expect(switchButton).toHaveFocus();

      await user.keyboard('[Space]');
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Thumb Animation', () => {
    it('has unchecked data-state when unchecked', () => {
      render(<Switch />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('data-state', 'unchecked');
    });

    it('has checked data-state when checked', () => {
      render(<Switch defaultChecked />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('data-state', 'checked');
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Switch aria-label="Enable dark mode" />);
      expect(screen.getByLabelText('Enable dark mode')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Switch aria-describedby="helper" />
          <span id="helper">Toggle to enable</span>
        </>
      );
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('aria-describedby', 'helper');
    });

    it('has aria-checked attribute', () => {
      const { rerender } = render(<Switch />);
      let switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch checked={true} onCheckedChange={() => {}} />);
      switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Switch className="custom-switch" />);
      expect(screen.getByRole('switch')).toHaveClass('custom-switch');
    });

    it('forwards additional props', () => {
      render(<Switch data-testid="custom-switch" />);
      expect(screen.getByTestId('custom-switch')).toBeInTheDocument();
    });

    it('supports id attribute', () => {
      render(<Switch id="settings-switch" />);
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toHaveAttribute('id', 'settings-switch');
    });
  });
});

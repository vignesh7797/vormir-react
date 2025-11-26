import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RadioGroup, RadioGroupItem } from './Radio';

describe('RadioGroupItem', () => {
  describe('Rendering', () => {
    it('renders radio input', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" aria-label="Radio option" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('renders unchecked by default', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio') as HTMLInputElement;
      expect(radio).toHaveAttribute('data-state', 'unchecked');
    });

    it('renders checked when defaultValue matches', () => {
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio') as HTMLInputElement;
      expect(radio).toHaveAttribute('data-state', 'checked');
    });

    it('renders controlled checked state', () => {
      const { rerender } = render(
        <RadioGroup value="option2" onValueChange={() => {}}>
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
        </RadioGroup>
      );
      let radio1 = screen.getAllByRole('radio')[0];
      let radio2 = screen.getAllByRole('radio')[1];
      expect(radio1).toHaveAttribute('data-state', 'unchecked');
      expect(radio2).toHaveAttribute('data-state', 'checked');

      rerender(
        <RadioGroup value="option1" onValueChange={() => {}}>
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
        </RadioGroup>
      );
      radio1 = screen.getAllByRole('radio')[0];
      radio2 = screen.getAllByRole('radio')[1];
      expect(radio1).toHaveAttribute('data-state', 'checked');
      expect(radio2).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(
        <RadioGroup disabled>
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });
  });

  describe('User Interactions', () => {
    it('becomes checked on click', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');

      expect(radio).toHaveAttribute('data-state', 'unchecked');
      await user.click(radio);
      expect(radio).toHaveAttribute('data-state', 'checked');
    });

    it('calls onValueChange handler', async () => {
      const user = userEvent.setup();
      let changedValue = '';
      const handleChange = (value: string) => {
        changedValue = value;
      };

      render(
        <RadioGroup onValueChange={handleChange}>
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');

      await user.click(radio);
      expect(changedValue).toBe('option1');
    });

    it('does not change when disabled', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup disabled>
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');

      expect(radio).toHaveAttribute('data-state', 'unchecked');
      await user.click(radio);
      expect(radio).toHaveAttribute('data-state', 'unchecked');
    });

    it('supports keyboard focus', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      radio.focus();
      expect(radio).toHaveFocus();
    });
  });

  describe('Radio Groups', () => {
    it('only one radio in group is checked', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
          <RadioGroupItem value="option3" />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');
      
      await user.click(radios[0]!);
      expect(radios[0]).toHaveAttribute('data-state', 'checked');
      expect(radios[1]).toHaveAttribute('data-state', 'unchecked');
      expect(radios[2]).toHaveAttribute('data-state', 'unchecked');

      await user.click(radios[1]!);
      expect(radios[0]).toHaveAttribute('data-state', 'unchecked');
      expect(radios[1]).toHaveAttribute('data-state', 'checked');
      expect(radios[2]).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('supports aria-label on group', () => {
      render(
        <RadioGroup aria-label="Select option">
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Select option');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <RadioGroup aria-describedby="helper">
            <RadioGroupItem value="option1" />
          </RadioGroup>
          <span id="helper">Helper text</span>
        </>
      );
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-describedby', 'helper');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className on group', () => {
      render(
        <RadioGroup className="custom-radio">
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toHaveClass('custom-radio');
    });

    it('forwards additional props', () => {
      render(
        <RadioGroup data-testid="custom-radio">
          <RadioGroupItem value="option1" />
        </RadioGroup>
      );
      expect(screen.getByTestId('custom-radio')).toBeInTheDocument();
    });
  });
});

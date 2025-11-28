import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  describe('Rendering', () => {
    it('renders as div by default', () => {
      render(<Flex>Flex Content</Flex>);
      const flex = screen.getByText('Flex Content');
      expect(flex.tagName).toBe('DIV');
    });

    it('renders children correctly', () => {
      render(
        <Flex>
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  describe('Direction', () => {
    it('renders row direction by default', () => {
      render(<Flex>Row Flex</Flex>);
      const flex = screen.getByText('Row Flex');
      expect(flex).toHaveClass('flex-row');
    });

    it('renders column direction', () => {
      render(<Flex direction="col">Column Flex</Flex>);
      const flex = screen.getByText('Column Flex');
      expect(flex).toHaveClass('flex-col');
    });

    it('renders row-reverse direction', () => {
      render(<Flex direction="row-reverse">Row Reverse</Flex>);
      const flex = screen.getByText('Row Reverse');
      expect(flex).toHaveClass('flex-row-reverse');
    });

    it('renders column-reverse direction', () => {
      render(<Flex direction="col-reverse">Column Reverse</Flex>);
      const flex = screen.getByText('Column Reverse');
      expect(flex).toHaveClass('flex-col-reverse');
    });
  });

  describe('Wrap', () => {
    it('does not wrap by default', () => {
      render(<Flex>No Wrap</Flex>);
      const flex = screen.getByText('No Wrap');
      expect(flex).toHaveClass('flex-nowrap');
    });

    it('wraps when wrap is "wrap"', () => {
      render(<Flex wrap="wrap">Wrapped</Flex>);
      const flex = screen.getByText('Wrapped');
      expect(flex).toHaveClass('flex-wrap');
    });

    it('wraps in reverse', () => {
      render(<Flex wrap="wrap-reverse">Wrap Reverse</Flex>);
      const flex = screen.getByText('Wrap Reverse');
      expect(flex).toHaveClass('flex-wrap-reverse');
    });
  });

  describe('Alignment', () => {
    it('renders with start alignment', () => {
      render(<Flex align="start">Start</Flex>);
      const flex = screen.getByText('Start');
      expect(flex).toHaveClass('items-start');
    });

    it('renders with center alignment', () => {
      render(<Flex align="center">Center</Flex>);
      const flex = screen.getByText('Center');
      expect(flex).toHaveClass('items-center');
    });

    it('renders with end alignment', () => {
      render(<Flex align="end">End</Flex>);
      const flex = screen.getByText('End');
      expect(flex).toHaveClass('items-end');
    });

    it('renders with stretch alignment', () => {
      render(<Flex align="stretch">Stretch</Flex>);
      const flex = screen.getByText('Stretch');
      expect(flex).toHaveClass('items-stretch');
    });
  });

  describe('Justification', () => {
    it('renders with start justify', () => {
      render(<Flex justify="start">Start</Flex>);
      const flex = screen.getByText('Start');
      expect(flex).toHaveClass('justify-start');
    });

    it('renders with center justify', () => {
      render(<Flex justify="center">Center</Flex>);
      const flex = screen.getByText('Center');
      expect(flex).toHaveClass('justify-center');
    });

    it('renders with end justify', () => {
      render(<Flex justify="end">End</Flex>);
      const flex = screen.getByText('End');
      expect(flex).toHaveClass('justify-end');
    });

    it('renders with space-between justify', () => {
      render(<Flex justify="between">Between</Flex>);
      const flex = screen.getByText('Between');
      expect(flex).toHaveClass('justify-between');
    });

    it('renders with space-around justify', () => {
      render(<Flex justify="around">Around</Flex>);
      const flex = screen.getByText('Around');
      expect(flex).toHaveClass('justify-around');
    });
  });

  describe('Gap', () => {
    it('renders with gap 0', () => {
      render(<Flex gap={0}>No Gap</Flex>);
      const flex = screen.getByText('No Gap');
      expect(flex).toHaveClass('gap-0');
    });

    it('renders with gap 4', () => {
      render(<Flex gap={4}>Gap 4</Flex>);
      const flex = screen.getByText('Gap 4');
      expect(flex).toHaveClass('gap-4');
    });

    it('renders with gap 8', () => {
      render(<Flex gap={8}>Gap 8</Flex>);
      const flex = screen.getByText('Gap 8');
      expect(flex).toHaveClass('gap-8');
    });
  });

  describe('Polymorphic (Flex does not have as prop)', () => {
    it('always renders as div', () => {
      render(<Flex>Always Div</Flex>);
      const flex = screen.getByText('Always Div');
      expect(flex.tagName).toBe('DIV');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Flex className="custom-flex">Custom</Flex>);
      expect(screen.getByText('Custom')).toHaveClass('custom-flex');
    });

    it('forwards additional HTML props', () => {
      render(<Flex data-testid="test-flex" id="flex-id">Props</Flex>);
      const flex = screen.getByTestId('test-flex');
      expect(flex).toBeInTheDocument();
      expect(flex).toHaveAttribute('id', 'flex-id');
    });
  });

  describe('Accessibility', () => {
    it('supports role attribute', () => {
      render(<Flex role="navigation">Navigation</Flex>);
      const flex = screen.getByRole('navigation');
      expect(flex).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Flex aria-label="Main navigation">Nav</Flex>);
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });
  });
});

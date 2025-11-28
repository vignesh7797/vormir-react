import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  describe('Rendering', () => {
    it('renders as div by default', () => {
      render(<Container>Container Content</Container>);
      const container = screen.getByText('Container Content');
      expect(container.tagName).toBe('DIV');
    });

    it('renders children correctly', () => {
      render(<Container>Test Content</Container>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Max Width', () => {
    it('renders with sm max width', () => {
      render(<Container maxWidth="sm">Small</Container>);
      const container = screen.getByText('Small');
      expect(container).toHaveClass('max-w-screen-sm');
    });

    it('renders with md max width', () => {
      render(<Container maxWidth="md">Medium</Container>);
      const container = screen.getByText('Medium');
      expect(container).toHaveClass('max-w-screen-md');
    });

    it('renders with lg max width', () => {
      render(<Container maxWidth="lg">Large</Container>);
      const container = screen.getByText('Large');
      expect(container).toHaveClass('max-w-screen-lg');
    });

    it('renders with xl max width', () => {
      render(<Container maxWidth="xl">Extra Large</Container>);
      const container = screen.getByText('Extra Large');
      expect(container).toHaveClass('max-w-screen-xl');
    });

    it('renders with 2xl max width', () => {
      render(<Container maxWidth="2xl">2X Large</Container>);
      const container = screen.getByText('2X Large');
      expect(container).toHaveClass('max-w-screen-2xl');
    });
  });

  describe('Center Alignment', () => {
    it('centers horizontally by default (mx-auto)', () => {
      render(<Container>Centered</Container>);
      const container = screen.getByText('Centered');
      expect(container).toHaveClass('mx-auto');
    });

    it('centers content vertically when centerContent is true', () => {
      render(<Container centerContent>Fully Centered</Container>);
      const container = screen.getByText('Fully Centered');
      expect(container).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('Polymorphic (Container does not have as prop)', () => {
    it('always renders as div', () => {
      render(<Container>Always Div</Container>);
      const container = screen.getByText('Always Div');
      expect(container.tagName).toBe('DIV');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Container className="custom-container">Custom</Container>);
      expect(screen.getByText('Custom')).toHaveClass('custom-container');
    });

    it('forwards additional HTML props', () => {
      render(<Container data-testid="test-container" id="container-id">Props</Container>);
      const container = screen.getByTestId('test-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute('id', 'container-id');
    });
  });

  describe('Accessibility', () => {
    it('supports role attribute', () => {
      render(<Container role="main">Main Container</Container>);
      const container = screen.getByRole('main');
      expect(container).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Container aria-label="Page container">Content</Container>);
      expect(screen.getByLabelText('Page container')).toBeInTheDocument();
    });
  });
});

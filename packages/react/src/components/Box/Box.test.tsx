import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  describe('Rendering', () => {
    it('renders as div by default', () => {
      render(<Box>Content</Box>);
      const box = screen.getByText('Content');
      expect(box.tagName).toBe('DIV');
    });

    it('renders children correctly', () => {
      render(<Box>Test Content</Box>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Polymorphic as Prop', () => {
    it('renders as specified element', () => {
      render(<Box as="section">Section Content</Box>);
      const box = screen.getByText('Section Content');
      expect(box.tagName).toBe('SECTION');
    });

    it('renders as article', () => {
      render(<Box as="article">Article Content</Box>);
      const box = screen.getByText('Article Content');
      expect(box.tagName).toBe('ARTICLE');
    });

    it('renders as nav', () => {
      render(<Box as="nav">Navigation</Box>);
      const box = screen.getByText('Navigation');
      expect(box.tagName).toBe('NAV');
    });

    it('renders as aside', () => {
      render(<Box as="aside">Sidebar</Box>);
      const box = screen.getByText('Sidebar');
      expect(box.tagName).toBe('ASIDE');
    });

    it('renders as header', () => {
      render(<Box as="header">Header</Box>);
      const box = screen.getByText('Header');
      expect(box.tagName).toBe('HEADER');
    });

    it('renders as footer', () => {
      render(<Box as="footer">Footer</Box>);
      const box = screen.getByText('Footer');
      expect(box.tagName).toBe('FOOTER');
    });
  });

  describe('asChild Prop', () => {
    it('renders child element directly when asChild is true', () => {
      render(
        <Box asChild>
          <a href="/test">Link</a>
        </Box>
      );
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      expect(link.tagName).toBe('A');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Box className="custom-box">Styled Box</Box>);
      expect(screen.getByText('Styled Box')).toHaveClass('custom-box');
    });

    it('forwards additional HTML props', () => {
      render(<Box data-testid="custom-box" id="box-id">Props Box</Box>);
      const box = screen.getByTestId('custom-box');
      expect(box).toBeInTheDocument();
      expect(box).toHaveAttribute('id', 'box-id');
    });

    it('supports role attribute', () => {
      render(<Box role="region">Region Box</Box>);
      const box = screen.getByRole('region');
      expect(box).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Box ref={ref as any}>Ref Box</Box>);
      expect(ref.current).toBeTruthy();
      expect((ref.current as any).tagName).toBe('DIV');
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Box aria-label="Container">Labeled Box</Box>);
      expect(screen.getByLabelText('Container')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Box aria-describedby="description">Box</Box>
          <span id="description">Box description</span>
        </>
      );
      const box = screen.getByText('Box');
      expect(box).toHaveAttribute('aria-describedby', 'description');
    });

    it('supports aria-hidden', () => {
      render(<Box aria-hidden="true">Hidden Box</Box>);
      const box = screen.getByText('Hidden Box');
      expect(box).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

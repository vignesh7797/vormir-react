import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  describe('Rendering', () => {
    it('renders as div by default', () => {
      render(<Grid>Grid Content</Grid>);
      const grid = screen.getByText('Grid Content');
      expect(grid.tagName).toBe('DIV');
      expect(grid).toHaveClass('grid');
    });

    it('renders children correctly', () => {
      render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Grid>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
    });
  });

  describe('Columns', () => {
    it('renders with 1 column (cols prop)', () => {
      render(<Grid cols={1}>1 Column</Grid>);
      const grid = screen.getByText('1 Column');
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('renders with 3 columns', () => {
      render(<Grid cols={3}>3 Columns</Grid>);
      const grid = screen.getByText('3 Columns');
      expect(grid).toHaveClass('grid-cols-3');
    });

    it('renders with 12 columns', () => {
      render(<Grid cols={12}>12 Columns</Grid>);
      const grid = screen.getByText('12 Columns');
      expect(grid).toHaveClass('grid-cols-12');
    });
  });

  describe('Flow (Grid has flow not rows)', () => {
    it('renders with row flow by default', () => {
      render(<Grid>Row Flow</Grid>);
      const grid = screen.getByText('Row Flow');
      expect(grid).toHaveClass('grid-flow-row');
    });

    it('renders with col flow', () => {
      render(<Grid flow="col">Col Flow</Grid>);
      const grid = screen.getByText('Col Flow');
      expect(grid).toHaveClass('grid-flow-col');
    });
  });

  describe('Gap', () => {
    it('renders with gap 0', () => {
      render(<Grid gap={0}>No Gap</Grid>);
      const grid = screen.getByText('No Gap');
      expect(grid).toHaveClass('gap-0');
    });

    it('renders with gap 4', () => {
      render(<Grid gap={4}>Gap 4</Grid>);
      const grid = screen.getByText('Gap 4');
      expect(grid).toHaveClass('gap-4');
    });

    it('renders with gap 10', () => {
      render(<Grid gap={10}>Gap 10</Grid>);
      const grid = screen.getByText('Gap 10');
      expect(grid).toHaveClass('gap-10');
    });
  });

  describe('Alignment (Grid does not have alignItems prop)', () => {
    it('renders with grid layout', () => {
      render(<Grid>Grid Layout</Grid>);
      const grid = screen.getByText('Grid Layout');
      expect(grid).toHaveClass('grid');
    });
  });

  describe('Justification (Grid does not have justifyItems prop)', () => {
    it('uses grid layout', () => {
      render(<Grid>Grid</Grid>);
      const grid = screen.getByText('Grid');
      expect(grid).toHaveClass('grid');
    });
  });

  describe('Polymorphic (Grid does not have as prop)', () => {
    it('always renders as div', () => {
      render(<Grid>Always Div</Grid>);
      const grid = screen.getByText('Always Div');
      expect(grid.tagName).toBe('DIV');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Grid className="custom-grid">Custom</Grid>);
      expect(screen.getByText('Custom')).toHaveClass('custom-grid');
    });

    it('forwards additional HTML props', () => {
      render(<Grid data-testid="test-grid" id="grid-id">Props</Grid>);
      const grid = screen.getByTestId('test-grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveAttribute('id', 'grid-id');
    });
  });

  describe('Accessibility', () => {
    it('supports role attribute', () => {
      render(<Grid role="list">List Grid</Grid>);
      const grid = screen.getByRole('list');
      expect(grid).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Grid aria-label="Product grid">Products</Grid>);
      expect(screen.getByLabelText('Product grid')).toBeInTheDocument();
    });
  });
});

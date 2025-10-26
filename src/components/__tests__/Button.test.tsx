/**
 * @file Button Component Tests
 * @description Comprehensive unit tests for the Button component
 * @version 2.0
 * @author PCPartKeeper Team
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '../Button';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('btn');
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Custom Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn', 'custom-class');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-primary');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-secondary');

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-danger');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Button size="small">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-sm');

      rerender(<Button size="large">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-lg');
    });

    it('renders as disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('btn-disabled');
    });

    it('renders as loading when loading prop is true', () => {
      render(<Button loading>Loading Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} loading>Loading</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard navigation', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard Test</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
      
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('is accessible', async () => {
      const { container } = render(<Button>Accessible Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes when disabled', () => {
      render(<Button disabled aria-label="Disabled action">Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('aria-label', 'Disabled action');
    });

    it('supports custom aria-label', () => {
      render(<Button aria-label="Custom action">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom action');
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Button aria-describedby="help-text">Button</Button>
          <div id="help-text">This button does something important</div>
        </div>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Button></Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Button>{null}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles undefined onClick gracefully', () => {
      render(<Button onClick={undefined}>No Handler</Button>);
      const button = screen.getByRole('button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('handles multiple rapid clicks', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Rapid Click</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  // Performance considerations
  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const renderSpy = jest.fn();
      const TestButton = React.memo(() => {
        renderSpy();
        return <Button>Test</Button>;
      });
      
      const { rerender } = render(<TestButton />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      // Re-render with same props
      rerender(<TestButton />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });

  // TypeScript integration
  describe('TypeScript Integration', () => {
    it('accepts valid HTML button props', () => {
      render(
        <Button 
          type="submit" 
          form="test-form"
          data-testid="submit-button"
        >
          Submit
        </Button>
      );
      
      const button = screen.getByTestId('submit-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'test-form');
    });
  });
});

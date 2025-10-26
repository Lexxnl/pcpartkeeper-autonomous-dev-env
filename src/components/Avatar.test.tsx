import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Avatar from './Avatar';

expect.extend(toHaveNoViolations);

describe('Avatar', () => {
  // Basic rendering tests
  test('renders with default props', () => {
    render(<Avatar />);
    const avatar = screen.getByLabelText('User avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveStyle({ width: '40px', height: '40px' });
    expect(avatar).toHaveClass('rounded-full');
  });

  test('renders with image source', () => {
    render(<Avatar src='/test-image.jpg' alt='Test user' />);
    const image = screen.getByAltText('Test user');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  test('renders with initials', () => {
    render(<Avatar initials='JD' name='John Doe' />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  // Size variants (pixels)
  test('renders with custom size', () => {
    render(<Avatar size={32} name='Small' />);
    const avatar = screen.getByLabelText('Small avatar');
    expect(avatar).toHaveStyle({ width: '32px', height: '32px' });
  });

  test('renders with large size', () => {
    render(<Avatar size={64} name='Large' />);
    const avatar = screen.getByLabelText('Large avatar');
    expect(avatar).toHaveStyle({ width: '64px', height: '64px' });
  });

  // Shape variants
  test('renders circle shape (default)', () => {
    render(<Avatar name='Circle' />);
    const avatar = screen.getByLabelText('Circle avatar');
    expect(avatar).toHaveClass('rounded-full');
  });

  test('renders square shape', () => {
    render(<Avatar shape='square' name='Square' />);
    const avatar = screen.getByLabelText('Square avatar');
    expect(avatar).toHaveClass('rounded-none');
  });

  // Color variants
  test('renders default variant', () => {
    render(<Avatar variant='default' name='Default' />);
    const avatar = screen.getByLabelText('Default avatar');
    expect(avatar).toHaveClass('bg-surface-tertiary', 'text-text-secondary');
  });

  test('renders primary variant', () => {
    render(<Avatar variant='primary' name='Primary' />);
    const avatar = screen.getByLabelText('Primary avatar');
    expect(avatar).toHaveClass('bg-action-primary', 'text-white');
  });

  test('renders secondary variant', () => {
    render(<Avatar variant='secondary' name='Secondary' />);
    const avatar = screen.getByLabelText('Secondary avatar');
    expect(avatar).toHaveClass('bg-surface-secondary', 'text-text-primary');
  });

  test('renders accent variant', () => {
    render(<Avatar variant='accent' name='Accent' />);
    const avatar = screen.getByLabelText('Accent avatar');
    expect(avatar).toHaveClass('bg-accent-primary', 'text-white');
  });

  // Click handling
  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Avatar onClick={handleClick} name='User' />);
    const avatar = screen.getByRole('button');
    fireEvent.click(avatar);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has button role when clickable', () => {
    render(<Avatar onClick={() => {}} name='User' />);
    const avatar = screen.getByRole('button');
    expect(avatar).toBeInTheDocument();
  });

  test('has cursor pointer when clickable', () => {
    render(<Avatar onClick={() => {}} name='User' />);
    const avatar = screen.getByRole('button');
    expect(avatar).toHaveClass('cursor-pointer');
  });

  // Accessibility
  test('is accessible', async () => {
    const { container } = render(<Avatar name='John Doe' />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('has proper aria-label', () => {
    render(<Avatar name='John Doe' />);
    const avatar = screen.getByLabelText('John Doe avatar');
    expect(avatar).toBeInTheDocument();
  });

  test('uses custom aria-label when provided', () => {
    render(<Avatar name='John Doe' aria-label='Custom label' />);
    const avatar = screen.getByLabelText('Custom label');
    expect(avatar).toBeInTheDocument();
  });

  test('generates aria-label for initials', () => {
    render(<Avatar initials='JD' />);
    const avatar = screen.getByLabelText('Avatar with initials JD');
    expect(avatar).toBeInTheDocument();
  });

  test('falls back to generic aria-label', () => {
    render(<Avatar />);
    const avatar = screen.getByLabelText('User avatar');
    expect(avatar).toBeInTheDocument();
  });

  // Image error handling
  test('handles image load error gracefully', () => {
    render(<Avatar src='/invalid-image.jpg' initials='JD' name='John Doe' />);
    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();

    // Simulate image load error
    fireEvent.error(image);
    expect(image).toHaveStyle('display: none');
  });

  // Custom props
  test('accepts custom className', () => {
    render(<Avatar className='custom-class' name='User' />);
    const avatar = screen.getByLabelText('User avatar');
    expect(avatar).toHaveClass('custom-class');
  });

  test('accepts data-testid', () => {
    render(<Avatar data-testid='test-avatar' name='User' />);
    const avatar = screen.getByTestId('test-avatar');
    expect(avatar).toBeInTheDocument();
  });

  test('accepts custom role', () => {
    render(<Avatar role='img' name='User' />);
    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
  });

  // Content priority
  test('prioritizes image over initials', () => {
    render(<Avatar src='/test.jpg' initials='JD' name='User' />);
    expect(screen.getByAltText('User')).toBeInTheDocument();
    expect(screen.queryByText('JD')).not.toBeInTheDocument();
  });

  test('shows fallback when no content provided', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  // Initials formatting
  test('converts initials to uppercase', () => {
    render(<Avatar initials='jd' name='User' />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});

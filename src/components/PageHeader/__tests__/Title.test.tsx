import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Title } from '../index';

expect.extend(toHaveNoViolations);

describe('Title', () => {
  it('renders children correctly', () => {
    render(<Title>Test Title</Title>);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders as h2 by default', () => {
    render(<Title data-testid='title'>Test Title</Title>);

    expect(screen.getByTestId('title').tagName).toBe('H2');
  });

  it('renders as specified element', () => {
    render(
      <Title as='h1' data-testid='title'>
        Test Title
      </Title>
    );

    expect(screen.getByTestId('title').tagName).toBe('H1');
  });

  it('applies default classes correctly', () => {
    render(<Title data-testid='title'>Test Title</Title>);

    expect(screen.getByTestId('title')).toHaveClass(
      'font-semibold',
      'text-text-primary'
    );
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <Title variant='muted' data-testid='title'>
        Test Title
      </Title>
    );

    expect(screen.getByTestId('title')).toHaveClass('text-text-muted');

    rerender(
      <Title variant='transparent' data-testid='title'>
        Test Title
      </Title>
    );

    expect(screen.getByTestId('title')).toHaveClass('text-text-primary');
  });

  it('applies weight classes correctly', () => {
    const { rerender } = render(
      <Title weight='bold' data-testid='title'>
        Test Title
      </Title>
    );

    expect(screen.getByTestId('title')).toHaveClass('font-bold');

    rerender(
      <Title weight='normal' data-testid='title'>
        Test Title
      </Title>
    );

    expect(screen.getByTestId('title')).toHaveClass('font-normal');
  });

  it('handles hidden prop correctly', () => {
    const { container } = render(<Title hidden>Test Title</Title>);

    expect(container.firstChild).toBeNull();
  });

  it('applies custom className correctly', () => {
    render(
      <Title className='custom-class' data-testid='title'>
        Test Title
      </Title>
    );

    expect(screen.getByTestId('title')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Title ref={ref}>Test Title</Title>);

    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Title>Test Title</Title>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('spreads additional props correctly', () => {
    render(
      <Title data-testid='title' data-custom='test-value' id='custom-id'>
        Test Title
      </Title>
    );

    const title = screen.getByTestId('title');
    expect(title).toHaveAttribute('data-custom', 'test-value');
    expect(title).toHaveAttribute('id', 'custom-id');
  });

  it('renders with different HTML elements', () => {
    const { rerender } = render(
      <Title as='div' data-testid='title'>
        Test Title
      </Title>
    );

    expect(screen.getByTestId('title').tagName).toBe('DIV');

    rerender(
      <Title as='span' data-testid='title'>
        Test Title
      </Title>
    );

    expect(screen.getByTestId('title').tagName).toBe('SPAN');
  });
});

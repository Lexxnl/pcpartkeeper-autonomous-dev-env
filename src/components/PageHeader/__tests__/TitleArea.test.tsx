import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TitleArea } from '../index';

expect.extend(toHaveNoViolations);

describe('TitleArea', () => {
  it('renders children correctly', () => {
    render(
      <TitleArea>
        <h1>Test Title</h1>
      </TitleArea>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies default classes correctly', () => {
    render(
      <TitleArea data-testid='title-area'>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(screen.getByTestId('title-area')).toHaveClass(
      'flex',
      'items-center',
      'text-xl'
    );
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <TitleArea variant='subtitle' data-testid='title-area'>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(screen.getByTestId('title-area')).toHaveClass('text-lg');

    rerender(
      <TitleArea variant='large' data-testid='title-area'>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(screen.getByTestId('title-area')).toHaveClass('text-2xl');
  });

  it('applies alignment classes correctly', () => {
    const { rerender } = render(
      <TitleArea align='center' data-testid='title-area'>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(screen.getByTestId('title-area')).toHaveClass('justify-center');

    rerender(
      <TitleArea align='right' data-testid='title-area'>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(screen.getByTestId('title-area')).toHaveClass('justify-end');
  });

  it('applies spacing classes correctly', () => {
    const { rerender } = render(
      <TitleArea spacing='tight' data-testid='title-area'>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(screen.getByTestId('title-area')).toHaveClass('gap-1');

    rerender(
      <TitleArea spacing='loose' data-testid='title-area'>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(screen.getByTestId('title-area')).toHaveClass('gap-4');
  });

  it('handles hidden prop correctly', () => {
    const { container } = render(
      <TitleArea hidden>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(container.firstChild).toBeNull();
  });

  it('applies custom className correctly', () => {
    render(
      <TitleArea className='custom-class' data-testid='title-area'>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(screen.getByTestId('title-area')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TitleArea ref={ref}>
        <h1>Test</h1>
      </TitleArea>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <TitleArea>
        <h1>Test Title</h1>
      </TitleArea>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('spreads additional props correctly', () => {
    render(
      <TitleArea
        data-testid='title-area'
        data-custom='test-value'
        id='custom-id'
      >
        <h1>Test</h1>
      </TitleArea>
    );

    const titleArea = screen.getByTestId('title-area');
    expect(titleArea).toHaveAttribute('data-custom', 'test-value');
    expect(titleArea).toHaveAttribute('id', 'custom-id');
  });
});

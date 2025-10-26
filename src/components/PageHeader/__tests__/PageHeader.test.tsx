import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PageHeader from '../../PageHeader';

expect.extend(toHaveNoViolations);

describe('PageHeader', () => {
  it('renders children correctly', () => {
    render(
      <PageHeader>
        <div data-testid='content'>Test Content</div>
      </PageHeader>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('applies default classes correctly', () => {
    const { container } = render(
      <PageHeader data-testid='page-header'>
        <div>Test</div>
      </PageHeader>
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass(
      'w-full',
      'bg-surface-page',
      'border-b',
      'border-border-default'
    );
  });

  it('applies custom className correctly', () => {
    render(
      <PageHeader className='custom-class' data-testid='page-header'>
        <div>Test</div>
      </PageHeader>
    );

    expect(screen.getByTestId('page-header')).toHaveClass('custom-class');
  });

  it('handles variant prop correctly', () => {
    const { rerender } = render(
      <PageHeader variant='minimal' data-testid='page-header'>
        <div>Test</div>
      </PageHeader>
    );

    expect(screen.getByTestId('page-header')).toHaveClass('bg-transparent');

    rerender(
      <PageHeader variant='elevated' data-testid='page-header'>
        <div>Test</div>
      </PageHeader>
    );

    expect(screen.getByTestId('page-header')).toHaveClass(
      'bg-surface-page',
      'shadow-lg'
    );
  });

  it('handles hasBorder prop correctly', () => {
    const { rerender } = render(
      <PageHeader hasBorder={false} data-testid='page-header'>
        <div>Test</div>
      </PageHeader>
    );

    expect(screen.getByTestId('page-header')).not.toHaveClass('border-b');

    rerender(
      <PageHeader hasBorder={true} data-testid='page-header'>
        <div>Test</div>
      </PageHeader>
    );

    expect(screen.getByTestId('page-header')).toHaveClass(
      'border-b',
      'border-border-default'
    );
  });

  it('handles role prop correctly', () => {
    render(
      <PageHeader role='header' data-testid='page-header'>
        <div>Test</div>
      </PageHeader>
    );

    expect(screen.getByTestId('page-header')).toHaveAttribute('role', 'header');
  });

  it('handles aria-label correctly', () => {
    render(
      <PageHeader aria-label='Main page header' data-testid='page-header'>
        <div>Test</div>
      </PageHeader>
    );

    expect(screen.getByTestId('page-header')).toHaveAttribute(
      'aria-label',
      'Main page header'
    );
  });

  it('handles hidden prop correctly', () => {
    const { container } = render(
      <PageHeader hidden>
        <div>Test</div>
      </PageHeader>
    );

    expect(container.firstChild).toHaveClass('hidden');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <PageHeader ref={ref}>
        <div>Test</div>
      </PageHeader>
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <PageHeader aria-label='Test header'>
        <div>Test Content</div>
      </PageHeader>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('spreads additional props correctly', () => {
    render(
      <PageHeader
        data-testid='page-header'
        data-custom='test-value'
        id='custom-id'
      >
        <div>Test</div>
      </PageHeader>
    );

    const header = screen.getByTestId('page-header');
    expect(header).toHaveAttribute('data-custom', 'test-value');
    expect(header).toHaveAttribute('id', 'custom-id');
  });
});

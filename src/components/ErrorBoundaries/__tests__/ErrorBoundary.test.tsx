import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ErrorBoundary from '../ErrorBoundary';
import { useUIStore } from '../../../store';

const ErrorThrower = () => {
  throw new Error('Test error');
};

const NonErrorComponent = () => <div>No error</div>;

describe('ErrorBoundary', () => {
  test('catches errors and renders fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorThrower />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.queryByText('No error')).not.toBeInTheDocument();
  });

  test('does not render fallback when no error', () => {
    render(
      <ErrorBoundary>
        <NonErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  test('calls onError callback when error occurs', () => {
    const mockOnError = jest.fn();
    render(
      <ErrorBoundary onError={mockOnError}>
        <ErrorThrower />
      </ErrorBoundary>
    );

    expect(mockOnError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });
});

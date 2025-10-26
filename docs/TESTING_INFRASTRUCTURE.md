# Testing Infrastructure Documentation

## 🧪 Overview

PCPartKeeper uses a comprehensive testing setup with Jest, React Testing Library, and Jest Axe for accessibility testing. The testing infrastructure is designed for reliability, maintainability, and comprehensive coverage.

## 🏗️ Testing Stack

### Core Testing Tools

```typescript
// Test Runner & Framework
Jest 29.7.0                    // Test runner and assertion library
React Testing Library 13.4.0   // Component testing utilities
Jest Axe 8.0.0                // Accessibility testing

// Test Environment
Jest Environment JSDOM 29.7.0  // Browser environment simulation
@testing-library/jest-dom 6.9.1 // Custom Jest matchers

// Additional Testing Tools
@testing-library/user-event 14.6.1 // User interaction simulation
```

### Configuration Files

- **`jest.config.cjs`** - Jest configuration
- **`src/setupTests.ts`** - Test setup and global mocks
- **`babel.config.cjs`** - Babel configuration for testing

## ⚙️ Configuration

### Jest Configuration

```javascript
// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom', // Browser-like environment
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Path mapping
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Coverage collection
    '!src/**/*.d.ts', // Exclude type definitions
    '!src/**/*.stories.{js,jsx,ts,tsx}', // Exclude Storybook files
    '!src/**/*.test.{js,jsx,ts,tsx}', // Exclude test files
    '!src/setupTests.ts', // Exclude setup file
    '!src/main.jsx', // Exclude entry point
    '!src/vite-env.d.ts', // Exclude Vite types
  ],
  coverageThreshold: {
    global: {
      branches: 80, // 80% branch coverage
      functions: 80, // 80% function coverage
      lines: 80, // 80% line coverage
      statements: 80, // 80% statement coverage
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
  ],
};
```

### Test Setup

```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock performance.now
Object.defineProperty(performance, 'now', {
  value: jest.fn(() => Date.now()),
  writable: true,
});

// Mock console methods in test environment
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
```

## 🧩 Test Structure

### File Organization

```
src/
├── components/
│   ├── PageHeader/
│   │   ├── __tests__/
│   │   │   ├── PageHeader.test.tsx
│   │   │   ├── PageHeader.integration.test.tsx
│   │   │   ├── Title.test.tsx
│   │   │   └── TitleArea.test.tsx
│   │   └── components/
│   │       ├── Title/
│   │       │   └── __tests__/
│   │       │       ├── Title.test.tsx
│   │       │       └── TitleArea.test.tsx
│   │       └── ...
│   └── Button.test.jsx
├── pages/
│   ├── ItemsPage.test.jsx
│   └── TestingPage.test.jsx
└── setupTests.ts
```

### Test Naming Conventions

- **Unit Tests**: `ComponentName.test.tsx`
- **Integration Tests**: `ComponentName.integration.test.tsx`
- **Test Files**: Co-located with components in `__tests__/` folders

## 🎯 Testing Patterns

### Component Testing

```typescript
// Basic component test
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});

// Props testing
test('handles click events', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Variant testing
test('applies correct variant classes', () => {
  render(<Button variant="primary">Primary Button</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-primary');
});
```

### Accessibility Testing

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

test('button is accessible', async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// ARIA attributes testing
test('button has proper ARIA attributes', () => {
  render(<Button aria-label="Custom button">Button</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom button');
});
```

### Integration Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ItemsPage } from '../ItemsPage';

test('search filters items correctly', async () => {
  render(<ItemsPage />);

  const searchInput = screen.getByRole('searchbox');
  fireEvent.change(searchInput, { target: { value: 'CPU' } });

  await waitFor(() => {
    expect(screen.getByText('Intel Core i7-13700K')).toBeInTheDocument();
    expect(screen.queryByText('NVIDIA GeForce RTX 4070')).not.toBeInTheDocument();
  });
});

test('add item button triggers action', () => {
  render(<ItemsPage />);

  const addButton = screen.getByText('Add Item');
  fireEvent.click(addButton);

  // Verify add item functionality
  expect(console.log).toHaveBeenCalledWith('Add new item clicked');
});
```

### User Interaction Testing

```typescript
import userEvent from '@testing-library/user-event';

test('user can type in search input', async () => {
  const user = userEvent.setup();
  render(<SearchBar searchTerm="" onSearchChange={jest.fn()} />);

  const searchInput = screen.getByRole('searchbox');
  await user.type(searchInput, 'test search');

  expect(searchInput).toHaveValue('test search');
});

test('user can click button with keyboard', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  const button = screen.getByRole('button');
  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Mock Testing

```typescript
// Mock functions
const mockOnClick = jest.fn();
const mockOnSearch = jest.fn();

// Mock modules
jest.mock('../api/items', () => ({
  fetchItems: jest.fn(() => Promise.resolve(mockItems)),
  addItem: jest.fn(() => Promise.resolve(newItem)),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
```

## 🚀 Test Commands

### Available Scripts

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests in CI mode
npm run test:ci

# Run specific test file
npm test Button.test.jsx

# Run tests matching pattern
npm test -- --testNamePattern="renders button"

# Run tests with verbose output
npm test -- --verbose
```

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# Coverage thresholds (defined in jest.config.cjs)
# - Branches: 80%
# - Functions: 80%
# - Lines: 80%
# - Statements: 80%
```

## 📊 Test Coverage

### Current Coverage Status

- **Components**: High coverage for core components
- **Pages**: Good coverage for main pages
- **Utilities**: Comprehensive coverage for utility functions
- **Hooks**: Full coverage for custom hooks

### Coverage Collection

```typescript
// Files included in coverage
collectCoverageFrom: [
  'src/**/*.{js,jsx,ts,tsx}', // All source files
  '!src/**/*.d.ts', // Exclude type definitions
  '!src/**/*.stories.{js,jsx,ts,tsx}', // Exclude Storybook files
  '!src/**/*.test.{js,jsx,ts,tsx}', // Exclude test files
  '!src/setupTests.ts', // Exclude setup file
  '!src/main.jsx', // Exclude entry point
  '!src/vite-env.d.ts', // Exclude Vite types
];
```

## 🧪 Test Types

### Unit Tests

```typescript
// Test individual components in isolation
test('Button renders with correct variant', () => {
  render(<Button variant="primary">Test</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-primary');
});
```

### Integration Tests

```typescript
// Test component interactions
test('SearchBar and ItemsTable work together', () => {
  render(<ItemsPage />);

  const searchInput = screen.getByRole('searchbox');
  fireEvent.change(searchInput, { target: { value: 'CPU' } });

  expect(screen.getByText('Intel Core i7-13700K')).toBeInTheDocument();
});
```

### Accessibility Tests

```typescript
// Test WCAG compliance
test('component meets accessibility standards', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Visual Tests

```typescript
// Test component appearance
test('component renders with correct styling', () => {
  render(<Button variant="primary">Test</Button>);
  const button = screen.getByRole('button');

  expect(button).toHaveClass('btn-primary');
  expect(button).toHaveStyle('background-color: #238636');
});
```

## 🔧 Testing Utilities

### Custom Render Function

```typescript
// Custom render with providers
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';

function render(ui, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    ),
    ...options
  });
}

export * from '@testing-library/react';
export { render };
```

### Test Data Factories

```typescript
// Factory functions for test data
export const createMockItem = (overrides = {}) => ({
  id: 1,
  name: 'Test Item',
  category: 'CPU',
  price: 100,
  quantity: 1,
  dateAdded: '2024-01-01',
  ...overrides,
});

export const createMockItems = (count = 3) =>
  Array.from({ length: count }, (_, i) =>
    createMockItem({ id: i + 1, name: `Item ${i + 1}` })
  );
```

### Custom Matchers

```typescript
// Custom Jest matchers
expect.extend({
  toHaveSemanticColor(received, expected) {
    const hasClass = received.classList.contains(expected);
    return {
      message: () =>
        `Expected element to have semantic color class ${expected}`,
      pass: hasClass,
    };
  },
});

// Usage
expect(button).toHaveSemanticColor('btn-primary');
```

## 🎯 Best Practices

### 1. Test Organization

- **Co-locate tests** with components
- **Use descriptive test names** that explain what is being tested
- **Group related tests** using `describe` blocks
- **Keep tests focused** on single functionality

### 2. Test Data

- **Use factory functions** for creating test data
- **Mock external dependencies** to isolate components
- **Use realistic data** that matches production scenarios
- **Clean up test data** after each test

### 3. Assertions

- **Test behavior, not implementation** details
- **Use semantic queries** (getByRole, getByLabelText)
- **Test accessibility** with jest-axe
- **Verify user interactions** with user-event

### 4. Performance

- **Mock expensive operations** to keep tests fast
- **Use shallow rendering** when appropriate
- **Avoid testing third-party libraries** directly
- **Keep test files focused** and maintainable

## 🚨 Common Issues & Solutions

### Issue: Tests failing due to missing mocks

```typescript
// Solution: Add proper mocks in setupTests.ts
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

### Issue: Tests failing due to missing providers

```typescript
// Solution: Create custom render function with providers
function render(ui, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    ),
    ...options
  });
}
```

### Issue: Tests failing due to async operations

```typescript
// Solution: Use waitFor for async operations
test('async operation completes', async () => {
  render(<AsyncComponent />);

  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

## 📈 Continuous Integration

### GitHub Actions Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:ci
      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

### Coverage Reporting

- **Codecov** integration for coverage reports
- **Coverage thresholds** enforced in CI
- **Coverage badges** in README
- **Coverage comments** on pull requests

---

_This testing infrastructure documentation is automatically updated as the project evolves._

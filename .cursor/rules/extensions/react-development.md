# React Development Rules

## 🎯 React-Specific Development Guidelines

### Component Architecture

**Build maintainable, reusable React components**

**Protocol:**

1. **Functional Components** - Use functional components with hooks
2. **Component Composition** - Favor composition over inheritance
3. **Single Responsibility** - Each component has one clear purpose
4. **Props Interface** - Define clear prop types and interfaces
5. **State Management** - Use appropriate state management patterns

**Standards:**

```jsx
// ✅ Good: Clear component structure
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2, onAction }) => {
  // Hooks at the top
  const [state, setState] = useState(initialValue);

  // Event handlers
  const handleAction = () => {
    onAction(data);
  };

  // Render logic
  return <div className='component-class'>{/* JSX content */}</div>;
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onAction: PropTypes.func.isRequired,
};

export default ComponentName;
```

### State Management

**Manage state effectively and predictably**

**Protocol:**

1. **Local State** - Use useState for component-local state
2. **Lifted State** - Lift state up when shared between components
3. **Context API** - Use Context for deeply nested state sharing
4. **State Structure** - Keep state flat and normalized
5. **State Updates** - Use functional updates for state based on previous state

**Patterns:**

```jsx
// ✅ Good: Functional state updates
const [count, setCount] = useState(0);

const increment = () => {
  setCount(prevCount => prevCount + 1);
};

// ✅ Good: Complex state with useReducer
const initialState = { loading: false, data: null, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

### Effect Management

**Use useEffect appropriately and efficiently**

**Protocol:**

1. **Dependency Arrays** - Always include proper dependencies
2. **Cleanup Functions** - Clean up subscriptions and timers
3. **Effect Separation** - Separate concerns into different effects
4. **Conditional Effects** - Use conditions to prevent unnecessary effects
5. **Effect Testing** - Test effects thoroughly

**Patterns:**

```jsx
// ✅ Good: Proper effect with cleanup
useEffect(() => {
  const subscription = api.subscribe(onData);

  return () => {
    subscription.unsubscribe();
  };
}, [onData]);

// ✅ Good: Conditional effect
useEffect(() => {
  if (shouldFetch) {
    fetchData();
  }
}, [shouldFetch, fetchData]);
```

### Performance Optimization

**Optimize React performance effectively**

**Protocol:**

1. **React.memo** - Memoize components that receive stable props
2. **useMemo** - Memoize expensive calculations
3. **useCallback** - Memoize event handlers passed as props
4. **Code Splitting** - Use React.lazy for route-based splitting
5. **Bundle Analysis** - Monitor bundle size and optimize imports

**Patterns:**

```jsx
// ✅ Good: Memoized component
const ExpensiveComponent = React.memo(({ data, onAction }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveProcessing(item));
  }, [data]);

  const handleAction = useCallback(
    id => {
      onAction(id);
    },
    [onAction]
  );

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onAction={handleAction} />
      ))}
    </div>
  );
});

// ✅ Good: Code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

### Testing Standards

**Test React components comprehensively**

**Protocol:**

1. **Unit Tests** - Test individual components in isolation
2. **Integration Tests** - Test component interactions
3. **User Interaction Tests** - Test user interactions and events
4. **Accessibility Tests** - Test accessibility features
5. **Snapshot Tests** - Use sparingly for critical UI components

**Testing Patterns:**

```jsx
// ✅ Good: Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName prop1='test' onAction={jest.fn()} />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const mockAction = jest.fn();
    render(<ComponentName prop1='test' onAction={mockAction} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockAction).toHaveBeenCalledWith(expectedData);
  });
});
```

### Styling Guidelines

**Style React components consistently**

**Protocol:**

1. **CSS Modules** - Use CSS modules for component-specific styles
2. **Styled Components** - Use styled-components for dynamic styling
3. **Tailwind CSS** - Use utility classes for rapid development
4. **CSS-in-JS** - Use emotion or styled-components for complex styling
5. **Responsive Design** - Ensure mobile-first responsive design

**Tailwind Patterns:**

```jsx
// ✅ Good: Tailwind utility classes
const Button = ({ variant, size, children, ...props }) => {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Error Handling

**Handle errors gracefully in React applications**

**Protocol:**

1. **Error Boundaries** - Use error boundaries for component tree errors
2. **Try-Catch** - Use try-catch for async operations
3. **Error States** - Display meaningful error messages to users
4. **Logging** - Log errors for debugging and monitoring
5. **Recovery** - Provide ways for users to recover from errors

**Patterns:**

```jsx
// ✅ Good: Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// ✅ Good: Error handling in components
const DataComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getData();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={fetchData} />;
  if (!data) return <EmptyState onLoad={fetchData} />;

  return <DataDisplay data={data} />;
};
```

### Accessibility Standards

**Ensure React applications are accessible**

**Protocol:**

1. **Semantic HTML** - Use proper HTML elements
2. **ARIA Attributes** - Use ARIA attributes for complex interactions
3. **Keyboard Navigation** - Ensure keyboard accessibility
4. **Screen Reader Support** - Test with screen readers
5. **Color Contrast** - Ensure sufficient color contrast

**Patterns:**

```jsx
// ✅ Good: Accessible component
const AccessibleButton = ({ children, onClick, disabled, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className='button-class'
      {...props}
    >
      {children}
    </button>
  );
};

// ✅ Good: Accessible form
const AccessibleForm = () => {
  const [value, setValue] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='input-field'>Field Label</label>
      <input
        id='input-field'
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
        aria-describedby='field-help'
        required
      />
      <div id='field-help' className='help-text'>
        This field is required
      </div>
    </form>
  );
};
```

## 🎯 React Development Success Criteria

### Code Quality

- Components are functional and use hooks appropriately
- State management is clean and predictable
- Effects are properly managed with cleanup
- Performance optimizations are applied where needed
- Code is well-documented and readable

### Testing Coverage

- All components have unit tests
- User interactions are tested
- Error states are tested
- Accessibility features are tested
- Integration tests cover component interactions

### User Experience

- Components are responsive and mobile-friendly
- Loading states are handled gracefully
- Error states provide clear feedback
- Accessibility standards are met
- Performance is optimized for smooth interactions

---

**Remember: React development is about building maintainable, performant, and accessible user interfaces. Focus on component composition, proper state management, and user experience.**

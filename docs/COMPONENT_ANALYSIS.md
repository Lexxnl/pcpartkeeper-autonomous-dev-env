# Component Analysis for AI Agents

## 🎯 Component Classification

### Protected Components (DO NOT MODIFY)

These components are marked as "PRODUCTION READY" and should not be changed:

#### Button.jsx

```typescript
// Status: ✅ PRODUCTION READY - DO NOT MODIFY
// Features: 4 variants, 3 sizes, loading states, icon support, accessibility

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  variant?: 'primary' | 'default' | 'invisible' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  block?: boolean;
  hasArrow?: boolean;
  loading?: boolean;
  leadingVisual?: ReactNode;
  trailingVisual?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

// Key Features:
// - 4 variants with semantic styling (btn-primary, btn-default, btn-invisible, btn-danger)
// - 3 sizes with responsive behavior (small, medium, large)
// - Loading states with spinner animation
// - Icon support (leading and trailing visuals)
// - Full accessibility support (ARIA labels, keyboard navigation)
// - Protection notice prevents modification
```

#### SearchBar.jsx

```typescript
// Status: ✅ PRODUCTION READY - DO NOT MODIFY
// Features: Real-time search, keyboard shortcuts, accessibility

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch?: (term: string) => void;
}

// Key Features:
// - Real-time search with input change handling
// - Keyboard shortcuts (Enter to search)
// - Accessible search interface (role="searchbox")
// - Placeholder text for user guidance
// - Search button integration
// - Protection notice prevents modification
```

### Layout Components

#### App.jsx

```typescript
// Status: ✅ Main application container
// Features: Page routing, header layout, responsive design

// Current Implementation:
const [currentPage, setCurrentPage] = useState('items');

// Page Structure:
// - PageHeader with logo, search, and navigation
// - Page content based on currentPage state
// - Responsive layout with mobile-first design

// Key Features:
// - Simple state-based routing
// - Responsive header layout
// - Search bar integration
// - Navigation with UnderlineNav
// - Dark theme styling
```

#### ItemsPage.jsx

```typescript
// Status: ✅ Primary inventory management page
// Features: Item display, search, add functionality

// State Management:
const [items, setItems] = useState(mockItems);
const [searchTerm, setSearchTerm] = useState('');

// Key Features:
// - Item list display with ItemsTable
// - Search functionality with SearchBar
// - Add item button with AddItemButton
// - Responsive layout with proper spacing
// - Empty state handling
// - Mock data integration
```

#### TestingPage.jsx

```typescript
// Status: ✅ Component showcase and testing interface
// Features: All component variants, interactive examples, code snippets

// Key Features:
// - Comprehensive component showcase
// - Interactive examples with click tracking
// - Code snippets for each component
// - Visual testing interface
// - Performance monitoring
// - All button variants and states
// - PageHeader demonstrations
// - UnderlineNav examples
```

### Data Display Components

#### ItemsTable.jsx

```typescript
// Status: ✅ Data display component
// Features: Responsive table, empty state, accessibility

interface ItemsTableProps {
  items: Item[];
}

// Key Features:
// - Responsive table design with horizontal scroll
// - Empty state with icon and messaging
// - Accessibility support (proper table structure)
// - Semantic table styling (table-header, table-row, etc.)
// - Column hiding on smaller screens
// - ItemRow integration for individual items
```

#### ItemRow.jsx

```typescript
// Status: ✅ Individual item display component
// Features: Category badges, formatted data, actions

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  dateAdded: string;
}

// Key Features:
// - Category badges with color coding
// - Formatted price display
// - Responsive column visibility
// - Action buttons (edit, delete)
// - Semantic table cell styling
// - Accessibility support
```

#### AddItemButton.jsx

```typescript
// Status: ✅ Item creation trigger
// Features: Responsive design, click handling

// Key Features:
// - Responsive button design
// - Click event handling
// - Integration with ItemsPage
// - Placeholder for future modal/form
// - Consistent styling with design system
```

### Navigation Components

#### UnderlineNav.jsx

```typescript
// Status: ✅ Tab-style navigation component
// Features: Active states, accessibility, responsive design

// Key Features:
// - Tab-style navigation with underline indicators
// - Active state styling with orange accent
// - Accessibility support (ARIA attributes)
// - Responsive design with proper spacing
// - Icon support for navigation items
// - Counter support for tab labels
```

### Utility Components

#### Stack.jsx

```typescript
// Status: ✅ Layout utility component
// Features: Flexible layout, spacing control

// Key Features:
// - Direction control (horizontal, vertical)
// - Alignment options (start, center, end)
// - Gap control for spacing
// - Responsive behavior
// - JSDoc documentation
```

### Advanced PageHeader System

#### PageHeader Compound Component

```typescript
// Status: ✅ Advanced compound component system
// Features: TypeScript, compound API, accessibility, theming

// Compound API Usage:
<PageHeader role="banner" aria-label="Page Header">
  <PageHeader.TitleArea variant="large">
    <PageHeader.Title as="h1">Page Title</PageHeader.Title>
    <PageHeader.Description>Page description</PageHeader.Description>
  </PageHeader.TitleArea>
  <PageHeader.Actions>
    <Button variant="primary">Action</Button>
  </PageHeader.Actions>
  <PageHeader.Navigation>
    <UnderlineNav>
      <UnderlineNav.Item aria-current="page">Tab 1</UnderlineNav.Item>
    </UnderlineNav>
  </PageHeader.Navigation>
</PageHeader>

// Available Sub-components:
// - PageHeader.TitleArea - Title container with variants
// - PageHeader.Title - Flexible title with semantic HTML
// - PageHeader.Description - Page description
// - PageHeader.Actions - Action buttons container
// - PageHeader.Navigation - Navigation elements
// - PageHeader.ContextArea - Context information
// - PageHeader.ParentLink - Back navigation link
// - PageHeader.LeadingVisual - Leading visual element
// - PageHeader.TrailingVisual - Trailing visual element
```

## 🎨 Styling Patterns

### Semantic Token Usage

```css
/* Surface Colors - Use for backgrounds */
bg-surface-page      /* #010409 - Main page background */
bg-surface-primary   /* #0d1117 - Primary surfaces (cards, modals) */
bg-surface-secondary /* #161b22 - Secondary surfaces (nested elements) */
bg-surface-tertiary  /* #212830 - Tertiary surfaces (buttons, inputs) */
bg-surface-hover     /* #262c36 - Hover states */
bg-surface-active    /* #2a313c - Active/pressed states */

/* Text Colors - Use for text hierarchy */
text-text-primary    /* #ffffff - Primary headings and important content */
text-text-secondary  /* #e6edf3 - Body text and secondary content */
text-text-muted      /* #9198a1 - Less important, supporting text */
text-text-placeholder /* #6e7681 - Placeholder text in inputs */
text-text-disabled   /* #484f58 - Disabled state text */
text-text-inverse    /* #0d1117 - Text on light backgrounds */

/* Action Colors - Use for interactive elements */
bg-action-primary    /* #238636 - Success, confirm actions (Green) */
bg-action-primary-hover /* #29903b - Primary hover state */
bg-action-primary-active /* #2e9a40 - Primary active state */
bg-action-danger     /* #da3633 - Destructive actions (Red) */
bg-action-danger-hover /* #e5534b - Danger hover state */
bg-action-danger-muted /* #b62324 - Danger muted state */

/* Accent Colors - Use for highlights and focus states */
text-accent-primary  /* #3b82f6 - Primary accent, links, focus (Blue) */
text-accent-primary-emphasis /* #2563eb - Emphasized accent */
text-accent-secondary /* #f59e0b - Secondary accent, warnings (Orange) */
text-accent-tertiary  /* #8b5cf6 - Optional highlights (Purple) */
```

### Component Class Usage

```css
/* Button Variants - Use for interactive elements */
.btn-primary      /* Green action button - Use for primary actions */
.btn-default      /* Dark surface with border - Use for secondary actions */
.btn-invisible    /* Transparent button - Use for subtle actions */
.btn-danger       /* Red destructive button - Use for destructive actions */

/* Table Styling - Use for data display */
.table-header       /* Table header background and borders */
.table-header-cell  /* Table header cell styling */
.table-row         /* Table row with hover effects */
.table-cell        /* Standard table cell */

/* Card Components - Use for content containers */
.card              /* Standard card container */
.card-section      /* Card with internal padding */

/* Input Components - Use for form elements */
.input-base        /* Base input field styling */

/* Empty States - Use for no-data scenarios */
.empty-state             /* Empty state container */
.empty-state-icon        /* Empty state icon */
.empty-state-title       /* Empty state heading */
.empty-state-description /* Empty state text */
```

## 🔧 Component Patterns

### State Management Pattern

```typescript
// Local state with useState
const [items, setItems] = useState(mockItems);
const [searchTerm, setSearchTerm] = useState('');

// Derived state (computed values)
const filteredItems = items.filter(
  item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
);

// State update pattern
const handleSearch = (term: string) => {
  setSearchTerm(term);
  // Additional logic if needed
};
```

### Event Handling Pattern

```typescript
// Event handler with state update
const handleSearch = (term: string) => {
  setSearchTerm(term);
  // Additional logic if needed
};

// Event handler with side effects
const handleAddItem = () => {
  console.log('Add new item clicked');
  // TODO: Implement add item modal/form
};

// Event handler with parameters
const handleItemClick = (itemId: number) => {
  console.log('Item clicked:', itemId);
  // Handle item click
};
```

### Conditional Rendering Pattern

```typescript
// Empty state handling
if (items.length === 0) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📦</div>
      <h3 className="empty-state-title">No items found</h3>
      <p className="empty-state-description">
        Start by adding your first PC part!
      </p>
    </div>
  )
}

// Conditional classes
const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`
  .trim()

// Conditional content
{isLoading ? (
  <div className="loading-spinner">Loading...</div>
) : (
  <div className="content">Content loaded</div>
)}
```

### Responsive Design Pattern

```typescript
// Mobile-first approach
<div className="flex flex-col sm:flex-row gap-4">
  <div className="w-full sm:w-1/2">Content</div>
</div>

// Responsive text
<h1 className="text-lg sm:text-xl lg:text-2xl">Title</h1>

// Responsive spacing
<div className="p-4 sm:p-6 lg:p-8">Content</div>

// Responsive visibility
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

## 🧪 Testing Patterns

### Component Testing

```typescript
// Basic component test
test('renders button with correct variant', () => {
  render(<Button variant="primary">Test</Button>)
  expect(screen.getByRole('button')).toHaveClass('btn-primary')
})

// Props testing
test('handles click events', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})

// Accessibility test
test('button is accessible', async () => {
  const { container } = render(<Button>Test</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Integration Testing

```typescript
// Component interaction test
test('search filters items correctly', () => {
  render(<ItemsPage />)
  const searchInput = screen.getByRole('searchbox')
  fireEvent.change(searchInput, { target: { value: 'CPU' } })
  expect(screen.getByText('Intel Core i7-13700K')).toBeInTheDocument()
})

// State management test
test('adds item to list', () => {
  render(<ItemsPage />)
  const addButton = screen.getByText('Add Item')
  fireEvent.click(addButton)
  // Verify item was added
})
```

## 🚀 Performance Patterns

### Lazy Loading

```typescript
// Lazy component loading
const LazyPageHeader = lazy(() => import('./PageHeader'))

// Usage with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <LazyPageHeader />
</Suspense>
```

### Memoization

```typescript
// Component memoization
const MemoizedItemRow = React.memo(ItemRow);

// Callback memoization
const handleClick = useCallback(() => {
  // Handle click
}, [dependency]);

// Value memoization
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

## 🔒 Security Patterns

### Input Validation

```typescript
// Input sanitization
const sanitizeInput = (input: string) => {
  return input.trim().replace(/[<>]/g, '');
};

// Validation function
const validateItem = (item: Partial<Item>) => {
  const errors: string[] = [];
  if (!item.name?.trim()) errors.push('Name is required');
  if (item.price && item.price < 0) errors.push('Price must be positive');
  return errors;
};
```

### XSS Prevention

```typescript
// Safe text rendering
const SafeText = ({ text }: { text: string }) => {
  return <span>{text}</span> // React automatically escapes
}

// Dangerous HTML (avoid)
const DangerousHTML = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
```

## 📱 Responsive Patterns

### Mobile-First Design

```css
/* Base styles for mobile */
.component {
  padding: 1rem;
  font-size: 0.875rem;
}

/* Progressive enhancement */
@media (min-width: 640px) {
  .component {
    padding: 1.5rem;
    font-size: 1rem;
  }
}
```

### Breakpoint Usage

```typescript
// Responsive classes
<div className="flex flex-col sm:flex-row">
  <div className="w-full sm:w-1/2">Content</div>
</div>

// Responsive text
<h1 className="text-lg sm:text-xl lg:text-2xl">Title</h1>

// Responsive spacing
<div className="p-4 sm:p-6 lg:p-8">Content</div>
```

## 🎯 AI Agent Guidelines

### When Creating Components

1. **Follow existing patterns** - Use established conventions
2. **Use semantic tokens** - Never hardcode colors (use bg-surface-primary, not #0d1117)
3. **Include TypeScript** - Define proper interfaces for all props
4. **Add accessibility** - Include proper ARIA attributes
5. **Write tests** - Add comprehensive test coverage
6. **Document with JSDoc** - Include detailed comments
7. **Use responsive design** - Mobile-first approach
8. **Follow naming conventions** - PascalCase for components

### When Modifying Components

1. **Check protection notices** - Some components are protected (Button.jsx, SearchBar.jsx)
2. **Maintain API compatibility** - Don't break existing usage
3. **Update tests** - Ensure tests still pass
4. **Update documentation** - Keep docs in sync
5. **Test thoroughly** - Verify all functionality works
6. **Use semantic tokens** - Maintain design consistency

### When Debugging Issues

1. **Check console errors** - Look for JavaScript errors
2. **Verify props** - Ensure correct prop types
3. **Check styling** - Verify CSS classes are applied
4. **Test accessibility** - Run axe tests
5. **Check responsive** - Test on different screen sizes
6. **Verify state** - Check component state and props

### Code Quality Checklist

- [ ] Uses semantic design tokens (bg-surface-primary, text-text-secondary)
- [ ] Includes TypeScript interfaces for props
- [ ] Has proper JSDoc documentation
- [ ] Includes accessibility attributes (aria-label, role)
- [ ] Uses responsive design classes (sm:, md:, lg:)
- [ ] Follows existing naming conventions
- [ ] Has comprehensive test coverage
- [ ] Handles error states gracefully
- [ ] Uses proper event handling patterns
- [ ] Follows component composition patterns

---

_This component analysis is automatically updated as the project evolves._

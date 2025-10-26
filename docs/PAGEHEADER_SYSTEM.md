# PageHeader Component System Documentation

## 🎯 Overview

The PageHeader system is a **sophisticated compound component architecture** built with React, TypeScript, and Tailwind CSS. It provides a flexible, accessible, and maintainable solution for creating page headers with consistent design and behavior.

## 🏗️ Architecture

### Compound Component Pattern

```typescript
// Main component with attached sub-components
const PageHeader = Object.assign(PageHeaderBase, {
  TitleArea: TitleAreaComponent,
  Title: TitleComponent,
  Description: DescriptionComponent,
  Navigation: NavigationComponent,
  Breadcrumbs: BreadcrumbsComponent,
  Actions: ActionsComponent,
  LeadingAction: LeadingActionComponent,
  TrailingAction: TrailingActionComponent,
  LeadingVisual: LeadingVisualComponent,
  TrailingVisual: TrailingVisualComponent,
  ContextArea: ContextAreaComponent,
  ContextBar: ContextBarComponent,
  ContextAreaActions: ContextAreaActionsComponent,
  ParentLink: ParentLinkComponent,
});
```

### File Structure

```
src/components/PageHeader/
├── index.ts                    # Main exports + compound component
├── PageHeader.tsx              # Main component
├── PageHeader.lazy.tsx         # Lazy loading version
├── types.ts                    # TypeScript definitions
├── constants.ts                # Design tokens and constants
├── hooks/
│   └── usePageHeader.ts        # Custom hook for logic
├── utils/
│   ├── classNames.ts           # Class merging utilities
│   ├── validators.ts           # Prop validation
│   └── performance.ts          # Performance monitoring
├── components/
│   ├── Title/
│   │   ├── TitleArea.tsx
│   │   ├── Title.tsx
│   │   ├── Description.tsx
│   │   └── index.ts
│   ├── Navigation/
│   │   ├── Navigation.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── index.ts
│   ├── Actions/
│   │   ├── Actions.tsx
│   │   ├── LeadingAction.tsx
│   │   ├── TrailingAction.tsx
│   │   └── index.ts
│   ├── Visuals/
│   │   ├── LeadingVisual.tsx
│   │   ├── TrailingVisual.tsx
│   │   └── index.ts
│   └── Context/
│       ├── ContextArea.tsx
│       ├── ContextBar.tsx
│       ├── ContextAreaActions.tsx
│       ├── ParentLink.tsx
│       └── index.ts
├── __tests__/                  # Test files
├── stories/                    # Storybook stories
└── README.md                   # Component documentation
```

## 🧩 Component API

### Main PageHeader Component

```typescript
interface PageHeaderProps {
  children?: ReactNode
  className?: string
  role?: 'banner' | 'header'
  hasBorder?: boolean
  variant?: 'default' | 'minimal' | 'elevated'
  hidden?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}

// Usage
<PageHeader role="banner" aria-label="Main page header">
  {/* Content */}
</PageHeader>
```

### Title Components

#### TitleArea

```typescript
interface TitleAreaProps {
  children?: ReactNode
  className?: string
  variant?: 'subtitle' | 'medium' | 'large' | 'xl' | '2xl'
  align?: 'left' | 'center' | 'right'
  spacing?: 'tight' | 'normal' | 'loose'
  hidden?: boolean
}

// Usage
<PageHeader.TitleArea variant="large" align="left">
  <PageHeader.Title>Page Title</PageHeader.Title>
</PageHeader.TitleArea>
```

#### Title

```typescript
interface TitleProps {
  children?: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
  variant?: 'default' | 'transparent' | 'muted'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  hidden?: boolean
}

// Usage
<PageHeader.Title as="h1" variant="default">
  Page Title
</PageHeader.Title>
```

#### Description

```typescript
interface DescriptionProps {
  children?: ReactNode
  className?: string
  variant?: 'default' | 'transparent' | 'muted'
  size?: 'sm' | 'md' | 'lg'
  hidden?: boolean
}

// Usage
<PageHeader.Description size="md">
  This is a page description
</PageHeader.Description>
```

### Navigation Components

#### Navigation

```typescript
interface NavigationProps {
  children?: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  variant?: 'default' | 'minimal' | 'pills'
  orientation?: 'horizontal' | 'vertical'
  hidden?: boolean
}

// Usage
<PageHeader.Navigation variant="default" orientation="horizontal">
  <UnderlineNav>
    <UnderlineNav.Item aria-current="page">Overview</UnderlineNav.Item>
    <UnderlineNav.Item>Settings</UnderlineNav.Item>
  </UnderlineNav>
</PageHeader.Navigation>
```

#### Breadcrumbs

```typescript
interface BreadcrumbsProps {
  children?: ReactNode
  className?: string
  separator?: ReactNode
  variant?: 'default' | 'minimal'
  maxItems?: number
  hidden?: boolean
}

// Usage
<PageHeader.Breadcrumbs separator="→" maxItems={5}>
  <nav aria-label="Breadcrumb">
    <ol className="flex list-none">
      <li><a href="/">Home</a></li>
      <li><a href="/projects">Projects</a></li>
      <li>Current Page</li>
    </ol>
  </nav>
</PageHeader.Breadcrumbs>
```

### Action Components

#### Actions

```typescript
interface ActionsProps {
  children?: ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  spacing?: 'tight' | 'normal' | 'loose'
  align?: 'start' | 'center' | 'end'
  wrap?: boolean
  hidden?: boolean
}

// Usage
<PageHeader.Actions direction="horizontal" spacing="normal">
  <Button variant="invisible">Settings</Button>
  <Button variant="primary">Save</Button>
</PageHeader.Actions>
```

### Visual Components

#### LeadingVisual / TrailingVisual

```typescript
interface VisualProps {
  children?: ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  position?: 'leading' | 'trailing'
  spacing?: 'tight' | 'normal' | 'loose'
  hidden?: boolean
}

// Usage
<PageHeader.TitleArea>
  <PageHeader.LeadingVisual size="md">
    <div className="w-8 h-8 bg-accent-primary rounded-full">
      <Icon className="w-4 h-4" />
    </div>
  </PageHeader.LeadingVisual>
  <PageHeader.Title>Title</PageHeader.Title>
  <PageHeader.TrailingVisual size="sm">
    <Badge>Status</Badge>
  </PageHeader.TrailingVisual>
</PageHeader.TitleArea>
```

### Context Components

#### ContextArea

```typescript
interface ContextAreaProps {
  children?: ReactNode
  className?: string
  variant?: 'default' | 'minimal' | 'elevated'
  spacing?: 'tight' | 'normal' | 'loose'
  hidden?: boolean
}

// Usage
<PageHeader.ContextArea variant="default">
  <PageHeader.ParentLink href="/dashboard">
    ← Back to Dashboard
  </PageHeader.ParentLink>
</PageHeader.ContextArea>
```

#### ParentLink

```typescript
interface ParentLinkProps {
  children?: ReactNode
  href: string
  className?: string
  external?: boolean
  variant?: 'default' | 'minimal' | 'button'
  size?: 'sm' | 'md' | 'lg'
  hidden?: boolean
}

// Usage
<PageHeader.ParentLink href="/projects" variant="default">
  ← Back to Projects
</PageHeader.ParentLink>
```

## 🎨 Styling System

### Semantic Design Tokens

The PageHeader system uses the same semantic design tokens as the main theme:

```typescript
// Surface colors for backgrounds
bg - surface - page; // Main page background
bg - surface - primary; // Primary surfaces
bg - surface - secondary; // Secondary surfaces

// Text colors for hierarchy
text - text - primary; // Primary headings
text - text - secondary; // Body text
text - text - muted; // Supporting text

// Action colors for interactive elements
bg - action - primary; // Primary actions
bg - action - danger; // Destructive actions

// Accent colors for highlights
text - accent - primary; // Links and focus states
text - accent - secondary; // Warnings and highlights
```

### Component-Specific Classes

```css
/* PageHeader specific classes */
.page-header {
  @apply bg-surface-primary border-b border-border-default;
}

.page-header-minimal {
  @apply bg-transparent border-none;
}

.page-header-elevated {
  @apply bg-surface-primary border border-border-default shadow-lg;
}

/* Title area variants */
.title-area-subtitle {
  @apply text-sm text-text-muted;
}

.title-area-medium {
  @apply text-base text-text-primary;
}

.title-area-large {
  @apply text-lg text-text-primary;
}

.title-area-xl {
  @apply text-xl text-text-primary;
}

.title-area-2xl {
  @apply text-2xl text-text-primary;
}
```

## 🧪 Usage Examples

### Basic PageHeader

```jsx
<PageHeader role='banner' aria-label='Basic page header'>
  <div className='px-5 py-5'>
    <PageHeader.TitleArea>
      <PageHeader.Title as='h1'>Page Title</PageHeader.Title>
    </PageHeader.TitleArea>
    <PageHeader.Description>
      This is a basic page header with title and description
    </PageHeader.Description>
  </div>
</PageHeader>
```

### PageHeader with Actions

```jsx
<PageHeader role='banner' aria-label='Page with actions'>
  <div className='px-5 py-5'>
    <div className='flex items-center justify-between'>
      <PageHeader.TitleArea variant='large'>
        <PageHeader.Title as='h1'>Dashboard</PageHeader.Title>
      </PageHeader.TitleArea>
      <PageHeader.Actions spacing='normal'>
        <Button variant='invisible'>Settings</Button>
        <Button variant='primary'>Save</Button>
      </PageHeader.Actions>
    </div>
  </div>
</PageHeader>
```

### PageHeader with Navigation

```jsx
<PageHeader role='banner' aria-label='Page with navigation'>
  <div className='px-5 py-5'>
    <PageHeader.TitleArea>
      <PageHeader.Title as='h1'>Project</PageHeader.Title>
    </PageHeader.TitleArea>
    <PageHeader.Description>
      Project management dashboard
    </PageHeader.Description>
    <PageHeader.Navigation>
      <UnderlineNav>
        <UnderlineNav.Item aria-current='page'>Overview</UnderlineNav.Item>
        <UnderlineNav.Item>Settings</UnderlineNav.Item>
        <UnderlineNav.Item>Team</UnderlineNav.Item>
      </UnderlineNav>
    </PageHeader.Navigation>
  </div>
</PageHeader>
```

### Complex PageHeader

```jsx
<PageHeader role='banner' aria-label='Complex page header'>
  <div className='px-5 py-5'>
    {/* Context area with parent link */}
    <PageHeader.ContextArea>
      <PageHeader.ContextBar>
        <PageHeader.ParentLink href='/projects'>
          ← All Projects
        </PageHeader.ParentLink>
        <PageHeader.ContextAreaActions>
          <Button variant='invisible' size='small'>
            ⚙️ Settings
          </Button>
        </PageHeader.ContextAreaActions>
      </PageHeader.ContextBar>
    </PageHeader.ContextArea>

    {/* Title area with visuals and actions */}
    <div className='flex items-center justify-between mt-3'>
      <PageHeader.TitleArea variant='large'>
        <PageHeader.LeadingVisual size='md'>
          <div className='w-8 h-8 bg-accent-tertiary rounded-full flex items-center justify-center'>
            📦
          </div>
        </PageHeader.LeadingVisual>
        <PageHeader.Title as='h1'>My Awesome Project</PageHeader.Title>
        <PageHeader.TrailingVisual size='sm'>
          <span className='bg-action-primary bg-opacity-20 text-action-primary text-xs px-2 py-1 rounded-full'>
            Active
          </span>
        </PageHeader.TrailingVisual>
      </PageHeader.TitleArea>

      <PageHeader.Actions spacing='normal'>
        <Button variant='invisible'>🔍 Search</Button>
        <Button variant='default'>Save Changes</Button>
        <Button variant='primary'>Deploy</Button>
      </PageHeader.Actions>
    </div>

    {/* Description */}
    <PageHeader.Description>
      A comprehensive project management dashboard with real-time updates.
    </PageHeader.Description>

    {/* Navigation tabs */}
    <PageHeader.Navigation>
      <UnderlineNav aria-label='Project sections'>
        <UnderlineNav.Item href='#overview' aria-current='page'>
          Overview
        </UnderlineNav.Item>
        <UnderlineNav.Item href='#tasks'>Tasks</UnderlineNav.Item>
        <UnderlineNav.Item href='#team'>Team</UnderlineNav.Item>
      </UnderlineNav>
    </PageHeader.Navigation>

    {/* Breadcrumbs */}
    <PageHeader.Breadcrumbs>
      <nav aria-label='Breadcrumb'>
        <ol className='flex list-none'>
          <li>
            <a href='/' className='text-accent-primary hover:underline'>
              Home
            </a>
          </li>
          <li className='mx-1 text-text-muted'>/</li>
          <li>
            <a href='/projects' className='text-accent-primary hover:underline'>
              Projects
            </a>
          </li>
          <li className='mx-1 text-text-muted'>/</li>
          <li className='text-text-secondary'>My Awesome Project</li>
        </ol>
      </nav>
    </PageHeader.Breadcrumbs>
  </div>
</PageHeader>
```

## 🔧 Advanced Features

### Custom Hook

```typescript
// usePageHeader hook for advanced usage
const { headerClasses, ariaAttributes, validatedProps, role, children } =
  usePageHeader({
    role: 'banner',
    hasBorder: true,
    variant: 'default',
    'aria-label': 'Custom header',
  });
```

### Lazy Loading

```typescript
// Lazy load the entire PageHeader system
import { LazyPageHeader } from './components/PageHeader/PageHeader.lazy';

<Suspense fallback={<div>Loading...</div>}>
  <LazyPageHeader>
    <LazyPageHeader.TitleArea>
      <LazyPageHeader.Title>Lazy Loaded Title</LazyPageHeader.Title>
    </LazyPageHeader.TitleArea>
  </LazyPageHeader>
</Suspense>
```

### Performance Monitoring

```typescript
// Performance monitoring utilities
import { usePerformanceMonitor } from './components/PageHeader/utils/performance';

function MyComponent() {
  const { renderCount, measureRender } = usePerformanceMonitor('MyComponent');

  measureRender(() => {
    // Expensive operation
  });

  return <div>Component content</div>;
}
```

## 🧪 Testing

### Test Structure

```
src/components/PageHeader/__tests__/
├── PageHeader.test.tsx              # Main component tests
├── PageHeader.integration.test.tsx  # Integration tests
├── Title.test.tsx                   # Title component tests
├── TitleArea.test.tsx               # TitleArea component tests
└── ... (tests for all sub-components)
```

### Test Examples

```typescript
// Basic component test
test('renders page header with title', () => {
  render(
    <PageHeader>
      <PageHeader.TitleArea>
        <PageHeader.Title>Test Title</PageHeader.Title>
      </PageHeader.TitleArea>
    </PageHeader>
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

// Accessibility test
test('page header is accessible', async () => {
  const { container } = render(
    <PageHeader aria-label="Test header">
      <PageHeader.TitleArea>
        <PageHeader.Title>Test Title</PageHeader.Title>
      </PageHeader.TitleArea>
    </PageHeader>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Integration test
test('page header with actions works correctly', () => {
  const handleClick = jest.fn();

  render(
    <PageHeader>
      <PageHeader.TitleArea>
        <PageHeader.Title>Test Title</PageHeader.Title>
      </PageHeader.TitleArea>
      <PageHeader.Actions>
        <Button onClick={handleClick}>Test Action</Button>
      </PageHeader.Actions>
    </PageHeader>
  );

  fireEvent.click(screen.getByText('Test Action'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 📚 Storybook Integration

### Story Structure

```typescript
// PageHeader.stories.tsx
export default {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component: 'A flexible page header component with compound API.'
      }
    }
  }
};

export const Basic = {
  args: {
    'aria-label': 'Basic page header'
  },
  render: (args) => (
    <PageHeader {...args}>
      <div className="px-5 py-5">
        <PageHeader.TitleArea>
          <PageHeader.Title>Basic Page</PageHeader.Title>
        </PageHeader.TitleArea>
      </div>
    </PageHeader>
  )
};

export const WithActions = {
  render: () => (
    <PageHeader aria-label="Page with actions">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between">
          <PageHeader.TitleArea>
            <PageHeader.Title>Page with Actions</PageHeader.Title>
          </PageHeader.TitleArea>
          <PageHeader.Actions>
            <Button variant="primary">Action</Button>
          </PageHeader.Actions>
        </div>
      </div>
    </PageHeader>
  )
};
```

## 🚀 Performance Optimization

### Bundle Splitting

```typescript
// Individual component imports
import { TitleArea, Title, Description } from './components/PageHeader';

// Lazy loading
const PageHeader = lazy(() => import('./components/PageHeader'));
```

### Memoization

```typescript
// Memoized sub-components
const MemoizedTitleArea = React.memo(TitleArea);
const MemoizedTitle = React.memo(Title);
```

## 🔒 Accessibility Features

### WCAG 2.1 AA Compliance

- **Semantic HTML** - Proper heading hierarchy
- **ARIA Labels** - Comprehensive labeling
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper announcements
- **Focus Management** - Visible focus indicators
- **Color Contrast** - Meets WCAG standards

### Accessibility Examples

```jsx
// Proper heading hierarchy
<PageHeader.Title as="h1">Main Page Title</PageHeader.Title>
<PageHeader.Title as="h2">Section Title</PageHeader.Title>

// ARIA labels
<PageHeader role="banner" aria-label="Main page header">
  <PageHeader.Navigation aria-label="Page navigation">
    <UnderlineNav aria-label="Section navigation">
      <UnderlineNav.Item aria-current="page">Current Section</UnderlineNav.Item>
    </UnderlineNav>
  </PageHeader.Navigation>
</PageHeader>
```

## 🎯 Best Practices

### 1. Component Composition

- Use compound component API for flexibility
- Compose sub-components as needed
- Maintain proper heading hierarchy
- Include appropriate ARIA labels

### 2. Styling

- Use semantic design tokens
- Leverage component variants
- Maintain responsive design
- Follow accessibility guidelines

### 3. Performance

- Use lazy loading for large implementations
- Memoize expensive sub-components
- Optimize bundle size with tree-shaking
- Monitor performance metrics

### 4. Testing

- Test all component variants
- Include accessibility tests
- Test integration scenarios
- Maintain high test coverage

---

_This PageHeader system documentation is automatically updated as the project evolves._

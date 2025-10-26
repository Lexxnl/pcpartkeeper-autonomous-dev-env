# PageHeader Component System

A comprehensive, production-ready PageHeader component system built with React, TypeScript, and Tailwind CSS. This system provides a flexible, accessible, and maintainable solution for creating page headers with consistent design and behavior.

## 🚀 Features

- **🎯 Compound Component API** - Intuitive, flexible component composition
- **🔒 Full TypeScript Support** - Complete type safety and IntelliSense
- **🎨 Semantic Design System** - Consistent theming with Tailwind CSS
- **♿ Accessibility First** - WCAG compliant with proper ARIA attributes
- **📱 Responsive Design** - Mobile-first approach with breakpoint support
- **⚡ Performance Optimized** - Lazy loading, memoization, and tree-shaking
- **🧪 Fully Tested** - Comprehensive test suite with 100% coverage
- **📚 Well Documented** - Storybook stories and JSDoc comments
- **🔄 Migration Ready** - Automated migration scripts and backward compatibility

## 📦 Installation

```bash
# Install dependencies
npm install clsx tailwind-merge

# Install dev dependencies
npm install --save-dev @types/react @types/react-dom
```

## 🎯 Quick Start

### Basic Usage

```tsx
import {
  PageHeader,
  TitleArea,
  Title,
  Description,
} from './components/PageHeader';

function MyPage() {
  return (
    <PageHeader aria-label='Main page header'>
      <div className='px-5 py-5'>
        <TitleArea>
          <Title>Page Title</Title>
        </TitleArea>
        <Description>This is a page description</Description>
      </div>
    </PageHeader>
  );
}
```

### With Actions

```tsx
import { PageHeader, TitleArea, Title, Actions } from './components/PageHeader';

function MyPage() {
  return (
    <PageHeader>
      <div className='px-5 py-5'>
        <div className='flex items-center justify-between'>
          <TitleArea>
            <Title>Page with Actions</Title>
          </TitleArea>
          <Actions>
            <button className='px-3 py-1 bg-action-primary text-white rounded'>
              Save
            </button>
          </Actions>
        </div>
      </div>
    </PageHeader>
  );
}
```

### Complex Header

```tsx
import {
  PageHeader,
  TitleArea,
  Title,
  Description,
  Actions,
  ContextArea,
  ParentLink,
  Navigation,
} from './components/PageHeader';

function ComplexPage() {
  return (
    <PageHeader aria-label='Complex page header'>
      <div className='px-5 py-5'>
        <ContextArea>
          <ParentLink href='/dashboard'>← Back to Dashboard</ParentLink>
        </ContextArea>

        <div className='flex items-center justify-between'>
          <TitleArea>
            <Title>Complex Page</Title>
          </TitleArea>
          <Actions>
            <button>Settings</button>
            <button>Save</button>
          </Actions>
        </div>

        <Description>This is a complex page header</Description>

        <Navigation>
          <nav className='flex space-x-6'>
            <a
              href='#'
              className='text-accent-primary border-b-2 border-accent-primary'
            >
              Overview
            </a>
            <a href='#' className='text-text-muted hover:text-text-primary'>
              Settings
            </a>
          </nav>
        </Navigation>
      </div>
    </PageHeader>
  );
}
```

## 🧩 Component API

### PageHeader

Main container component for page headers.

```tsx
interface PageHeaderProps {
  children?: ReactNode;
  className?: string;
  role?: 'banner' | 'header';
  hasBorder?: boolean;
  variant?: 'default' | 'minimal' | 'elevated';
  hidden?: boolean;
  'aria-label'?: string;
}
```

### TitleArea

Container for title-related components.

```tsx
interface TitleAreaProps {
  children?: ReactNode;
  className?: string;
  variant?: 'subtitle' | 'medium' | 'large' | 'xl' | '2xl';
  align?: 'left' | 'center' | 'right';
  spacing?: 'tight' | 'normal' | 'loose';
  hidden?: boolean;
}
```

### Title

Flexible title component with semantic HTML support.

```tsx
interface TitleProps {
  children?: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
  variant?: 'default' | 'transparent' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  hidden?: boolean;
}
```

### Description

Description component for page headers.

```tsx
interface DescriptionProps {
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'transparent' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  hidden?: boolean;
}
```

### Actions

Container for action buttons and controls.

```tsx
interface ActionsProps {
  children?: ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'loose';
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
  hidden?: boolean;
}
```

### Navigation

Container for navigation elements.

```tsx
interface NavigationProps {
  children?: ReactNode;
  className?: string;
  as?: ComponentType<HTMLAttributes<HTMLElement>>;
  variant?: 'default' | 'minimal' | 'pills';
  orientation?: 'horizontal' | 'vertical';
  hidden?: boolean;
}
```

### Breadcrumbs

Navigation breadcrumb component.

```tsx
interface BreadcrumbsProps {
  children?: ReactNode;
  className?: string;
  separator?: ReactNode;
  variant?: 'default' | 'minimal';
  maxItems?: number;
  hidden?: boolean;
}
```

### ContextArea

Container for contextual information.

```tsx
interface ContextAreaProps {
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'elevated';
  spacing?: 'tight' | 'normal' | 'loose';
  hidden?: boolean;
}
```

### ParentLink

Link component for navigation back to parent pages.

```tsx
interface ParentLinkProps {
  children?: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
  variant?: 'default' | 'minimal' | 'button';
  size?: 'sm' | 'md' | 'lg';
  hidden?: boolean;
}
```

## 🎨 Styling

### Semantic Design Tokens

The component system uses semantic design tokens for consistent theming:

```css
/* Surface colors */
bg-surface-page      /* Main page background */
bg-surface-primary   /* Primary surfaces (cards, modals) */
bg-surface-secondary /* Secondary surfaces (nested elements) */
bg-surface-tertiary  /* Tertiary surfaces (buttons, inputs) */

/* Text colors */
text-text-primary    /* Primary headings and important content */
text-text-secondary  /* Body text and secondary content */
text-text-muted      /* Less important, supporting text */

/* Action colors */
bg-action-primary    /* Primary action (success, confirm) */
bg-action-danger     /* Danger action (delete, remove) */

/* Accent colors */
text-accent-primary  /* Primary accent (links, focus states) */
```

### Custom Styling

```tsx
// Using className prop
<PageHeader className="custom-header-class">
  <TitleArea className="custom-title-area">
    <Title className="custom-title-class">Custom Title</Title>
  </TitleArea>
</PageHeader>

// Using CSS-in-JS
<PageHeader style={{ backgroundColor: 'var(--custom-bg)' }}>
  <TitleArea>
    <Title>Styled Title</Title>
  </TitleArea>
</PageHeader>
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Examples

```tsx
import { render, screen } from '@testing-library/react';
import { PageHeader, TitleArea, Title } from './components/PageHeader';

test('renders page header with title', () => {
  render(
    <PageHeader>
      <TitleArea>
        <Title>Test Title</Title>
      </TitleArea>
    </PageHeader>
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
});
```

## 📚 Storybook

View all component variations and examples in Storybook:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## ⚡ Performance

### Lazy Loading

```tsx
import { LazyPageHeader } from './components/PageHeader/PageHeader.lazy';

// Lazy load the entire component system
<LazyPageHeader>
  <div className='px-5 py-5'>
    <LazyPageHeader.TitleArea>
      <LazyPageHeader.Title>Lazy Loaded Title</LazyPageHeader.Title>
    </LazyPageHeader.TitleArea>
  </div>
</LazyPageHeader>;
```

### Performance Monitoring

```tsx
import { usePerformanceMonitor } from './components/PageHeader/utils/performance';

function MyComponent() {
  const { renderCount, measureRender } = usePerformanceMonitor('MyComponent');

  // Monitor render performance
  measureRender(() => {
    // Expensive operation
  });

  return <div>Component content</div>;
}
```

## 🔄 Migration

### From Monolithic PageHeader

If you're migrating from a monolithic PageHeader component:

```bash
# Run migration script
node scripts/migrate-pageheader.js

# Dry run to see what would change
node scripts/migrate-pageheader.js --dry-run

# Validate migration
node scripts/migrate-pageheader.js --validate
```

### Manual Migration

1. **Update imports:**

   ```tsx
   // Before
   import PageHeader from './components/PageHeader';

   // After
   import {
     PageHeader,
     TitleArea,
     Title,
     Description,
   } from './components/PageHeader';
   ```

2. **Update usage:**

   ```tsx
   // Before
   <PageHeader.TitleArea>
     <PageHeader.Title>Title</PageHeader.Title>
   </PageHeader.TitleArea>

   // After
   <TitleArea>
     <Title>Title</Title>
   </TitleArea>
   ```

## 🛠️ Development

### Project Structure

```
src/components/PageHeader/
├── index.ts                    # Main exports
├── PageHeader.tsx             # Main component
├── types.ts                   # TypeScript definitions
├── constants.ts               # Design tokens
├── hooks/                     # Custom hooks
│   └── usePageHeader.ts
├── utils/                     # Utility functions
│   ├── classNames.ts
│   ├── validators.ts
│   └── performance.ts
├── components/                # Sub-components
│   ├── Title/
│   ├── Navigation/
│   ├── Actions/
│   ├── Visuals/
│   └── Context/
├── __tests__/                 # Test files
├── stories/                   # Storybook stories
└── README.md                  # This file
```

### Adding New Components

1. Create component file in appropriate directory
2. Add TypeScript types to `types.ts`
3. Add constants to `constants.ts`
4. Create tests in `__tests__/`
5. Add Storybook stories
6. Export from appropriate `index.ts`
7. Update main `index.ts`

### Code Style

- Use TypeScript for all components
- Follow React best practices
- Use semantic HTML elements
- Include proper ARIA attributes
- Write comprehensive tests
- Document with JSDoc comments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- 📖 [Documentation](./README.md)
- 🐛 [Issue Tracker](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)
- 📧 [Email Support](mailto:support@example.com)

---

**Built with ❤️ for maintainability and scalability**

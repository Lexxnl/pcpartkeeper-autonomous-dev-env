# PCPartKeeper-React Architecture

**Last Updated:** December 2024

## Overview

This document describes the architecture decisions, patterns, and conventions used in PCPartKeeper-React, a React application for managing PC parts inventory.

---

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Vite** - Build tool
- **Jest** - Testing framework

---

## State Management

### Zustand

We use **Zustand** for global state management because:
- Lightweight and simple (no boilerplate compared to Redux)
- Built-in devtools support
- Better TypeScript inference
- Easy to test
- No provider hell

### Store Structure

```
store/
├── index.ts          # Store setup and subscriptions
├── types.ts          # Type definitions
└── slices/
    ├── itemsSlice.ts # Items domain state
    ├── uiSlice.ts    # UI state (modals, loading, errors)
    └── userSlice.ts  # User state and preferences
```

### Store Architecture

```typescript
// Modular slices pattern
export const useItemsStore = create<ItemsSlice>()(/* ... */);
export const useUIStore = create<UISlice>()(/* ... */);
export const useUserStore = create<UserSlice>()(/* ... */);

// No combined store - individual stores are more performant
export { useItemsStore, useUIStore, useUserStore };
```

### Subscription System

Store subscriptions handle side effects:
- User authentication changes
- Error notifications
- Loading state updates

**Key Pattern:** Stable selector functions to prevent memory leaks.

---

## Component Patterns

### Compound Components (DataTable)

The DataTable uses a compound component pattern for maximum flexibility:

```typescript
<DataTable data={items} columns={columns}>
  <DataTable.Header title="Items" />
  <DataTable.Body />
  <DataTable.Pagination />
</DataTable>
```

**Benefits:**
- Flexible composition
- Clear separation of concerns
- Better tree-shaking
- Modular testing

### Config-Driven Navigation

Navigation is data-driven for easy maintenance:

```typescript
// config/navigation.ts
export const NAV_ITEMS: NavItem[] = [
  { id: 'items', label: 'Items Page', page: 'items', icon: ListIcon },
  // ...
];

// Usage in App.tsx
{NAV_ITEMS.map(item => (
  <UnderlineNav.Item key={item.id} onClick={() => setCurrentPage(item.page)}>
    {/* ... */}
  </UnderlineNav.Item>
))}
```

**Benefits:**
- Single source of truth
- Easy to add/remove/reorder items
- Type-safe navigation

### Custom Hooks

Extract reusable logic into custom hooks:

```typescript
// hooks/useItemColumns.ts
export const useItemColumns = (
  handleEditItem,
  handleDeleteItem,
  deletingItemId
) => {
  return useMemo(() => {
    // Column generation logic
  }, [dependencies]);
};
```

**Benefits:**
- Reusable logic
- Better testability
- Cleaner components
- Proper memoization

---

## Performance Optimizations

### Memoization Strategy

**React.memo** for components:
- Applied to Button, Avatar, SearchBar, and other pure components
- Prevents unnecessary re-renders
- Use when: component is expensive or re-renders frequently

**useMemo** for computed values:
- Used for filtering, sorting, column generation
- Caches expensive calculations
- Prevents recalculation when dependencies haven't changed

**useCallback** for event handlers:
- Stable function references
- Prevents child re-renders
- Used for store actions passed to children

### Virtual Scrolling

DataTable implements virtual scrolling for large datasets:
- Threshold: 50+ rows
- Overscan: 10 rows
- Prevents rendering all rows at once
- Improves performance with 100+ items

### Data Caching

- Mock data cached in apiService
- 5-minute cache duration
- Automatic cache invalidation
- Reduces CPU usage

---

## Styling Approach

### Tailwind CSS

Utility-first approach with semantic design tokens:

```javascript
// tailwind.config.js
colors: {
  surface: {
    page: '#010409',
    primary: '#0d1117',
    // ... semantic colors
  }
}
```

**Design System:**
- Semantic color tokens (surface, text, action, accent)
- Consistent spacing system
- Responsive breakpoints (sm, md, lg, xl, 2xl)
- Custom animations and transitions

### Custom Classes

Located in `src/index.css`:
- Component-specific styles
- Complex patterns not achievable with utilities
- DataTable styling
- Button variants
- Loading states
- Empty states

---

## Error Handling

### Error Boundaries

Granular error boundaries at different levels:

1. **App-level** (`ErrorBoundary`)
   - Catches top-level errors
   - Global error UI

2. **Page-level** (`PageErrorBoundary`)
   - Per-page error handling
   - Page-specific error UI

3. **Component-level** (`FormErrorBoundary`, `DataTableErrorBoundary`)
   - Isolated component errors
   - Graceful degradation

### Error State Management

Currently uses granular error states:
```typescript
errors: {
  items: string | null;
  addItem: string | null;
  // ... per-operation errors
}
```

**Future:** Unified error array (deferred for safety)

### Notifications

Centralized notification system in UI store:
- Types: success, error, warning, info
- Auto-dismiss capability
- Timestamp tracking
- Integration with error boundaries

---

## Testing Strategy

### Unit Tests

**Jest + React Testing Library**
- Focus on user interactions
- Component behavior over implementation
- Accessibility testing with jest-axe

**Coverage Goals:**
- Components: 80%+
- Utilities: 90%+
- Store logic: 80%+

### Test Structure

```
src/
  __tests__/         # Test utilities, setup
  components/
    Component.tsx
    __tests__/
      Component.test.tsx
      Component.a11y.test.tsx
```

**Testing Patterns:**
- User-centric testing (what users do, not how)
- Integration tests for complex flows
- Accessibility tests for all interactive components

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## Performance Monitoring

### Development Tools

- Performance marks in development
- React DevTools Profiler
- Bundle analyzer (npm run analyze)

### Monitoring Utilities

Located in `src/utils/performance.ts`:
- `measurePerformance()` - Measure function execution
- `trackWebVitals()` - Core Web Vitals tracking
- `mark()` / `measure()` - Performance API wrappers

---

## Configuration

### Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

### Build Configuration

**Vite (`vite.config.js`):**
- Manual vendor chunks for better caching
- React-specific optimizations
- Terser minification
- Bundle size warnings at 1000KB

**Chunk Strategy:**
- `react-vendor` - React, React-DOM
- `ui-vendor` - clsx, tailwind-merge
- `store-vendor` - Zustand
- Feature chunks auto-optimized by Vite

---

## File Organization

```
src/
├── components/      # React components
│   ├── DataTable/  # Compound component
│   ├── PageHeader/ # Modular header
│   └── ...
├── hooks/           # Custom React hooks
├── store/           # Zustand store
│   ├── slices/     # Store slices
│   └── types.ts     # Type definitions
├── pages/           # Page components
├── services/        # API services
├── utils/           # Utility functions
├── config/          # Configuration files
├── data/            # Mock data
└── lib/             # Shared libraries
```

---

## Code Quality Standards

### TypeScript

- Strict mode enabled
- No `any` types (use proper generics)
- Comprehensive type definitions
- Interface over type where appropriate

### ESLint Configuration

- React hooks rules
- Consistent code style
- Accessibility rules (jsx-a11y)
- Import organization

### Code Comments

**JSDoc for all public APIs:**
```typescript
/**
 * Function description
 * 
 * @param param - Parameter description
 * @returns Return description
 */
```

---

## Accessibility

### ARIA Labels

- All interactive elements have labels
- Form inputs have descriptions
- Buttons have accessible names

### Keyboard Navigation

- All functionality keyboard accessible
- Tab order is logical
- Enter/Space activate buttons

### Screen Readers

- Proper heading hierarchy
- Live regions for dynamic content
- Skip links for navigation

---

## Deployment

### Build Process

```bash
npm run build    # Production build
npm run preview  # Preview production build
```

### Deployment Platforms

- **Railway** - Current hosting
- **Vercel** - Alternative (netlify, etc.)

### Environment Considerations

- Production builds are optimized
- Error logging integrated
- Performance monitoring ready
- SEO optimization (if applicable)

---

## Future Improvements

### Short-term

1. ✅ Implement state persistence (localStorage)
2. ✅ Add more comprehensive tests
3. ✅ Improve accessibility features

### Long-term

1. Implement authentication flow
2. Add i18n support
3. Implement PWA features
4. Add end-to-end testing (Playwright/Cypress)

---

## Design Decisions

### Why Zustand over Redux?

- Less boilerplate
- Better TypeScript support
- Simpler to understand
- Sufficient for application size

### Why Tailwind over styled-components?

- Faster development
- Better bundle size
- Utility-first philosophy
- Design system integration

### Why Vite over Create React App?

- Faster development server
- Better build performance
- Modern tooling
- Smaller bundle size

---

## Contributing

### Code Style

- Use TypeScript strictly
- Follow existing patterns
- Add JSDoc comments
- Write tests for new features

### Pull Request Process

1. Create feature branch
2. Write tests
3. Ensure all tests pass
4. Update documentation
5. Submit PR

---

*This architecture document is a living document and should be updated as the project evolves.*


# Component Memoization Policy

**Version:** 1.0  
**Last Updated:** December 2024  
**Project:** PCPartKeeper React Application

---

## 📋 Overview

This document establishes a consistent strategy for using React memoization (`React.memo`, `useMemo`, `useCallback`) across the PCPartKeeper application to optimize performance while maintaining code readability.

---

## 🎯 Core Principles

### 1. Performance First, Not Optimization Theater
- Only memoize when there's measurable benefit
- Profile before optimizing
- Don't optimize prematurely

### 2. When to Memoize
- ✅ Component receives stable props but re-renders frequently
- ✅ Component performs expensive computations
- ✅ Component is used in lists with many items (10+)
- ✅ Parent component re-renders often with the same props

### 3. When NOT to Memoize
- ❌ Component receives new object/array references on every render
- ❌ Component is lightweight and rarely re-renders
- ❌ Memoization overhead might be greater than re-render cost
- ❌ Component is a simple wrapper with no logic

---

## 📝 Standard Patterns

### Pattern 1: Simple Components (No Memo)
**Use when:** Component is small, has no logic, rarely re-renders

```typescript
// Simple presentational component
const Avatar = ({ initials, name, size }) => {
  return <div>{initials}</div>;
};

export default Avatar;
```

**Examples:**
- Icon components
- Simple wrappers
- Static content

---

### Pattern 2: List Items (Always Memo)
**Use when:** Component is used in a list of items

```typescript
const ItemRow = memo(({ item, onEdit, onDelete }) => {
  return (
    <tr>
      {/* ... */}
    </tr>
  );
});

export default ItemRow;
```

**Examples:**
- DataTable rows
- Cart items
- List components

---

### Pattern 3: Containers (Conditional Memo)
**Use when:** Props are stable and parent re-renders often

```typescript
const ItemsPage = memo(() => {
  const items = useItemsStore(state => state.items);
  // ... component logic
  
  return <DataTable data={items} />;
});

export default ItemsPage;
```

**Examples:**
- Page components
- DataTable
- Form components

---

### Pattern 4: Data-Heavy Components (Always Memo)
**Use when:** Component processes large datasets or does heavy computation

```typescript
const Chart = memo(({ data }) => {
  const processedData = useMemo(() => {
    return processLargeDataset(data);
  }, [data]);
  
  return <svg>{/* render chart */}</svg>;
});

export default Chart;
```

**Examples:**
- Charts and visualizations
- Complex data processing
- Heavy computation components

---

## 🛠️ Implementation Guidelines

### Using React.memo

```typescript
import { memo } from 'react';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

const Component = memo<ComponentProps>(({ title, onAction }) => {
  return <div>{title}</div>;
});

Component.displayName = 'Component';

export default Component;
```

**Best Practices:**
- Always set `displayName` for debugging
- Use type parameters for TypeScript
- Keep component pure (no side effects)

---

### Using useMemo

```typescript
const Component = ({ items, filter }) => {
  // ✅ Good: Expensive computation memoized
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  // ❌ Bad: Simple operations don't need memoization
  const itemCount = items.length; // Don't memoize this
  
  return <div>{filteredItems.length}</div>;
};
```

**When to use useMemo:**
- Expensive computations (filtering large arrays, complex transformations)
- Avoiding object recreation in dependency arrays
- Component-specific calculations

---

### Using useCallback

```typescript
const Component = ({ onAction }) => {
  // ✅ Good: Stable callback passed to memoized child
  const handleClick = useCallback(() => {
    onAction();
  }, [onAction]);

  return <ChildComponent onClick={handleClick} />;
};
```

**When to use useCallback:**
- Passing callbacks to memoized children
- Stable function references for useEffect dependencies
- Optimizing expensive event handlers

---

## 🔍 Component Audit

### Currently Memoized Components

#### ✅ ItemsPage
- **Status:** Memoized
- **Reason:** Page component, stable props from store
- **Pattern:** Container with memoization

#### ✅ ItemsHeader
- **Status:** Memoized  
- **Reason:** Header with stable props, used in main content area
- **Pattern:** Component with multiple props

#### ✅ SearchBar
- **Status:** Memoized
- **Reason:** Controlled input, re-renders on every keystroke
- **Pattern:** List item/Form component

#### ✅ DataTable Components
- **Status:** Some memoized
- **Reason:** Performance critical for large datasets
- **Pattern:** Data-heavy components

---

## ⚠️ Anti-Patterns to Avoid

### 1. Over-Memoization
```typescript
// ❌ Don't memoize every single component
const SimpleButton = memo(({ label }) => <button>{label}</button>);
```

### 2. Memoization Without Comparison
```typescript
// ❌ Memo doesn't help if props are always new
const Component = memo(({ data }) => {
  return <div>{data.map(item => item.name)}</div>;
});
```

### 3. Using Both useMemo and React.memo
```typescript
// ❌ Don't double-memoize unnecessarily
const Component = memo(() => {
  const computed = useMemo(() => value * 2, [value]); // Already memoized
  return <div>{computed}</div>;
});
```

---

## 📊 Performance Monitoring

### How to Measure Impact

1. **React DevTools Profiler**
   - Measure render times
   - Count re-render frequency
   - Identify expensive operations

2. **Performance Metrics**
   - Time to Interactive (TTI)
   - First Contentful Paint (FCP)
   - Total Blocking Time (TBT)

3. **Code Analysis**
   - Check bundle size impact
   - Monitor memory usage
   - Track callback dependencies

---

## 🎓 Best Practices

### 1. Start Without Memoization
- Build the component first
- Measure performance
- Memoize only if needed

### 2. Use Specific Selectors
```typescript
// ✅ Good: Specific selector
const items = useItemsStore(state => state.items);

// ❌ Bad: Entire store
const store = useItemsStore();
```

### 3. Memoize Expensive Operations
- Array filtering with large datasets
- Complex calculations
- Object transformations

### 4. Keep Dependencies Minimal
```typescript
// ✅ Good: Minimal dependencies
const filtered = useMemo(() => items.filter(i => i.active), [items]);

// ❌ Bad: Unnecessary dependencies
const filtered = useMemo(() => items.filter(i => i.active), [items, other]);
```

---

## 📚 Examples

### Example 1: Memoized Table Row
```typescript
interface DataTableRowProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const DataTableRow = memo<DataTableRowProps>(({ item, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => onEdit(item), [item, onEdit]);
  const handleDelete = useCallback(() => onDelete(item), [item, onDelete]);

  return (
    <tr>
      <td>{item.name}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
});

DataTableRow.displayName = 'DataTableRow';
export default DataTableRow;
```

### Example 2: Memoized Header Component
```typescript
interface ItemsHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCount: number;
  onBulkDelete: () => void;
}

export const ItemsHeader = memo<ItemsHeaderProps>(({
  searchTerm,
  onSearchChange,
  selectedCount,
  onBulkDelete,
}) => {
  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
      {selectedCount > 0 && (
        <BulkActionsButton count={selectedCount} onClick={onBulkDelete} />
      )}
    </div>
  );
});

ItemsHeader.displayName = 'ItemsHeader';
export default ItemsHeader;
```

---

## ✅ Checklist for New Components

When creating a new component, ask:

- [ ] Is this component used in a list?
- [ ] Does this component receive stable props from a parent?
- [ ] Does this component perform expensive operations?
- [ ] Does this component have many dependencies that change frequently?
- [ ] Would memoization improve performance measurably?

**If 2+ answers are YES → Consider memoization**

---

## 🔄 Review Process

**When to review memoization strategy:**

1. Performance regression detected
2. New components added
3. Component refactoring
4. Quarterly performance audit

**Review checklist:**
- [ ] Check React DevTools profiler
- [ ] Review memoized components
- [ ] Identify unnecessary memoization
- [ ] Document findings

---

## 📝 Summary

**Memoization should be:**
- ✅ Strategic and measured
- ✅ Based on performance data
- ✅ Documented with rationale
- ✅ Reviewed regularly

**Memoization should NOT be:**
- ❌ Applied to every component
- ❌ Used without measuring impact
- ❌ A replacement for proper code design
- ❌ An excuse for poor architecture

---

## 📞 Questions?

If you're unsure whether to memoize:
1. Build the component first
2. Measure performance
3. Apply memoization if needed
4. Document your decision

---

**Document maintained by:** Development Team  
**Last reviewed:** December 2024


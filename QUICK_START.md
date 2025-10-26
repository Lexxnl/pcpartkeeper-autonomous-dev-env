# 🚀 PageHeader Quick Start Guide

## Basic Usage

### Simple PageHeader

```jsx
import PageHeader from './components/PageHeader';

<PageHeader>
  <div className='px-5 py-5'>
    <PageHeader.TitleArea>
      <PageHeader.Title as='h1'>My Page</PageHeader.Title>
    </PageHeader.TitleArea>
    <PageHeader.Description>Welcome to my page</PageHeader.Description>
  </div>
</PageHeader>;
```

### With Actions

```jsx
<PageHeader>
  <div className='px-5 py-5'>
    <div className='flex items-center justify-between'>
      <PageHeader.TitleArea variant='large'>
        <PageHeader.Title as='h1'>Dashboard</PageHeader.Title>
      </PageHeader.TitleArea>

      <PageHeader.Actions spacing='normal'>
        <Button variant='default'>Save Draft</Button>
        <Button variant='primary'>Publish</Button>
      </PageHeader.Actions>
    </div>
  </div>
</PageHeader>
```

### With Navigation

```jsx
<PageHeader>
  <div className='px-5 py-5'>
    <PageHeader.TitleArea>
      <PageHeader.Title as='h1'>Project</PageHeader.Title>
    </PageHeader.TitleArea>

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

### With Context & Parent Link

```jsx
<PageHeader>
  <div className='px-5 py-5'>
    <PageHeader.ContextArea>
      <PageHeader.ContextBar>
        <PageHeader.ParentLink href='/dashboard'>
          ← Back to Dashboard
        </PageHeader.ParentLink>
        <PageHeader.ContextAreaActions>
          <Button variant='invisible'>Settings</Button>
        </PageHeader.ContextAreaActions>
      </PageHeader.ContextBar>
    </PageHeader.ContextArea>

    <PageHeader.TitleArea>
      <PageHeader.Title as='h1'>Project Details</PageHeader.Title>
    </PageHeader.TitleArea>
  </div>
</PageHeader>
```

### Complete Example

```jsx
<PageHeader role='banner' aria-label='Project Page' hasBorder>
  <div className='px-5 py-5'>
    {/* Context bar with parent link */}
    <PageHeader.ContextArea>
      <PageHeader.ContextBar>
        <PageHeader.ParentLink href='/projects'>
          ← All Projects
        </PageHeader.ParentLink>
        <PageHeader.ContextAreaActions>
          <Button variant='invisible' size='small'>
            ⚙️ Settings
          </Button>
          <Button variant='invisible' size='small'>
            ⭐ Star
          </Button>
        </PageHeader.ContextAreaActions>
      </PageHeader.ContextBar>
    </PageHeader.ContextArea>

    {/* Title area with visuals and actions */}
    <div className='flex items-center justify-between mt-3'>
      <PageHeader.TitleArea variant='large'>
        <PageHeader.LeadingVisual size='md'>
          <div className='w-8 h-8 bg-accent-tertiary bg-opacity-20 rounded-full flex items-center justify-center'>
            📦
          </div>
        </PageHeader.LeadingVisual>
        <PageHeader.Title as='h1'>My Awesome Project</PageHeader.Title>
        <PageHeader.TrailingVisual size='sm'>
          <span className='bg-success-primary bg-opacity-20 text-success-primary text-xs px-2 py-1 rounded-full'>
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
      A comprehensive project management dashboard with real-time updates and
      team collaboration features.
    </PageHeader.Description>

    {/* Navigation tabs */}
    <PageHeader.Navigation>
      <UnderlineNav aria-label='Project sections'>
        <UnderlineNav.Item href='#overview' aria-current='page'>
          Overview
        </UnderlineNav.Item>
        <UnderlineNav.Item href='#tasks'>Tasks</UnderlineNav.Item>
        <UnderlineNav.Item href='#team'>Team</UnderlineNav.Item>
        <UnderlineNav.Item href='#settings'>Settings</UnderlineNav.Item>
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

## Component Props

### PageHeader

- `role`: `'banner' | 'header'` (default: `'banner'`)
- `hasBorder`: `boolean` (default: `true`)
- `aria-label`: `string`
- `className`: `string`

### TitleArea

- `variant`: `'subtitle' | 'medium' | 'large'` (default: `'medium'`)
- `hidden`: `boolean`
- `className`: `string`

### Title

- `as`: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` (default: `'h2'`)
- `variant`: `'default' | 'transparent'`
- `className`: `string`

### Description

- `variant`: `'default' | 'transparent'`
- `className`: `string`

### Actions

- `direction`: `'horizontal' | 'vertical'` (default: `'horizontal'`)
- `spacing`: `'tight' | 'normal' | 'loose'` (default: `'normal'`)
- `className`: `string`

### LeadingVisual / TrailingVisual

- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `className`: `string`

### ParentLink

- `href`: `string` (required)
- `external`: `boolean` (default: `false`)
- `className`: `string`

## Importing

### Default Import (Compound Component)

```jsx
import PageHeader from './components/PageHeader';

<PageHeader>
  <PageHeader.TitleArea>
    <PageHeader.Title>Title</PageHeader.Title>
  </PageHeader.TitleArea>
</PageHeader>;
```

### Named Imports

```jsx
import {
  PageHeader,
  TitleArea,
  Title,
  Description,
} from './components/PageHeader';

<PageHeader>
  <TitleArea>
    <Title>Title</Title>
    <Description>Description</Description>
  </TitleArea>
</PageHeader>;
```

### Lazy Loading

```jsx
import React, { Suspense } from 'react';
import { TitleArea, Title } from './components/PageHeader/PageHeader.lazy';

<Suspense fallback={<div>Loading...</div>}>
  <TitleArea>
    <Title>Lazy Loaded Title</Title>
  </TitleArea>
</Suspense>;
```

## Tips & Best Practices

1. **Always provide aria-label** for the main PageHeader component for accessibility
2. **Use semantic heading levels** - typically `h1` for main page titles
3. **Keep actions concise** - 3-4 primary actions maximum
4. **Leverage variants** - Use `variant` props to control visual hierarchy
5. **Responsive design** - Wrap PageHeader children in responsive containers
6. **Consistent spacing** - Use the built-in spacing props rather than custom margins

## Common Patterns

### Page with back button

```jsx
<PageHeader>
  <div className='px-5 py-5'>
    <PageHeader.ContextArea>
      <PageHeader.ParentLink href='/back'>← Back</PageHeader.ParentLink>
    </PageHeader.ContextArea>
    <PageHeader.TitleArea>
      <PageHeader.Title as='h1'>Detail Page</PageHeader.Title>
    </PageHeader.TitleArea>
  </div>
</PageHeader>
```

### Page with status badge

```jsx
<PageHeader>
  <div className='px-5 py-5'>
    <PageHeader.TitleArea variant='large'>
      <PageHeader.Title as='h1'>Project Name</PageHeader.Title>
      <PageHeader.TrailingVisual>
        <span className='px-2 py-1 text-xs rounded-full bg-success-primary bg-opacity-20 text-success-primary'>
          Live
        </span>
      </PageHeader.TrailingVisual>
    </PageHeader.TitleArea>
  </div>
</PageHeader>
```

### Page with icon

```jsx
<PageHeader>
  <div className='px-5 py-5'>
    <PageHeader.TitleArea variant='large'>
      <PageHeader.LeadingVisual size='lg'>
        <ProjectIcon className='w-10 h-10' />
      </PageHeader.LeadingVisual>
      <PageHeader.Title as='h1'>Project Dashboard</PageHeader.Title>
    </PageHeader.TitleArea>
  </div>
</PageHeader>
```

## Troubleshooting

### Import errors

- Make sure you're importing from `'./components/PageHeader'` not `'./components/PageHeader.jsx'`
- Use default import for compound component: `import PageHeader from '...'`

### Styling issues

- The PageHeader uses Tailwind CSS - ensure your `tailwind.config.js` is configured correctly
- Check that `src/index.css` includes Tailwind directives

### TypeScript errors

- Ensure `tsconfig.json` has the correct path mappings
- Run `npm install` to ensure all type definitions are installed

## Need Help?

- Check `src/components/PageHeader/README.md` for detailed documentation
- View Storybook stories: `npm run storybook`
- Run tests to see examples: `npm test`

---

**Enjoy building with the new PageHeader system! 🎉**

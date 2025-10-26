# DataTable Compact Styling Update

## Summary
Made **all DataTable variants** use the same compact visual density as the Compact variant, ensuring consistent row height, padding, and typography across all table types.

## Changes Made

### 1. **CSS Defaults (src/index.css)**
- Changed `.data-table-cell` default styling to compact:
  - `px-6 py-4` → `px-3 py-2`
  - `text-sm` → `text-xs`
- Changed `.data-table-header-cell` default styling to compact:
  - `px-6 py-3` → `px-3 py-2`
  - Already `text-xs` (no change)

### 2. **Component Defaults (src/components/DataTable/DataTable.tsx)**
- `cellPadding`: `'normal'` → `'condensed'`
- `compact`: `false` → `true`

### 3. **Constants (src/components/DataTable/constants.ts)**
- Updated `DEFAULT_CELL_PADDING` to `'condensed'`
- Updated `CELL_PADDING` mapping:
  - `condensed`: `px-3 py-2`
  - `normal`: `px-3 py-2` (same as condensed)
  - `spacious`: `px-6 py-4`

### 4. **All Story Variants (src/components/DataTable/stories/DataTable.stories.tsx)**
Added `compact: true` and `cellPadding: 'condensed'` to:
- ✅ Default
- ✅ WithPagination
- ✅ WithSelection
- ✅ Bordered
- ✅ Compact (kept as-is, added visual consistency)
- ✅ Loading
- ✅ Empty
- ✅ Error
- ✅ WithStickyHeader
- ✅ Responsive

### 5. **Spacious Variant**
- Only the Spacious variant explicitly uses `compact: false` and `cellPadding: 'spacious'`
- This provides the optional spacious layout for special use cases

## Visual Result
**All DataTable variants now share the same compact density:**
- **Cell padding**: `px-3 py-2` (50% reduction)
- **Font size**: `text-xs`
- **Row height**: Consistent compact height
- **Header padding**: `px-3 py-2`
- **Typography**: Uniform across all tables

## Functional Preservation
All variants retain their unique features:
- ✅ Selection checkboxes still work
- ✅ Borders still display in Bordered variant
- ✅ Striped rows still alternate
- ✅ Pagination, sorting, filtering all functional
- ✅ Responsive behavior unchanged
- ✅ Sticky headers work correctly

## Usage
All DataTables now default to compact styling. To use spacious layout:

```tsx
<DataTable 
  compact={false}
  cellPadding="spacious"
  data={data}
  columns={columns}
>
  {/* Table content */}
</DataTable>
```


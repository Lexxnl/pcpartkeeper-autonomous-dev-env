import { ListIcon, BeakerIcon } from '../components/icons';
import React from 'react';

/**
 * Navigation item configuration for the application
 */
export interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  page: 'items' | 'testing' | 'datatable';
}

/**
 * Navigation items for the main application navigation
 * 
 * This configuration makes the navigation data-driven, allowing for easy
 * addition, removal, or reordering of navigation items.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'items',
    label: 'Items Page',
    shortLabel: 'Items',
    icon: ListIcon,
    page: 'items',
  },
  {
    id: 'testing',
    label: 'Testing Page',
    shortLabel: 'Testing',
    icon: BeakerIcon,
    page: 'testing',
  },
  {
    id: 'datatable',
    label: 'DataTable Test',
    shortLabel: 'DataTable',
    icon: ListIcon,
    page: 'datatable',
  },
];


/**
 * Global store type definitions
 *
 * Centralized type definitions for the Zustand store slices
 * providing type safety across the application.
 */

// ============================================================================
// ITEM TYPES
// ============================================================================

export interface Item {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  quantity: number;
  inStock: boolean;
  dateAdded: string;
  rating: number;
}

export interface CreateItemRequest {
  name: string;
  category: string;
  brand: string;
  price: number;
  quantity: number;
  inStock: boolean;
  rating: number;
}

export interface UpdateItemRequest extends Partial<CreateItemRequest> {
  id: number;
}

export interface ItemFilters {
  category: string;
  brand: string;
  priceRange: { min: string; max: string };
  inStock: boolean | null;
  rating: number | null;
  searchTerm: string;
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface UIState {
  // Navigation
  currentPage: 'items' | 'testing' | 'datatable';

  // Items page state
  showFilters: boolean;
  selectedItems: number[];

  // Modal states
  modals: {
    addItem: boolean;
    editItem: boolean;
    deleteItem: boolean;
    bulkDelete: boolean;
  };

  // Loading states
  loading: {
    items: boolean;
    addItem: boolean;
    updateItem: boolean;
    deleteItem: boolean;
    bulkDelete: boolean;
  };

  // Error states
  errors: {
    items: string | null;
    addItem: string | null;
    updateItem: string | null;
    deleteItem: string | null;
    bulkDelete: string | null;
  };

  // Notifications
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  duration?: number; // Auto-dismiss after this many ms
}

// ============================================================================
// USER STATE TYPES
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  lastLogin: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  itemsPerPage: number;
  defaultFilters: Partial<ItemFilters>;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// ============================================================================
// API TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
  timestamp: number;
}

// ============================================================================
// STORE SLICE TYPES
// ============================================================================

export interface ItemsSlice {
  // State
  items: Item[];
  filters: ItemFilters;
  sortConfig: SortConfig | null;

  // Actions
  setItems: (items: Item[]) => void;
  addItem: (item: CreateItemRequest) => Promise<void>;
  updateItem: (item: UpdateItemRequest) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  deleteItems: (ids: number[]) => Promise<void>;
  setFilters: (filters: Partial<ItemFilters>) => void;
  setSortConfig: (config: SortConfig | null) => void;
  clearFilters: () => void;

  // Selectors
  getFilteredItems: () => Item[];
  getItemById: (id: number) => Item | undefined;
  getItemsByCategory: (category: string) => Item[];
  getItemsByBrand: (brand: string) => Item[];
}

export interface UISlice {
  // State
  currentPage: UIState['currentPage'];
  showFilters: boolean;
  selectedItems: number[];
  modals: UIState['modals'];
  loading: UIState['loading'];
  errors: UIState['errors'];
  notifications: Notification[];

  // Actions
  setCurrentPage: (page: UIState['currentPage']) => void;
  setShowFilters: (show: boolean) => void;
  setSelectedItems: (items: number[]) => void;
  toggleItemSelection: (id: number) => void;
  selectAllItems: (itemIds: number[]) => void;
  clearSelection: () => void;

  // Modal actions
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;

  // Loading actions
  setLoading: (key: keyof UIState['loading'], loading: boolean) => void;
  setError: (key: keyof UIState['errors'], error: string | null) => void;
  clearErrors: () => void;

  // Notification actions
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export interface UserSlice {
  // State
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// ============================================================================
// STORE TYPE
// ============================================================================

export interface AppStore extends ItemsSlice, UISlice, UserSlice {}

// ============================================================================
// SELECTOR TYPES
// ============================================================================

export type StoreSelector<T> = (state: AppStore) => T;

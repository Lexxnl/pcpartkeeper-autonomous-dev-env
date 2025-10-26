/**
 * Centralized API Service
 *
 * Provides a unified interface for all API calls with proper error handling,
 * request/response transformation, and caching capabilities.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  Item,
  CreateItemRequest,
  UpdateItemRequest,
  ApiResponse,
  PaginatedResponse,
  ApiError,
  User,
  UserPreferences,
} from '../store/types';
import { logger } from '../utils/logger';

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000; // 10 seconds
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// ============================================================================
// CACHE INTERFACE
// ============================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, duration: number = CACHE_DURATION): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + duration,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

// ============================================================================
// API CLIENT
// ============================================================================

class ApiClient {
  private client: AxiosInstance;
  private cache: ApiCache;

  constructor() {
    this.cache = new ApiCache();
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        config.metadata = { startTime: Date.now() };

        return config;
      },
      error => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      response => {
        // Log response time
        const duration = Date.now() - response.config.metadata?.startTime;

        return response;
      },
      error => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'Server error occurred',
        code: error.response.data?.code || 'SERVER_ERROR',
        details: error.response.data?.details,
        timestamp: Date.now(),
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR',
        timestamp: Date.now(),
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
        timestamp: Date.now(),
      };
    }
  }

  // ========================================================================
  // HTTP METHODS
  // ========================================================================

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    useCache = true
  ): Promise<T> {
    const cacheKey = `GET:${url}:${JSON.stringify(config?.params || {})}`;

    if (useCache) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) return cached;
    }

    const response: AxiosResponse<ApiResponse<T>> = await this.client.get(
      url,
      config
    );

    if (useCache) {
      this.cache.set(cacheKey, response.data.data);
    }

    return response.data.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.post(
      url,
      data,
      config
    );
    return response.data.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.put(
      url,
      data,
      config
    );
    return response.data.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.patch(
      url,
      data,
      config
    );
    return response.data.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(
      url,
      config
    );
    return response.data.data;
  }

  // ========================================================================
  // CACHE MANAGEMENT
  // ========================================================================

  clearCache(): void {
    this.cache.clear();
  }

  invalidateCache(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    for (const key of this.cache['cache'].keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

// ============================================================================
// API SERVICE
// ============================================================================

const apiClient = new ApiClient();

export const apiService = {
  // ========================================================================
  // ITEMS API
  // ========================================================================

  items: {
    async getAll(filters?: any, signal?: AbortSignal): Promise<Item[]> {
      try {
        // For now, return mock data
        // In a real app, this would be: return apiClient.get<Item[]>('/items', { params: filters, signal });
        if (signal?.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        return generateMockItems();
      } catch (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        logger.error('Failed to fetch items:', error);
        throw error;
      }
    },

    async getById(id: number, signal?: AbortSignal): Promise<Item> {
      try {
        // For now, return mock data
        // In a real app, this would be: return apiClient.get<Item>(`/items/${id}`, { signal });
        if (signal?.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        const items = generateMockItems();
        const item = items.find(i => i.id === id);
        if (!item) throw new Error('Item not found');
        return item;
      } catch (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        logger.error(`Failed to fetch item ${id}:`, error);
        throw error;
      }
    },

    async create(data: CreateItemRequest, signal?: AbortSignal): Promise<Item> {
      try {
        // For now, return mock data
        // In a real app, this would be: return apiClient.post<Item>('/items', data, { signal });
        if (signal?.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        const newItem: Item = {
          id: Date.now(), // Mock ID generation
          ...data,
          dateAdded: new Date().toISOString().split('T')[0],
        };

        // Simulate network delay
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 500);
          if (signal) {
            signal.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new DOMException('Request aborted', 'AbortError'));
            });
          }
        });

        return newItem;
      } catch (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        logger.error('Failed to create item:', error);
        throw error;
      }
    },

    async update(data: UpdateItemRequest, signal?: AbortSignal): Promise<Item> {
      try {
        // For now, return mock data
        // In a real app, this would be: return apiClient.put<Item>(`/items/${data.id}`, data, { signal });
        if (signal?.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        const updatedItem: Item = {
          id: data.id,
          name: data.name || 'Updated Item',
          category: data.category || 'Updated Category',
          brand: data.brand || 'Updated Brand',
          price: data.price || 0,
          quantity: data.quantity || 0,
          inStock: data.inStock ?? true,
          dateAdded: new Date().toISOString().split('T')[0],
          rating: data.rating || 1,
        };

        // Simulate network delay
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 500);
          if (signal) {
            signal.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new DOMException('Request aborted', 'AbortError'));
            });
          }
        });

        return updatedItem;
      } catch (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        logger.error(`Failed to update item ${data.id}:`, error);
        throw error;
      }
    },

    async delete(id: number, signal?: AbortSignal): Promise<void> {
      try {
        // For now, just simulate success
        // In a real app, this would be: return apiClient.delete(`/items/${id}`, { signal });
        if (signal?.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 300);
          if (signal) {
            signal.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new DOMException('Request aborted', 'AbortError'));
            });
          }
        });
      } catch (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        logger.error(`Failed to delete item ${id}:`, error);
        throw error;
      }
    },

    async deleteMany(ids: number[], signal?: AbortSignal): Promise<void> {
      try {
        // For now, just simulate success
        // In a real app, this would be: return apiClient.post('/items/bulk-delete', { ids }, { signal });
        if (signal?.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 500);
          if (signal) {
            signal.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new DOMException('Request aborted', 'AbortError'));
            });
          }
        });
      } catch (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        logger.error(`Failed to delete items ${ids.join(', ')}:`, error);
        throw error;
      }
    },
  },

  // ========================================================================
  // USER API
  // ========================================================================

  user: {
    async getProfile(signal?: AbortSignal): Promise<User> {
      try {
        // For now, return mock user
        // In a real app, this would be: return apiClient.get<User>('/user/profile', { signal });
        if (signal?.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        return {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: 'https://via.placeholder.com/40',
          preferences: {
            theme: 'system',
            language: 'en',
            itemsPerPage: 10,
            defaultFilters: {
              category: '',
              brand: '',
              priceRange: { min: '', max: '' },
              inStock: null,
              rating: null,
              searchTerm: '',
            },
            notifications: {
              email: true,
              push: true,
              inApp: true,
            },
          },
          lastLogin: new Date().toISOString(),
        };
      } catch (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        logger.error('Failed to fetch user profile:', error);
        throw error;
      }
    },

    async updatePreferences(
      preferences: Partial<UserPreferences>,
      signal?: AbortSignal
    ): Promise<User> {
      try {
        // For now, return mock user with updated preferences
        // In a real app, this would be: return apiClient.patch<User>('/user/preferences', preferences, { signal });
        if (signal?.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        const currentUser = await this.getProfile(signal);
        return {
          ...currentUser,
          preferences: { ...currentUser.preferences, ...preferences },
        };
      } catch (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        logger.error('Failed to update user preferences:', error);
        throw error;
      }
    },
  },

  // ========================================================================
  // CACHE MANAGEMENT
  // ========================================================================

  cache: {
    clear: () => apiClient.clearCache(),
    invalidate: (pattern?: string) => apiClient.invalidateCache(pattern),
  },
};

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

const generateMockItems = (): Item[] => {
  const categories = [
    'CPU',
    'GPU',
    'RAM',
    'Storage',
    'Motherboard',
    'PSU',
    'Cooling',
    'Case',
    'Monitor',
    'Keyboard',
    'Mouse',
  ];
  const brands = [
    'Intel',
    'AMD',
    'NVIDIA',
    'Corsair',
    'Samsung',
    'ASUS',
    'MSI',
    'Gigabyte',
    'EVGA',
    'Cooler Master',
    'Fractal Design',
    'NZXT',
    'Logitech',
    'Razer',
    'SteelSeries',
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `${brands[i % brands.length]} ${categories[i % categories.length]} ${
      i + 1
    }`,
    category: categories[i % categories.length],
    brand: brands[i % brands.length],
    price: Math.floor(Math.random() * 2000) + 50,
    quantity: Math.floor(Math.random() * 10) + 1,
    inStock: Math.random() > 0.2,
    dateAdded: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    rating: Math.floor(Math.random() * 5) + 1,
  }));
};

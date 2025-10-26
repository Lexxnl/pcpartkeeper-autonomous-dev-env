/**
 * @file API Service Tests
 * @description Comprehensive unit tests for the API service
 * @version 2.0
 * @author PCPartKeeper Team
 */

import { jest } from '@jest/globals';
import apiService from '../apiService';
import { Item, User } from '../../store/types';

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

describe('API Service', () => {
  describe('Configuration', () => {
    it('has correct base URL', () => {
      expect(apiService.baseURL).toBeDefined();
      expect(typeof apiService.baseURL).toBe('string');
    });

    it('has correct default headers', () => {
      expect(apiService.defaultHeaders).toBeDefined();
      expect(apiService.defaultHeaders['Content-Type']).toBe('application/json');
    });

    it('has correct timeout', () => {
      expect(apiService.timeout).toBeDefined();
      expect(typeof apiService.timeout).toBe('number');
      expect(apiService.timeout).toBeGreaterThan(0);
    });
  });

  describe('HTTP Methods', () => {
    describe('GET requests', () => {
      it('makes successful GET request', async () => {
        const mockData = { id: 1, name: 'Test Item' };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockData,
        });

        const result = await apiService.get('/items/1');

        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/items/1'),
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
          })
        );
        expect(result).toEqual(mockData);
      });

      it('handles GET request with query parameters', async () => {
        const mockData = { items: [], total: 0 };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockData,
        });

        const params = { page: 1, limit: 10, search: 'test' };
        await apiService.get('/items', { params });

        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('page=1&limit=10&search=test'),
          expect.any(Object)
        );
      });

      it('handles GET request with custom headers', async () => {
        const mockData = { id: 1, name: 'Test Item' };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockData,
        });

        const headers = { 'Authorization': 'Bearer token123' };
        await apiService.get('/items/1', { headers });

        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer token123',
            }),
          })
        );
      });
    });

    describe('POST requests', () => {
      it('makes successful POST request', async () => {
        const mockData = { id: 1, name: 'New Item' };
        const requestData = { name: 'New Item', category: 'Test' };
        
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 201,
          json: async () => mockData,
        });

        const result = await apiService.post('/items', requestData);

        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/items'),
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify(requestData),
          })
        );
        expect(result).toEqual(mockData);
      });

      it('handles POST request with empty body', async () => {
        const mockData = { success: true };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockData,
        });

        await apiService.post('/items/clear');

        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/items/clear'),
          expect.objectContaining({
            method: 'POST',
            body: undefined,
          })
        );
      });
    });

    describe('PUT requests', () => {
      it('makes successful PUT request', async () => {
        const mockData = { id: 1, name: 'Updated Item' };
        const requestData = { name: 'Updated Item', category: 'Test' };
        
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockData,
        });

        const result = await apiService.put('/items/1', requestData);

        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/items/1'),
          expect.objectContaining({
            method: 'PUT',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify(requestData),
          })
        );
        expect(result).toEqual(mockData);
      });
    });

    describe('DELETE requests', () => {
      it('makes successful DELETE request', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 204,
          json: async () => ({}),
        });

        await apiService.delete('/items/1');

        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/items/1'),
          expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
          })
        );
      });
    });
  });

  describe('Error Handling', () => {
    it('handles network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(apiService.get('/items')).rejects.toThrow('Network error');
    });

    it('handles HTTP error responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Item not found' }),
      });

      await expect(apiService.get('/items/999')).rejects.toThrow('HTTP error! status: 404');
    });

    it('handles timeout errors', async () => {
      // Mock a slow response
      (global.fetch as jest.Mock).mockImplementationOnce(
        () => new Promise(resolve => setTimeout(resolve, apiService.timeout + 1000))
      );

      await expect(apiService.get('/items')).rejects.toThrow('Request timeout');
    });

    it('handles JSON parsing errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => { throw new Error('Invalid JSON'); },
      });

      await expect(apiService.get('/items')).rejects.toThrow('Invalid JSON');
    });

    it('handles empty responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: async () => null,
      });

      const result = await apiService.delete('/items/1');
      expect(result).toBeNull();
    });
  });

  describe('Request Interceptors', () => {
    it('applies request interceptors', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      // Add a request interceptor
      const interceptor = jest.fn((config) => {
        config.headers = { ...config.headers, 'X-Custom-Header': 'test' };
        return config;
      });
      apiService.addRequestInterceptor(interceptor);

      await apiService.get('/items/1');

      expect(interceptor).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom-Header': 'test',
          }),
        })
      );
    });

    it('handles request interceptor errors', async () => {
      const interceptor = jest.fn(() => {
        throw new Error('Interceptor error');
      });
      apiService.addRequestInterceptor(interceptor);

      await expect(apiService.get('/items')).rejects.toThrow('Interceptor error');
    });
  });

  describe('Response Interceptors', () => {
    it('applies response interceptors', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      // Add a response interceptor
      const interceptor = jest.fn((response) => {
        response.data = { ...response.data, processed: true };
        return response;
      });
      apiService.addResponseInterceptor(interceptor);

      const result = await apiService.get('/items/1');

      expect(interceptor).toHaveBeenCalled();
      expect(result).toEqual({ ...mockData, processed: true });
    });

    it('handles response interceptor errors', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const interceptor = jest.fn(() => {
        throw new Error('Response interceptor error');
      });
      apiService.addResponseInterceptor(interceptor);

      await expect(apiService.get('/items/1')).rejects.toThrow('Response interceptor error');
    });
  });

  describe('Authentication', () => {
    it('includes authentication token in requests', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      apiService.setAuthToken('token123');
      await apiService.get('/items/1');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer token123',
          }),
        })
      );
    });

    it('removes authentication token', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      apiService.setAuthToken('token123');
      apiService.clearAuthToken();
      await apiService.get('/items/1');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Authorization': expect.any(String),
          }),
        })
      );
    });
  });

  describe('Retry Logic', () => {
    it('retries failed requests', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      
      (global.fetch as jest.Mock)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockData,
        });

      const result = await apiService.get('/items/1', { retries: 2 });

      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(result).toEqual(mockData);
    });

    it('fails after max retries', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(apiService.get('/items/1', { retries: 2 })).rejects.toThrow('Network error');
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    it('does not retry on client errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: 'Invalid request' }),
      });

      await expect(apiService.get('/items/1', { retries: 2 })).rejects.toThrow('HTTP error! status: 400');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Caching', () => {
    it('caches GET requests', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      // First request
      const result1 = await apiService.get('/items/1', { cache: true });
      
      // Second request should use cache
      const result2 = await apiService.get('/items/1', { cache: true });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(result1).toEqual(mockData);
      expect(result2).toEqual(mockData);
    });

    it('bypasses cache when disabled', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      await apiService.get('/items/1', { cache: false });
      await apiService.get('/items/1', { cache: false });

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('clears cache', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      await apiService.get('/items/1', { cache: true });
      apiService.clearCache();
      await apiService.get('/items/1', { cache: true });

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('Request Cancellation', () => {
    it('cancels requests', async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      (global.fetch as jest.Mock).mockImplementationOnce(
        (url, options) => new Promise((resolve, reject) => {
          signal.addEventListener('abort', () => {
            reject(new Error('Request cancelled'));
          });
        })
      );

      const request = apiService.get('/items/1', { signal });
      controller.abort();

      await expect(request).rejects.toThrow('Request cancelled');
    });

    it('handles cancelled requests gracefully', async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      (global.fetch as jest.Mock).mockImplementationOnce(
        (url, options) => new Promise((resolve, reject) => {
          signal.addEventListener('abort', () => {
            reject(new Error('Request cancelled'));
          });
        })
      );

      controller.abort();

      await expect(apiService.get('/items/1', { signal })).rejects.toThrow('Request cancelled');
    });
  });

  describe('Performance', () => {
    it('handles concurrent requests efficiently', async () => {
      const mockData = { id: 1, name: 'Test Item' };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const startTime = performance.now();
      
      const requests = Array.from({ length: 10 }, (_, i) => 
        apiService.get(`/items/${i + 1}`)
      );
      
      await Promise.all(requests);
      
      const endTime = performance.now();

      expect(global.fetch).toHaveBeenCalledTimes(10);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('handles large responses efficiently', async () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        category: 'Test',
        brand: 'Test Brand',
        price: Math.random() * 1000,
        quantity: Math.floor(Math.random() * 10),
        rating: Math.random() * 5,
        dateAdded: '2024-01-01',
        inStock: Math.random() > 0.5,
      }));

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => largeData,
      });

      const startTime = performance.now();
      const result = await apiService.get('/items');
      const endTime = performance.now();

      expect(result).toEqual(largeData);
      expect(endTime - startTime).toBeLessThan(500); // Should complete within 500ms
    });
  });

  describe('Edge Cases', () => {
    it('handles empty URLs', async () => {
      await expect(apiService.get('')).rejects.toThrow();
    });

    it('handles malformed URLs', async () => {
      await expect(apiService.get('not-a-url')).rejects.toThrow();
    });

    it('handles null/undefined data', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => null,
      });

      const result = await apiService.get('/items');
      expect(result).toBeNull();
    });

    it('handles circular references in data', async () => {
      const circularData: any = { id: 1, name: 'Test' };
      circularData.self = circularData;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => circularData,
      });

      await expect(apiService.get('/items')).rejects.toThrow();
    });
  });
});

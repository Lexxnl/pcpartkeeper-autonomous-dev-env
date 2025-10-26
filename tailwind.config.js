/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic Background Colors
        surface: {
          page: '#010409', // Main page background
          primary: '#0d1117', // Primary surface (cards, modals)
          secondary: '#161b22', // Secondary surface (nested elements)
          tertiary: '#212830', // Tertiary surface (buttons, inputs)
          hover: '#262c36', // Hover state for surfaces
          active: '#2a313c', // Active/pressed state
        },

        // Semantic Border Colors
        border: {
          default: '#3d444d', // Default border color
          subtle: '#21262d', // Subtle borders
          muted: '#30363d', // Muted borders
          emphasis: '#6e7681', // Emphasized borders
        },

        // Semantic Text Colors
        text: {
          primary: '#ffffff', // Primary text (headings, important content)
          secondary: '#e6edf3', // Secondary text (body text)
          muted: '#9198a1', // Muted text (less important)
          placeholder: '#6e7681', // Placeholder text
          disabled: '#484f58', // Disabled state text
          inverse: '#0d1117', // Text on light backgrounds
        },

        // Semantic Action Colors
        action: {
          primary: '#238636', // Primary action (success, confirm)
          'primary-hover': '#29903b', // Primary action hover
          'primary-active': '#2e9a40', // Primary action active
          danger: '#da3633', // Danger action (delete, remove)
          'danger-hover': '#e5534b', // Danger action hover
          'danger-muted': '#b62324', // Danger action muted state
        },

        // Semantic Accent Colors
        accent: {
          primary: '#3b82f6', // Primary accent (links, focus states)
          'primary-emphasis': '#2563eb', // Emphasized primary accent
          secondary: '#f59e0b', // Secondary accent (warnings, highlights)
          tertiary: '#8b5cf6', // Tertiary accent (optional highlights)
        },

        // Component-Specific: Badges
        badge: {
          bg: '#2d333b', // Badge background
          text: '#9198a1', // Badge text
          'emphasis-bg': '#388bfd', // Emphasized badge background
          'emphasis-text': '#ffffff', // Emphasized badge text
        },

        // Component-Specific: Navigation
        nav: {
          active: '#3b82f6', // Active navigation item
          'active-border': '#f59e0b', // Active navigation border (orange accent)
          inactive: '#9198a1', // Inactive navigation item
          'inactive-hover': '#e6edf3', // Inactive hover state
        },

        // Status Colors - Semantic status indicators
        status: {
          success: '#22c55e', // Success state (green-500)
          'success-light': '#dcfce7', // Success background (green-50)
          'success-dark': '#16a34a', // Success dark variant (green-600)
          warning: '#eab308', // Warning state (yellow-500)
          'warning-light': '#fef3c7', // Warning background (yellow-50)
          'warning-dark': '#ca8a04', // Warning dark variant (yellow-600)
          error: '#ef4444', // Error state (red-500)
          'error-light': '#fef2f2', // Error background (red-50)
          'error-dark': '#dc2626', // Error dark variant (red-600)
          info: '#3b82f6', // Info state (blue-500)
          'info-light': '#eff6ff', // Info background (blue-50)
          'info-dark': '#2563eb', // Info dark variant (blue-600)
        },

        // Interactive States - Enhanced hover/focus states
        interactive: {
          'hover-bg': '#262c36', // Hover background
          'active-bg': '#2a313c', // Active/pressed background
          'focus-ring': '#3b82f6', // Focus ring color
          'focus-ring-offset': '#0d1117', // Focus ring offset
        },
      },

      // Semantic Spacing (for consistent layouts)
      spacing: {
        // Component-specific spacing
        'component-xs': '0.25rem', // 4px - Micro spacing
        'component-sm': '0.5rem', // 8px - Small spacing
        'component-md': '0.75rem', // 12px - Medium spacing
        'component-lg': '1rem', // 16px - Large spacing
        'component-xl': '1.5rem', // 24px - Extra large spacing
        'component-2xl': '2rem', // 32px - 2X large spacing
        
        // Layout spacing
        'layout-xs': '0.5rem', // 8px - Layout micro spacing
        'layout-sm': '1rem', // 16px - Layout small spacing
        'layout-md': '1.5rem', // 24px - Layout medium spacing
        'layout-lg': '2rem', // 32px - Layout large spacing
        'layout-xl': '3rem', // 48px - Layout extra large spacing
        'layout-2xl': '4rem', // 64px - Layout 2X large spacing
        
        // Container widths
        18: '4.5rem', // 72px - Extra button/input heights
        88: '22rem', // 352px - Medium container widths
        128: '32rem', // 512px - Large container widths
        144: '36rem', // 576px - Extra large container widths
        160: '40rem', // 640px - Max content widths
      },

      // Enhanced breakpoints for better responsive design
      screens: {
        xs: '475px', // Extra small devices
        sm: '640px', // Small devices (default Tailwind)
        md: '768px', // Medium devices (default Tailwind)
        lg: '1024px', // Large devices (default Tailwind)
        xl: '1280px', // Extra large devices (default Tailwind)
        '2xl': '1536px', // 2X large devices (default Tailwind)
      },

      // Container settings for better responsive layouts
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },

      // Typography enhancements
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },

      // Custom animations for better UX
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // Enhanced transitions
      transitionDuration: {
        0: '0ms',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },
    },
  },
  plugins: [],
};

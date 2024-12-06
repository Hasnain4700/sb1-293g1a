import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-md font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
            'disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-orange-500 text-white hover:bg-orange-600': variant === 'primary',
              'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
              'border border-orange-500 text-orange-500 hover:bg-orange-50':
                variant === 'outline',
              'h-8 px-3 text-sm': size === 'sm',
              'h-10 px-4': size === 'md',
              'h-12 px-6 text-lg': size === 'lg',
            },
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
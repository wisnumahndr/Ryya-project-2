import * as React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asMotion?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps & HTMLMotionProps<"button">>(
  ({ className, variant = 'primary', size = 'md', asMotion = false, ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-maroon text-white hover:bg-brand-maroon/90 shadow-sm',
      secondary: 'bg-brand-pink text-brand-dark hover:bg-brand-pink/90',
      outline: 'border-2 border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white',
      ghost: 'text-brand-dark hover:bg-brand-pink/20',
      gold: 'bg-brand-rose text-white hover:bg-brand-rose/90 shadow-md',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg font-semibold',
      icon: 'p-2',
    };

    const baseClasses = cn(
      'inline-flex items-center justify-center rounded-md transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-semibold tracking-wide',
      variants[variant],
      sizes[size],
      className
    );

    if (asMotion) {
      return (
        <motion.button
          ref={ref as any}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
          {...(props as any)}
        />
      );
    }

    return <button ref={ref} className={baseClasses} {...props} />;
  }
);

Button.displayName = 'Button';

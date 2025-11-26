import { type VariantProps } from 'class-variance-authority';
declare const buttonVariants: (
  props?:
    | ({
        variant?: 'solid' | 'outline' | 'ghost' | 'link' | null | undefined;
        size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null | undefined;
        colorScheme?: 'brand' | 'success' | 'error' | 'warning' | null | undefined;
      } & import('class-variance-authority/dist/types').ClassProp)
    | undefined
) => string;
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a different component */
  asChild?: boolean;
  /** Show loading spinner */
  isLoading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
}
export declare const Button: import('react').ForwardRefExoticComponent<
  ButtonProps & import('react').RefAttributes<HTMLButtonElement>
>;
export {};
//# sourceMappingURL=Button.d.ts.map

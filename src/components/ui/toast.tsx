import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const toastVariants = cva(
  "relative flex items-center justify-between w-full p-4 pr-8 rounded-md border shadow-md bg-white",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-gray-200",
        destructive: "bg-red-500 text-white border-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={toastVariants({ variant, className })}
      {...props}
    />
  )
);
Toast.displayName = "Toast";

export const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className="font-medium text-sm" {...props} />
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className="text-sm opacity-80" {...props} />
));
ToastDescription.displayName = "ToastDescription";

// Optional ToastProvider if needed
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

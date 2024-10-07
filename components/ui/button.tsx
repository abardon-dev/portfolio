import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "font-mono font-semibold text-xl inline-flex items-center justify-center whitespace-nowrap rounded-full focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground font-black focus-visible:shadow-accent hover:shadow-accent transition-shadow ease-out duration-500",
        secondary:
          "bg-secondary text-secondary-foreground font-black focus-visible:shadow-accent hover:shadow-accent transition-shadow ease-out duration-500",
        link: "text-lg text-primary underline-offset-4 decoration-wavy decoration-accent decoration-1 hover:underline focus:underline"
      },
      size: {
        default: "h-10 px-4 py-3",
        sm: "h-8 px-3 py-2 text-lg",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  //                                                                                                       Tailwind usecase
  {
    variants: {
      variant: {
        // Create your variant with any name and keys
        default: "bg-slate-900 text-white hover:bg-slate-800", // Defualt button variant
        ghost: "bg-transparent hover:text-slate-900 hover:text-slate-200", // Ghost button variant
      },
      size: {
        default: "h-10 py-2 px-4", // py - padding on y-axis, px = padding on x-axis
        sm: "h-9 px-2", // sm - small size
        lg: "h-11 px-8", // lg - large size
      },
    },
    defaultVariants: {
      // Register your default variant created above
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, // All React based button attrib included
    VariantProps<typeof buttonVariants> {
  // Our Variant props
  isLoading?: boolean;
} // Now all attribs will be in shown through IntelliSense

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 w-4 h-4 animate-spinF" /> : null}
      {children}
    </button>
  );
};

export default Button;

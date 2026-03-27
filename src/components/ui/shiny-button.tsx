import * as React from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("shiny-cta", className)}
        {...props}
      >
        <span>{children}</span>
      </button>
    );
  }
);
ShinyButton.displayName = "ShinyButton";

export { ShinyButton };

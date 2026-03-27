import * as React from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ className, style, children, ...props }, ref) => {
    const isSquarish = className?.includes("rounded-lg");
    return (
      <button
        ref={ref}
        className={cn("shiny-cta", className)}
        style={isSquarish ? { "--shiny-cta-radius": "0.5rem", ...style } as React.CSSProperties : style}
        {...props}
      >
        <span>{children}</span>
      </button>
    );
  }
);
ShinyButton.displayName = "ShinyButton";

export { ShinyButton };

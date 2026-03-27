import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ShinyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("shiny-button relative overflow-hidden", className)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <div className="shiny-button__shimmer absolute inset-0 z-[1] pointer-events-none" />
      </Button>
    );
  }
);
ShinyButton.displayName = "ShinyButton";

export { ShinyButton };

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        initial={{ "--x": "100%" } as any}
        animate={{ "--x": "-100%" } as any}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
        }}
        {...(props as any)}
        className={cn(
          "relative cursor-pointer rounded-lg border border-primary/20 bg-primary px-6 py-2 font-medium text-primary-foreground backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20",
          className
        )}
      >
        <span
          className="relative z-10 flex items-center gap-2 h-full w-full text-sm tracking-wide"
          style={{
            maskImage:
              "linear-gradient(-75deg, hsl(var(--primary-foreground)) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), hsl(var(--primary-foreground)) calc(var(--x) + 100%))",
            WebkitMaskImage:
              "linear-gradient(-75deg, hsl(var(--primary-foreground)) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), hsl(var(--primary-foreground)) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor" as any,
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary-foreground)/10%)_calc(var(--x)+20%),hsl(var(--primary-foreground)/50%)_calc(var(--x)+25%),hsl(var(--primary-foreground)/10%)_calc(var(--x)+100%))] p-px"
        />
      </motion.button>
    );
  }
);
ShinyButton.displayName = "ShinyButton";

export { ShinyButton };

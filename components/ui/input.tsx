import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base Styles
          "flex h-10 w-full rounded-none border border-blue/30 bg-zinc-950/50 px-3 py-2 text-sm text-white shadow-sm transition-colors",
          
          // File Input Styles (Standard Practice)
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-50",
          
          // Placeholder
          "placeholder:text-zinc-500",
          
          // Focus State (Brand Blue Ring)
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue",
          
          // Disabled State
          "disabled:cursor-not-allowed disabled:opacity-50",
          
          // Allow Overrides via className prop
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
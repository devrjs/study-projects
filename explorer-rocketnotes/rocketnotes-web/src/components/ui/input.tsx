import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactElement
  containerClass?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon = "", containerClass, ...props }, ref) => {
    return (
      <div className={`w-full relative primaryFocus ${containerClass}`}>
        {leftIcon && (
          <span className="absolute h-full w-12 flex items-center justify-center text-[1.7rem] text-ring">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          className={cn(
            `flex h-12 w-full rounded-md border border-input bg-secondary px-3 py-1 ${
              leftIcon && "pl-12"
            }  text-base shadow-sm transition-colors file:border-0 file:bg-secondary file:text-base file:font-medium placeholder:text-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }


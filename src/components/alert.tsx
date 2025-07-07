import * as React from "react"

interface AlertProps {
  children: React.ReactNode
  className?: string
}

export const Alert = ({ children, className }: AlertProps) => {
  return (
    <div className={`rounded-md border border-yellow-300 bg-yellow-50 p-4 text-yellow-800 ${className || ""}`}>
      {children}
    </div>
  )
}


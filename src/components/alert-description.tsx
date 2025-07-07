import React from "react"

export const AlertDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`text-sm ${className || ""}`}>{children}</div>
}


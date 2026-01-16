"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Simple resizable implementation without external dependency
function ResizablePanelGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function ResizablePanel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      data-slot="resizable-panel" 
      className={cn("flex-1", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function ResizableHandle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  withHandle?: boolean
}) {
  return (
    <div
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden cursor-col-resize hover:bg-primary/20 transition-colors",
        className
      )}
      {...props}
    >
      <GripVerticalIcon className="size-4 opacity-50" />
    </div>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }


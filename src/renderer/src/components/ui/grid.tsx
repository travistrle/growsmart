import * as React from 'react'
import {cn} from '@/lib/utils'

// Define the props to accept children and an optional className
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}
export function Grid({
  children,
  className,
  ...props
}: GridProps): React.ReactElement {
  return (
    <div
      data-slot="grid"
      className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}
// src/components/card-skeleton.tsx

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton(): React.ReactElement {
  return (
    <Card>
      <CardHeader>

        <Skeleton className="h-5 w-3/5" />
    
        <Skeleton className="mt-2 h-4 w-4/5" />
      </CardHeader>
      <CardContent>
    
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  )
}
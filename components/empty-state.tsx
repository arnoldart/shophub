"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  image: string
  title: string
  description: string
  actionText?: string
  actionHref?: string
  onAction?: () => void
}

export default function EmptyState({ image, title, description, actionText, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="relative w-64 h-64 mx-auto mb-6">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain opacity-60" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {actionText && (actionHref || onAction) && (
        <Button onClick={onAction} asChild={!!actionHref}>
          {actionHref ? <a href={actionHref}>{actionText}</a> : <span>{actionText}</span>}
        </Button>
      )}
    </div>
  )
}

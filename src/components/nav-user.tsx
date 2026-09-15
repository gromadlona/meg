"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"
import { Loader2Icon, LogOutIcon, ShieldCheckIcon } from "lucide-react"

export type SidebarUser = {
  name: string
  email: string
  avatar?: string
  role?: string
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function NavUser({ user }: { user: SidebarUser }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function onLogout() {
    if (pending) return
    setPending(true)
    await authClient.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
      <div className="flex items-center gap-2.5">
        <Avatar className="size-9">
          {user.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : null}
          <AvatarFallback className="bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
            {initials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="grid min-w-0 flex-1 text-left leading-tight">
          <span className="truncate text-sm font-medium">{user.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
        {user.role ? (
          <Badge variant="secondary" className="shrink-0 gap-1">
            <ShieldCheckIcon data-icon="inline-start" />
            {user.role}
          </Badge>
        ) : null}
      </div>
      <Separator />
      <Button
        variant="destructive"
        size="sm"
        className="w-full"
        disabled={pending}
        onClick={onLogout}
      >
        {pending ? (
          <Loader2Icon data-icon="inline-start" className="animate-spin" />
        ) : (
          <LogOutIcon data-icon="inline-start" />
        )}
        {pending ? "Keluar…" : "Keluar"}
      </Button>
    </div>
  )
}

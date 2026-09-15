"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  NewspaperIcon,
  Settings2Icon,
  UsersIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Overview", url: "/dashboard", Icon: LayoutDashboardIcon },
  { title: "Posts", url: "/dashboard/posts", Icon: NewspaperIcon },
  { title: "Pengguna", url: "/dashboard/users", Icon: UsersIcon },
  { title: "Pengaturan", url: "/dashboard/settings", Icon: Settings2Icon },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(({ title, url, Icon }) => (
          <SidebarMenuItem key={title}>
            <SidebarMenuButton
              tooltip={title}
              isActive={pathname === url}
              render={<Link href={url} />}
            >
              <Icon />
              <span>{title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

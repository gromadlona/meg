"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { NavMain, type NavMainItem } from "@/components/nav-main";
import {
  NavSecondary,
  type NavSecondaryItem,
} from "@/components/nav-secondary";
import { NavUser, type SidebarUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  FileTextIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  NewspaperIcon,
  Settings2Icon,
  UsersIcon,
} from "lucide-react";

const navMain: NavMainItem[] = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Posts",
    url: "/dashboard/posts",
    icon: <NewspaperIcon />,
  },
  {
    title: "Pengguna",
    url: "/dashboard/users",
    icon: <UsersIcon />,
  },
  {
    title: "Pengaturan",
    url: "/dashboard/settings",
    icon: <Settings2Icon />,
  },
];

const navSecondary: NavSecondaryItem[] = [
  {
    title: "Lihat Situs",
    url: "/",
    icon: <GlobeIcon />,
  },
  {
    title: "Lihat Blog",
    url: "/blog",
    icon: <FileTextIcon />,
  },
];

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: SidebarUser }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <Image
                src="/brand/logo-icon-clear.png"
                alt="Logo MeGGi"
                width={32}
                height={32}
                className="size-8 dark:invert"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">MeGGi.dev</span>
                <span className="truncate text-xs">Admin</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

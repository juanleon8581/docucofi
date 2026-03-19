"use client";

import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import { UserAvatar } from "../../UserAvatar/UserAvatar";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

interface AppSidebarProps {
  groups?: NavGroup[];
  user: { email: string; fullName?: string; avatarUrl?: string };
}

const defaultGroups: NavGroup[] = [
  {
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "#" },
      { icon: FileText, label: "Documents", href: "#" },
      { icon: Users, label: "Users", href: "#" },
      { icon: Settings, label: "Settings", href: "#" },
    ],
  },
];

export function AppSidebar({
  groups = defaultGroups,
  user,
}: Readonly<AppSidebarProps>) {
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      position="absolute"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="h-full"
    >
      <SidebarContent>
        {groups.map((group, index) => (
          <SidebarGroup key={`${group.label}-${index}`}>
            {group.label && (
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            )}
            <SidebarMenu>
              {group.items.map((item, index) => (
                <SidebarMenuItem key={`${item.href}-${index}`}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.label}
                  >
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserAvatar
          email={user.email}
          fullName={user.fullName}
          avatarUrl={user.avatarUrl}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

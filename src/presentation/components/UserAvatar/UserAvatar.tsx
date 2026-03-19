"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import { useLogout } from "@/presentation/hooks/useLogout";

interface Props {
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

function getInitials(fullName?: string, email?: string): string {
  if (fullName) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }
  return email?.[0].toUpperCase() ?? "?";
}

export function UserAvatar({ email, fullName, avatarUrl }: Props) {
  const { logout, isPending } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button data-testid="user-avatar-trigger">
          <Avatar data-testid="user-avatar">
            <AvatarImage
              src={avatarUrl}
              alt={fullName ?? email}
              data-testid="user-avatar-image"
            />
            <AvatarFallback data-testid="user-avatar-fallback">
              {getInitials(fullName, email)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-testid="user-avatar-menu">
        <DropdownMenuItem
          variant="destructive"
          disabled={isPending}
          onClick={() => logout()}
          data-testid="user-avatar-sign-out"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserAvatar } from "./UserAvatar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ lang: "en" }),
}));

vi.mock("@/app/[lang]/(internal)/actions", () => ({
  logoutAction: vi.fn(),
}));

describe("UserAvatar", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("trigger", () => {
    it("should render the avatar trigger button", () => {
      render(<UserAvatar email="user@example.com" />);
      expect(screen.getByTestId("user-avatar-trigger")).toBeInTheDocument();
    });

    it("should render the Avatar inside the trigger", () => {
      render(<UserAvatar email="user@example.com" />);
      expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
    });
  });

  describe("fallback initials", () => {
    it("should show two initials when fullName has two words", () => {
      render(<UserAvatar email="user@example.com" fullName="John Doe" />);
      expect(screen.getByTestId("user-avatar-fallback").textContent).toBe(
        "JD",
      );
    });

    it("should show one initial when fullName has one word", () => {
      render(<UserAvatar email="user@example.com" fullName="John" />);
      expect(screen.getByTestId("user-avatar-fallback").textContent).toBe("J");
    });

    it("should use first letter of email when fullName is not provided", () => {
      render(<UserAvatar email="user@example.com" />);
      expect(screen.getByTestId("user-avatar-fallback").textContent).toBe("U");
    });

    it("should use first and last word initials for multi-word names", () => {
      render(
        <UserAvatar
          email="user@example.com"
          fullName="John Michael Doe"
        />,
      );
      expect(screen.getByTestId("user-avatar-fallback").textContent).toBe(
        "JD",
      );
    });
  });

  describe("avatar image", () => {
    it("should still render the avatar and fallback when avatarUrl is provided", () => {
      render(
        <UserAvatar
          email="user@example.com"
          fullName="John Doe"
          avatarUrl="https://example.com/avatar.png"
        />,
      );
      // AvatarImage from Radix uses an internal load state; in jsdom images don't load
      // so the fallback is always visible. We verify the avatar container renders.
      expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
      expect(screen.getByTestId("user-avatar-fallback")).toBeInTheDocument();
    });
  });
});

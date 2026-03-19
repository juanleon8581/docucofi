import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DesktopNavBar, NavLink } from "./DesktopNavBar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({ push: vi.fn() }),
}));

const MOCK_LINKS: NavLink[] = [
  { href: "/register", label: "Register" },
  { href: "/login", label: "Login" },
];

describe("DesktopNavBar.test", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("container", () => {
    it("should render the container", () => {
      render(<DesktopNavBar lang="en" links={MOCK_LINKS} />);

      expect(
        screen.getByTestId("desktop-navbar-container"),
      ).toBeInTheDocument();
    });

    it("should render the container with correct styles", () => {
      render(<DesktopNavBar lang="en" links={MOCK_LINKS} />);

      const container = screen.getByTestId("desktop-navbar-container");

      expect(container.classList).toContain("hidden");
      expect(container.classList).toContain("items-center");
      expect(container.classList).toContain("gap-4");
    });

    it("should render one button per link", () => {
      render(<DesktopNavBar lang="en" links={MOCK_LINKS} />);

      const container = screen.getByTestId("desktop-navbar-container");

      expect(container.children.length).toBe(MOCK_LINKS.length);
    });
  });

  describe("nav links", () => {
    it("should render the Register link with correct href", () => {
      render(<DesktopNavBar lang="en" links={MOCK_LINKS} />);

      expect(screen.getByRole("link", { name: /register/i })).toHaveAttribute(
        "href",
        "/en/register",
      );
    });

    it("should render the Login link with correct href", () => {
      render(<DesktopNavBar lang="en" links={MOCK_LINKS} />);

      expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute(
        "href",
        "/en/login",
      );
    });
  });
});

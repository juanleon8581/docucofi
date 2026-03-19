import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HeaderNavBar } from "./HeaderNavBar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("HeaderNavBar.test", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("container", () => {
    it("should render the container", () => {
      render(<HeaderNavBar lang="en" />);

      expect(
        screen.getByTestId("header-navbar-container"),
      ).toBeInTheDocument();
    });

    it("should render the container with the correct styles", () => {
      render(<HeaderNavBar lang="en" />);

      const container = screen.getByTestId("header-navbar-container");
      const classList = container.classList;

      expect(classList.length).toBe(6);
      expect(classList).toContain("flex");
      expect(classList).toContain("items-center");
      expect(classList).toContain("justify-between");
      expect(classList).toContain("p-8");
      expect(classList).toContain("border-b");
      expect(classList).toContain("border-muted-foreground");
    });
  });

  describe("logo", () => {
    it("should render the logo", () => {
      render(<HeaderNavBar lang="en" />);

      expect(screen.getByTestId("header-navbar-logo")).toBeInTheDocument();
    });
  });

  describe("actions", () => {
    it("should render the actions container", () => {
      render(<HeaderNavBar lang="en" />);

      expect(
        screen.getByTestId("header-navbar-actions"),
      ).toBeInTheDocument();
    });

    it("should render the LanguageSwitcher", () => {
      render(<HeaderNavBar lang="en" />);

      expect(
        screen.getAllByRole("button", { name: /switch to/i }).length,
      ).toBeGreaterThan(0);
    });

    it("should render the DesktopNavBar", () => {
      render(<HeaderNavBar lang="en" />);

      expect(
        screen.getByTestId("desktop-navbar-container"),
      ).toBeInTheDocument();
    });

    it("should render the BurgerMenu", () => {
      render(<HeaderNavBar lang="en" />);

      expect(
        screen.getByTestId("burger-menu-container"),
      ).toBeInTheDocument();
    });
  });
});

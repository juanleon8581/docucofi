import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavLink } from "../DesktopNavBar/DesktopNavBar";
import { BurgerMenu } from "./BurgerMenu";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({ push: vi.fn() }),
}));

const MOCK_LINKS: NavLink[] = [
  { href: "/register", label: "Register" },
  { href: "/login", label: "Login" },
];

describe("BurgerMenu.test", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("container", () => {
    it("should render the container", () => {
      render(<BurgerMenu lang="en" links={MOCK_LINKS} />);

      expect(
        screen.getByTestId("burger-menu-container"),
      ).toBeInTheDocument();
    });

    it("should render the container with correct styles", () => {
      render(<BurgerMenu lang="en" links={MOCK_LINKS} />);

      const container = screen.getByTestId("burger-menu-container");

      expect(container.classList).toContain("flex");
    });
  });

  describe("trigger button", () => {
    it("should render the burger trigger button", () => {
      render(<BurgerMenu lang="en" links={MOCK_LINKS} />);

      expect(
        screen.getByTestId("burger-menu-trigger"),
      ).toBeInTheDocument();
    });

    it("should render the trigger with an accessible label", () => {
      render(<BurgerMenu lang="en" links={MOCK_LINKS} />);

      expect(
        screen.getByRole("button", { name: /open menu/i }),
      ).toBeInTheDocument();
    });
  });
});

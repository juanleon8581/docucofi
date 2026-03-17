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
    describe("container", () => {
      it("should render the HeaderNavBar container", () => {
        render(<HeaderNavBar lang="en" />);
        expect(
          screen.getByTestId("header-navbar-container"),
        ).toBeInTheDocument();
      });

      it("should render container with the correct styles", () => {
        render(<HeaderNavBar lang="en" />);

        const container = screen.getByTestId("header-navbar-container");
        const classList = container.classList;

        expect(classList.length).toBe(4);
        expect(classList).toContain("flex");
        expect(classList).toContain("items-center");
        expect(classList).toContain("justify-between");
        expect(classList).toContain("p-8");
      });
    });
  });

  describe("logo", () => {
    it("should render the HeaderNavBar logo", () => {
      render(<HeaderNavBar lang="en" />);

      expect(screen.getByTestId("header-navbar-logo")).toBeInTheDocument();
    });
  });

  describe("nav Buttons", () => {
    it("should render the HeaderNavBar nav Buttons container", () => {
      render(<HeaderNavBar lang="en" />);

      const navButtonsContainer = screen.getByTestId(
        "header-navbar-nav-buttons-container",
      );

      expect(navButtonsContainer).toBeInTheDocument();
      expect(navButtonsContainer.tagName).toBe("DIV");
    });

    it("should render the correct number of nav Buttons", () => {
      render(<HeaderNavBar lang="en" />);

      const navButtonsContainer = screen.getByTestId(
        "header-navbar-nav-buttons-container",
      );

      expect(navButtonsContainer.children.length).toBe(3);
    });
  });
});

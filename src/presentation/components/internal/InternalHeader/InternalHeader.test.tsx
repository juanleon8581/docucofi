import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InternalHeader } from "./InternalHeader";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ lang: "en" }),
}));

vi.mock("@/app/[lang]/(internal)/actions", () => ({
  logoutAction: vi.fn(),
}));

const defaultUser = {
  email: "user@example.com",
  fullName: "John Doe",
};

describe("InternalHeader", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("container", () => {
    it("should render the container", () => {
      render(<InternalHeader user={defaultUser} lang="en" />);

      expect(
        screen.getByTestId("internal-header-container"),
      ).toBeInTheDocument();
    });

    it("should render the container with the correct styles", () => {
      render(<InternalHeader user={defaultUser} lang="en" />);

      const container = screen.getByTestId("internal-header-container");
      const classList = container.classList;

      expect(classList).toContain("flex");
      expect(classList).toContain("items-center");
      expect(classList).toContain("justify-between");
      expect(classList).toContain("border-b");
    });

    it("should render as a header element", () => {
      render(<InternalHeader user={defaultUser} lang="en" />);

      const container = screen.getByTestId("internal-header-container");
      expect(container.tagName).toBe("HEADER");
    });
  });

  describe("logo", () => {
    it("should render the logo", () => {
      render(<InternalHeader user={defaultUser} lang="en" />);

      expect(screen.getByTestId("internal-header-logo")).toBeInTheDocument();
    });
  });

  describe("actions", () => {
    it("should render the actions container", () => {
      render(<InternalHeader user={defaultUser} lang="en" />);

      expect(
        screen.getByTestId("internal-header-actions"),
      ).toBeInTheDocument();
    });

    it("should render the LanguageSwitcher", () => {
      render(<InternalHeader user={defaultUser} lang="en" />);

      expect(
        screen.getAllByRole("button", { name: /switch to/i }).length,
      ).toBeGreaterThan(0);
    });

    it("should render the UserAvatar trigger", () => {
      render(<InternalHeader user={defaultUser} lang="en" />);

      expect(screen.getByTestId("user-avatar-trigger")).toBeInTheDocument();
    });

    it("should render the correct avatar fallback for the user", () => {
      render(<InternalHeader user={defaultUser} lang="en" />);

      expect(screen.getByTestId("user-avatar-fallback").textContent).toBe(
        "JD",
      );
    });
  });
});

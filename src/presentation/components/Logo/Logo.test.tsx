import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("container", () => {
    describe("default", () => {
      it("should render the container", () => {
        render(<Logo />);
        const container = screen.getByTestId("logo-container");
        expect(container).toBeInTheDocument();
        expect(container.tagName).toBe("A");
        expect(container.getAttribute("href")).toBe("/");
        expect(container).toHaveRole("link");
      });

      it("should the container have the correct default styles", () => {
        render(<Logo />);
        const container = screen.getByTestId("logo-container");
        const classList = container.classList;
        expect(classList).toHaveLength(4);
        expect(classList).toContain("flex");
        expect(classList).toContain("items-end");
        expect(classList).toContain("gap-2");
        expect(classList).toContain("font-bold");
      });
    });

    describe("vertical", () => {
      it("should render the container", () => {
        render(<Logo orientation="vertical" />);
        expect(screen.getByTestId("logo-container")).toBeInTheDocument();
      });

      it("should the container have the correct vertical styles", () => {
        render(<Logo orientation="vertical" />);
        const container = screen.getByTestId("logo-container");
        const classList = container.classList;
        expect(classList).toHaveLength(6);
        expect(classList).toContain("flex");
        expect(classList).toContain("flex-col");
        expect(classList).toContain("items-center");
        expect(classList).toContain("justify-center");
        expect(classList).toContain("gap-2");
        expect(classList).toContain("font-bold");
      });
    });
  });

  describe("logo image", () => {
    it("should render the svg Logo", () => {
      render(<Logo />);
      const svg = screen.getByTestId("logo-svg");
      expect(svg).toBeInTheDocument();
      expect(svg.tagName).toBe("svg");
    });

    it("should the svg have the correct styles", () => {
      //* this is a third party icon library that adds the styles to the svg
      const expectedDefaultClassNumber = 2;
      render(<Logo />);
      const svg = screen.getByTestId("logo-svg");
      const classList = svg.classList;
      expect(classList).toHaveLength(expectedDefaultClassNumber + 2);
      expect(classList).toContain("w-10");
      expect(classList).toContain("h-10");
    });
  });

  describe("logo text", () => {
    it("should render the text", () => {
      render(<Logo />);
      const text = screen.getByTestId("logo-text");
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe("SPAN");
    });

    it("should the text have the correct styles", () => {
      render(<Logo />);
      const text = screen.getByTestId("logo-text");
      const classList = text.classList;
      expect(classList).toHaveLength(0);
    });

    it("should render the correct text", () => {
      render(<Logo />);
      const text = screen.getByTestId("logo-text");
      expect(text.textContent).toBe("Coficode Auth");
    });
  });

  describe("logo test id", () => {
    it("should render the container with the correct test id", () => {
      const testId = "custom-test-id";
      render(<Logo dataTestId={testId} />);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });
});

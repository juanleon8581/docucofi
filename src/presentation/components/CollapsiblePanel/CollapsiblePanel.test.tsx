import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CollapsiblePanel } from "./CollapsiblePanel";

describe("CollapsiblePanel.test", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    render(
      <CollapsiblePanel>
        <div data-testid="cp-children">
          <p>Text from test param children component</p>
        </div>
      </CollapsiblePanel>,
    );
  });

  describe("container", () => {
    it("should render the container", () => {
      const container = screen.getByTestId("cp-container");
      expect(container).toBeInTheDocument();
    });

    it("should render with the correct styles", () => {
      const container = screen.getByTestId("cp-container");
      const classList = container.classList;
      expect(classList.length).toBe(14);
      expect(classList).toContain("flex");
      expect(classList).toContain("flex-col");
      expect(classList).toContain("gap-2");
      expect(classList).toContain("w-11/12");
      expect(classList).toContain("md:w-4/5");
      expect(classList).toContain("mx-auto");
      expect(classList).toContain("text-primary-foreground");
      expect(classList).toContain("bg-primary");
      expect(classList).toContain("p-2");
      expect(classList).toContain("rounded-b-3xl");
      expect(classList).toContain("cp-container");
      expect(classList).toContain("min-h-10");
      expect(classList).toContain("shadow-lg");
      expect(classList).toContain("shadow-primary/50");
    });
  });

  describe("trigger", () => {
    it("should render the trigger", () => {
      const trigger = screen.getByTestId("cp-trigger");
      expect(trigger).toBeInTheDocument();
    });

    it("should render only the arrow as children", () => {
      const trigger = screen.getByTestId("cp-trigger");
      expect(trigger.children.length).toBe(1);
      expect(trigger.children[0].tagName).toBe("svg");
    });

    it("should render with the correct styles", () => {
      const trigger = screen.getByTestId("cp-trigger");
      const classList = trigger.classList;
      expect(classList.length).toBe(4);
      expect(classList).toContain("flex");
      expect(classList).toContain("items-center");
      expect(classList).toContain("justify-center");
      expect(classList).toContain("cp-trigger-rotate");
    });
  });

  describe("content", () => {
    it("should render the content", () => {
      const content = screen.getByTestId("cp-content");
      expect(content).toBeInTheDocument();
    });

    it("should render with the correct styles", () => {
      const content = screen.getByTestId("cp-content");
      const classList = content.classList;
      expect(classList.length).toBe(7);
      expect(classList).toContain("flex");
      expect(classList).toContain("flex-col");
      expect(classList).toContain("gap-2");
      expect(classList).toContain("justify-center");
      expect(classList).toContain("items-center");
      expect(classList).toContain("pb-6");
      expect(classList).toContain("cp-content");
    });

    it("should render the children", async () => {
      const trigger = screen.getByTestId("cp-trigger");

      fireEvent.click(trigger);
      const children = await screen.findByTestId("cp-children");

      expect(children).toBeInTheDocument();
    });
  });
});

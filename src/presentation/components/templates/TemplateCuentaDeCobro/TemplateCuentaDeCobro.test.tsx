import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TemplateCuentaDeCobro } from "./TemplateCuentaDeCobro";

describe("TemplateCuentaDeCobro.test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    render(<TemplateCuentaDeCobro />);
  });

  describe("container", () => {
    it("should render the template container", () => {
      const container = screen.getByTestId("template-cdc-container");
      expect(container).toBeInTheDocument();
    });

    it("should have the correct styles", () => {
      const expectedClassList = [
        "template-container",
        "h-full",
        "justify-between",
        "pb-4",
        "landscape:p-4",
        "landscape:pr-0",
      ];
      const container = screen.getByTestId("template-cdc-container");
      const classList = container.classList;

      expect(classList.length).toBe(expectedClassList.length);
      expectedClassList.forEach((t) => {
        expect(classList).toContain(t);
      });
    });

    it("should have the correct children", () => {
      const container = screen.getByTestId("template-cdc-container");
      const children = container.children as HTMLCollectionOf<HTMLElement>;
      expect(children.length).toBe(2);
      expect(children[0].dataset.testid).toBe("cp-container");
      expect(
        children[1].querySelector('[data-testid="previewer-container"]'),
      ).toBeTruthy();
    });
  });
});

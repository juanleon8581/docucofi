import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Toaster } from "./Toaster";

vi.mock("../ui/sonner", () => ({
  Toaster: vi.fn(() => <div data-testid="ui-toaster">Mocked UiToaster</div>),
}));

import { Toaster as MockedUiToaster } from "../ui/sonner";

describe("Toaster", () => {
  describe("Component Rendering", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      render(<Toaster />);
    });

    it("should render the toaster successfully", () => {
      const toaster = screen.getByTestId("ui-toaster");
      expect(toaster).toBeInTheDocument();
    });

    it("should render the component exactly one", () => {
      expect(MockedUiToaster).toBeCalledTimes(1);
    });
  });
});

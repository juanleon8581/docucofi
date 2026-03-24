import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Previewer } from "./Previewer";

describe("Previewer.test", () => {
  it("should render children inside the previewer container", () => {
    render(<Previewer><p>Test content</p></Previewer>);
    const container = screen.getByTestId("previewer-container");
    expect(container).toBeInTheDocument();
    expect(container.textContent).toContain("Test content");
  });
});

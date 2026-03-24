import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileInput } from "../FileInput";

describe("FileInput", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render the file input with correct accept attribute", () => {
    render(<FileInput value="" onChange={vi.fn()} data-testid="field-sig" />);
    const input = screen.getByTestId("field-sig");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAttribute("accept", "image/png, image/jpeg, image/svg+xml");
  });

  it("should show placeholder text when value is empty", () => {
    render(<FileInput value="" onChange={vi.fn()} data-testid="field-sig" />);
    expect(screen.getByTestId("field-sig-placeholder")).toBeInTheDocument();
  });

  it("should show image preview when value is a data URL", () => {
    const dataUrl = "data:image/png;base64,abc123";
    render(<FileInput value={dataUrl} onChange={vi.fn()} data-testid="field-sig" />);
    const img = screen.getByTestId("field-sig-preview");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", dataUrl);
  });

  it("should call onChange with data URL when a file is selected", async () => {
    const onChange = vi.fn();
    const fakeDataUrl = "data:image/png;base64,fakedata";

    let capturedInstance: { readAsDataURL: ReturnType<typeof vi.fn>; result: string; onload: (() => void) | null };

    class MockFileReader {
      result = fakeDataUrl;
      onload: (() => void) | null = null;
      readAsDataURL = vi.fn();
      constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        capturedInstance = this as typeof capturedInstance;
      }
    }
    vi.stubGlobal("FileReader", MockFileReader);

    render(<FileInput value="" onChange={onChange} data-testid="field-sig" />);

    const file = new File(["content"], "firma.png", { type: "image/png" });
    const input = screen.getByTestId("field-sig");

    await userEvent.upload(input, file);

    expect(capturedInstance!.readAsDataURL).toHaveBeenCalledWith(file);

    capturedInstance!.onload?.();
    expect(onChange).toHaveBeenCalledWith(fakeDataUrl);

    vi.unstubAllGlobals();
  });
});

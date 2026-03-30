import { describe, it, expect, vi, beforeEach } from "vitest";
import { PdfExportAdapter } from "../PdfExportAdapter";

const { mockRenderToBuffer } = vi.hoisted(() => ({
  mockRenderToBuffer: vi.fn(),
}));

vi.mock("@react-pdf/renderer", () => ({
  renderToBuffer: mockRenderToBuffer,
}));

vi.mock("@/infrastructure/templates/CuentaDeCobroPdfDocument", () => ({
  CuentaDeCobroPdfDocument: vi.fn(),
}));

describe("PdfExportAdapter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls renderToBuffer and returns a Buffer", async () => {
    mockRenderToBuffer.mockResolvedValue(new Uint8Array([1, 2, 3]));
    const result = await PdfExportAdapter.fromFields({ amount: "1000" });
    expect(mockRenderToBuffer).toHaveBeenCalledTimes(1);
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result).toEqual(Buffer.from(new Uint8Array([1, 2, 3])));
  });

  it("passes a React element to renderToBuffer", async () => {
    mockRenderToBuffer.mockResolvedValue(new Uint8Array([1]));
    const fields = { company: "Acme", amount: "5000" };
    await PdfExportAdapter.fromFields(fields);
    const [element] = mockRenderToBuffer.mock.calls[0];
    expect(element).toBeDefined();
    expect(element.props.fields).toBe(fields);
  });

  it("throws if renderToBuffer rejects", async () => {
    mockRenderToBuffer.mockRejectedValue(new Error("render error"));
    await expect(PdfExportAdapter.fromFields({})).rejects.toThrow(
      "render error",
    );
  });
});

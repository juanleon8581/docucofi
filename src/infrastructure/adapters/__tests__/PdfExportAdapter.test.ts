import { describe, it, expect, vi, beforeEach } from "vitest";
import { PdfExportAdapter } from "../PdfExportAdapter";

const mockPdf = vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3]));
const mockSetContent = vi.fn().mockResolvedValue(undefined);
const mockEvaluateHandle = vi.fn().mockResolvedValue(undefined);
const mockNewPage = vi.fn().mockResolvedValue({
  setContent: mockSetContent,
  pdf: mockPdf,
  evaluateHandle: mockEvaluateHandle,
});
const mockClose = vi.fn().mockResolvedValue(undefined);
const mockLaunch = vi.fn().mockResolvedValue({
  newPage: mockNewPage,
  close: mockClose,
});

vi.mock("puppeteer", () => ({
  default: {
    launch: mockLaunch,
  },
  launch: mockLaunch,
}));

describe("PdfExportAdapter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNewPage.mockResolvedValue({
      setContent: mockSetContent,
      pdf: mockPdf,
      evaluateHandle: mockEvaluateHandle,
    });
    mockLaunch.mockResolvedValue({
      newPage: mockNewPage,
      close: mockClose,
    });
  });

  it("launches browser with no-sandbox args", async () => {
    await PdfExportAdapter.fromHtml("<html></html>");
    expect(mockLaunch).toHaveBeenCalledWith({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  });

  it("calls page.setContent with the provided HTML and domcontentloaded", async () => {
    const html = "<html><body>test</body></html>";
    await PdfExportAdapter.fromHtml(html);
    expect(mockSetContent).toHaveBeenCalledWith(html, {
      waitUntil: "domcontentloaded",
    });
  });

  it("calls page.pdf with LETTER format and printBackground", async () => {
    await PdfExportAdapter.fromHtml("<html></html>");
    expect(mockPdf).toHaveBeenCalledWith({
      format: "LETTER",
      printBackground: true,
    });
  });

  it("calls browser.close after generating the PDF", async () => {
    await PdfExportAdapter.fromHtml("<html></html>");
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("returns a Buffer with the PDF bytes", async () => {
    const result = await PdfExportAdapter.fromHtml("<html></html>");
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result).toEqual(Buffer.from(new Uint8Array([1, 2, 3])));
  });

  it("calls browser.close even if page.pdf throws", async () => {
    mockPdf.mockRejectedValueOnce(new Error("pdf error"));
    await expect(
      PdfExportAdapter.fromHtml("<html></html>"),
    ).rejects.toThrow("pdf error");
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});

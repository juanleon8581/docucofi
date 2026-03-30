import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

const mockChromiumExecPath = vi.fn().mockResolvedValue("/tmp/chromium");
const mockChromiumArgs = ["--no-sandbox", "--disable-gpu", "--single-process"];

vi.mock("puppeteer-core", () => ({
  default: { launch: mockLaunch },
  launch: mockLaunch,
}));

vi.mock("@sparticuz/chromium", () => ({
  default: {
    executablePath: mockChromiumExecPath,
    args: mockChromiumArgs,
  },
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
    mockPdf.mockResolvedValue(new Uint8Array([1, 2, 3]));
    mockChromiumExecPath.mockResolvedValue("/tmp/chromium");
  });

  afterEach(() => {
    delete process.env.VERCEL;
    delete process.env.AWS_LAMBDA_FUNCTION_NAME;
    delete process.env.CHROME_EXECUTABLE_PATH;
  });

  describe("in serverless environment (VERCEL=1)", () => {
    beforeEach(() => {
      process.env.VERCEL = "1";
    });

    it("launches browser with chromium executablePath and chromium.args", async () => {
      await PdfExportAdapter.fromHtml("<html></html>");
      expect(mockLaunch).toHaveBeenCalledWith({
        headless: true,
        args: mockChromiumArgs,
        executablePath: "/tmp/chromium",
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

    it("returns a Buffer with the PDF bytes", async () => {
      const result = await PdfExportAdapter.fromHtml("<html></html>");
      expect(Buffer.isBuffer(result)).toBe(true);
      expect(result).toEqual(Buffer.from(new Uint8Array([1, 2, 3])));
    });

    it("calls browser.close after generating the PDF", async () => {
      await PdfExportAdapter.fromHtml("<html></html>");
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("calls browser.close even if page.pdf throws", async () => {
      mockPdf.mockRejectedValueOnce(new Error("pdf error"));
      await expect(
        PdfExportAdapter.fromHtml("<html></html>"),
      ).rejects.toThrow("pdf error");
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("in serverless environment (AWS_LAMBDA_FUNCTION_NAME set)", () => {
    beforeEach(() => {
      process.env.AWS_LAMBDA_FUNCTION_NAME = "my-function";
    });

    it("launches browser with chromium executablePath and chromium.args", async () => {
      await PdfExportAdapter.fromHtml("<html></html>");
      expect(mockLaunch).toHaveBeenCalledWith({
        headless: true,
        args: mockChromiumArgs,
        executablePath: "/tmp/chromium",
      });
    });
  });

  describe("in local development (no serverless env vars)", () => {
    it("launches browser with macOS Chrome fallback path", async () => {
      await PdfExportAdapter.fromHtml("<html></html>");
      expect(mockLaunch).toHaveBeenCalledWith({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath:
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      });
    });

    it("uses CHROME_EXECUTABLE_PATH env var when set", async () => {
      process.env.CHROME_EXECUTABLE_PATH = "/usr/bin/google-chrome-stable";
      await PdfExportAdapter.fromHtml("<html></html>");
      expect(mockLaunch).toHaveBeenCalledWith({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: "/usr/bin/google-chrome-stable",
      });
    });
  });
});

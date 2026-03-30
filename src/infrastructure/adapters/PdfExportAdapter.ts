export class PdfExportAdapter {
  static async fromHtml(html: string): Promise<Buffer> {
    const puppeteer = await import("puppeteer-core");
    const { executablePath, args } = await PdfExportAdapter.getBrowserConfig();

    const browser = await puppeteer.launch({
      headless: true,
      args,
      executablePath,
    });
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "domcontentloaded" });
      await page.evaluateHandle("document.fonts.ready");
      const pdf = await page.pdf({ format: "LETTER", printBackground: true });
      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  private static async getBrowserConfig(): Promise<{
    executablePath: string;
    args: string[];
  }> {
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      const chromium = (await import("@sparticuz/chromium-min")).default;
      const binaryUrl =
        process.env.CHROMIUM_BINARY_URL ??
        "https://github.com/Sparticuz/chromium/releases/download/v143.0.0/chromium-v143.0.0-pack.tar";
      return {
        executablePath: await chromium.executablePath(binaryUrl),
        args: chromium.args,
      };
    }
    return {
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH ||
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
  }
}

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
      const chromium = (await import("@sparticuz/chromium")).default;
      return {
        executablePath: await chromium.executablePath(),
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

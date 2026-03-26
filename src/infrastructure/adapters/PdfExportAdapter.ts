export class PdfExportAdapter {
  static async fromHtml(html: string): Promise<Buffer> {
    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
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
}

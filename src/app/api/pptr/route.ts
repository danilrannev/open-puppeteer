import chromium from "@sparticuz/chromium-min";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const remoteExecutablePath =
  "https://github.com/Sparticuz/chromium/releases/download/v138.0.2/chromium-v138.0.2-pack.x64.tar";

let browser: any = null;

async function getBrowser() {
  if (browser) return browser;

  if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
    browser = await puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(remoteExecutablePath),
      headless: true,
    });
  } else {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
  }
  return browser;
}

async function checkPageStatus(content: string) {
  let statusCode: number;
  try {
    const browser = await getBrowser();
    const page = await browser.newPage();
    
    await page.setContent(content, { waitUntil: 'networkidle0' });
    
    const pdfData = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });
    await browser.close();
    return Buffer.from(pdfData);
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();
  const content = body.content;
  const pdfData = await checkPageStatus(content);
  return new Response(
    new Blob([pdfData || new Buffer('')], { type: 'application/pdf' }),
    {
      headers: {
        'Content-Disposition': 'attachment; filename="page.pdf"',
      },
    }
  );
}

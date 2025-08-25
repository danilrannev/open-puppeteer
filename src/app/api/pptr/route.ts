import chromium from "@sparticuz/chromium-min";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { BrowserInstance, PageInstance, ResponseInstance } from "@/types";

export const dynamic = "force-dynamic";

const remoteExecutablePath =
  "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar";

let browser: BrowserInstance | null = null;

async function getBrowser(): Promise<BrowserInstance> {
  if (browser) return browser;

  if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
    browser = await puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(remoteExecutablePath),
      headless: true,
    }) as BrowserInstance;
  } else {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    }) as BrowserInstance;
  }
  return browser;
}

async function checkPageStatus(url: string): Promise<boolean> {
  let statusCode: number;
  try {
    const browser = await getBrowser();
    const page: PageInstance = await browser.newPage();
    const response: ResponseInstance = await page.goto(url, { waitUntil: "domcontentloaded" });
    statusCode = response && response.status() === 200 ? 200 : 404;
    await page.close();
  } catch (error) {
    console.error("Error accessing page:", error);
    statusCode = 404;
  }
  return statusCode === 200;
}

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return new Response(
      JSON.stringify({ error: "URL parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const status = await checkPageStatus(url);
  return new Response(
    JSON.stringify({
      statusCode: status ? 200 : 404,
      is200: status,
    }),
    {
      status: status ? 200 : 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}

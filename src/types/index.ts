export interface PageStatusResponse {
  statusCode: number;
  is200: boolean;
}

export interface ErrorResponse {
  error: string;
}

export interface BrowserInstance {
  newPage(): Promise<PageInstance>;
  close(): Promise<void>;
}

export interface PageInstance {
  goto(url: string, options?: { waitUntil: string }): Promise<ResponseInstance>;
  close(): Promise<void>;
}

export interface ResponseInstance {
  status(): number;
}

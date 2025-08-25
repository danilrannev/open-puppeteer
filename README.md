# OpenPuppeteer - Free Puppeteer as a Service

https://www.openpuppeteer.com/

OpenPuppeteer is a free service for running Puppeteer scripts. It's designed to simplify the process of using Puppeteer, a Node.js library for browser automation, and allows you to run Puppeteer as a service.

## Setup

### Prerequisites

- **Node.js** (latest stable version recommended)
- **Vercel Account** (for deployment)

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/naeemudheenp/open-puppeteer.git
    ```

2. Install dependencies:

    ```bash
    cd openpuppeteer
    npm install
    ```

3. Set up your `.env.local` file in the project root with the following environment variables:

    ```plaintext
    NEXT_PUBLIC_APP_DOMAIN=http://localhost:3000/
    NEXT_PUBLIC_VERCEL_ENVIRONMENT=development
    ```

   - `NEXT_PUBLIC_APP_DOMAIN`: Set to the base URL of your application (e.g., `http://localhost:3000/` for local development).
   - `NEXT_PUBLIC_VERCEL_ENVIRONMENT`: Set to `development` during local development or `production` when deployed.

### Running Locally

To start the application locally:

```bash
npm run dev
```

The application should be running at [http://localhost:3000](http://localhost:3000).

## Deployment

You can deploy this application on Vercel. Remember to add the environment variables to your Vercel project settings in the **Environment Variables** section.

## Handling Gateway Timeout Errors

If you encounter a **504 Gateway Timeout** error, it may be due to Vercel's function timeout limit. To increase the function timeout:

1. Go to **Settings** > **Functions** in your Vercel project.
2. Adjust the **Function Timeout** value to increase the time allowed for long-running Puppeteer operations.

## Contributing

We welcome contributions! If you'd like to contribute to OpenPuppeteer, please fork the repository, make your changes, and submit a pull request.


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnaeemudheenp%2Fopen-puppeteer)




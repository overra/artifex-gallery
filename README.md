# Artifex Gallery

A community-driven AI art gallery for discovering, sharing, and collecting AI-generated masterpieces, with powerful edge-based moderation.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/overra/artifex-gallery)

Artifex Gallery is a sophisticated, community-driven web application for showcasing, discovering, and collecting AI-generated art. Inspired by platforms like DeviantArt and Pinterest, it provides a visually stunning masonry-style gallery where users can upload their creations, organize them into collections, and engage with other artists. The platform is built on a modern, scalable serverless stack using Cloudflare Workers, Durable Objects, and a reactive frontend built with React, TypeScript, and Tailwind CSS.

A key feature is its robust, AI-powered moderation system, designed to operate at the edge for real-time analysis of uploads to prevent explicit, violent, or illegal content, ensuring a safe and welcoming community.

## Key Features

-   **Pinterest-Style Gallery**: An infinite-scrolling, masonry grid of AI-generated artwork.
-   **Rich Image Details**: View artwork with artist details, descriptions, tags, and a comment section.
-   **User Profiles & Collections**: Showcase your art, create collections (boards), and follow other artists.
-   **Edge-Based Moderation**: A user-facing upload flow with real-time, AI-powered content safety checks.
-   **Powerful Discovery**: Browse by tags, categories, and trending art with robust search and filtering.
-   **Admin Dashboard**: A protected area for administrators to review flagged content and manage the community.

## Technology Stack

-   **Frontend**: React, TypeScript, Vite, React Router
-   **Styling**: Tailwind CSS, shadcn/ui
-   **Animation**: Framer Motion
-   **State Management**: Zustand
-   **Backend**: Cloudflare Workers, Hono
-   **Storage**: Cloudflare Durable Objects
-   **Tooling**: Bun, Wrangler

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for interacting with the Cloudflare platform.
-   A Cloudflare account.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/artifex_gallery.git
    cd artifex_gallery
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Configure Environment Variables:**

    Create a `.dev.vars` file in the root of the project for local development. You will need to populate it with your Cloudflare AI Gateway credentials.

    ```ini
    # .dev.vars
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

    You can find these values in your Cloudflare dashboard.

### Running Locally

Start the development server, which runs both the Vite frontend and the Wrangler server for the backend worker.

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

## Development

The project is structured into two main parts:

-   `src/`: Contains the React frontend application.
    -   `src/pages/`: Main views/pages of the application.
    -   `src/components/`: Reusable UI components.
    -   `src/lib/`: Utility functions and client-side logic.
-   `worker/`: Contains the Cloudflare Worker backend code.
    -   `worker/index.ts`: The entry point for the worker.
    -   `worker/userRoutes.ts`: Defines the API routes using Hono.
    -   `worker/agent.ts`: The core Durable Object class for managing state.

## Deployment

This project is designed for easy deployment to Cloudflare's global network.

1.  **Login to Wrangler:**
    Authenticate the Wrangler CLI with your Cloudflare account.
    ```bash
    wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which will build the frontend and deploy both the static assets and the worker to Cloudflare.
    ```bash
    bun deploy
    ```

    Wrangler will provide you with the URL of your deployed application.

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/overra/artifex-gallery)

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
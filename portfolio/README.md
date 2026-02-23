# Personal Portfolio with Admin Panel

A high-performance, animated personal portfolio website built with Next.js (App Router), Tailwind CSS, Framer Motion, and Lucide React.

## Features

-   **Static Data Source:** All content is driven by `src/data/portfolio.json`.
-   **Client-Side Admin Panel:** Edit your portfolio data easily via `/admin`.
-   **Dark/Light Mode:** Seamless theme switching with system preference detection.
-   **Animations:** Smooth scrolling, staggered fade-ins, and interactive elements using Framer Motion.
-   **Responsive Design:** Optimized for all devices.

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Managing Content

This portfolio uses a local JSON file (`src/data/portfolio.json`) as its database. To update your content:

1.  Navigate to **[http://localhost:3000/admin](http://localhost:3000/admin)**.
2.  Use the form to edit any section of your portfolio (Hero, About, Projects, Experience, etc.).
3.  Click the **"Copy Updated JSON"** button at the top right.
4.  Open `src/data/portfolio.json` in your code editor.
5.  Paste the copied JSON content, replacing the existing content.
6.  Save the file. The site will update immediately in development mode.

## Project Structure

-   `src/app`: App Router pages and layouts.
-   `src/components`: Reusable UI components (Hero, Navbar, Projects, etc.).
-   `src/data`: Contains `portfolio.json`.
-   `src/types`: TypeScript definitions.

## Building for Production

To create a production build:

```bash
npm run build
```

This generates a static optimization of your site.

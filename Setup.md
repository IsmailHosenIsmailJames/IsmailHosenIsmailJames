# Ismail Hossain Portfolio

This is a high-performance, animated personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion. It features a fully static architecture with a client-side admin panel for managing content.

## 🚀 Features

*   **Modern Design**: Clean, responsive layout with a sticky navbar and dark/light mode.
*   **Animations**: Smooth scrolling, staggered fade-ins, and hover effects powered by Framer Motion.
*   **Static Data**: All content is driven by a local JSON file (`src/data/portfolio.json`).
*   **Client-Side Admin**: Built-in `/admin` route to edit content and copy the updated JSON structure.
*   **Type-Safe**: Built with TypeScript for robustness.

## 🛠️ Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide React

## 📦 Prerequisites

Ensure you have the following installed on your machine:

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   npm (comes with Node.js)

## 🏁 Getting Started

Follow these steps to run the project locally on your Linux laptop (or any other OS):

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

## ⚙️ Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## 📝 Managing Content

The content is stored in `src/data/portfolio.json`. You can edit this file directly or use the built-in admin panel.

### Using the Admin Panel

1.  Navigate to [http://localhost:3000/admin](http://localhost:3000/admin).
2.  Edit the text fields for Hero, About, Projects, Experience, etc.
3.  Click the **"Copy JSON"** button in the top right corner.
4.  Paste the copied JSON into `src/data/portfolio.json` in your code editor.
5.  Commit and push the changes to update the live site.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

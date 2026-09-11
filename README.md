
# Web Performance Analyzer

A full-stack web application for collecting website content and generating an AI-powered SEO and readability review. Users can create an account, submit a public URL, inspect the scraped Markdown content, and request a score and written review from an AI model.

This project demonstrates authenticated server-side workflows, third-party API integration, database persistence, validation, and a dashboard-style user experience built with the Next.js App Router.

## What It Does

1. A user registers or signs in with an email address and password.
2. The dashboard accepts a valid website URL.
3. Firecrawl retrieves the page and converts its content to Markdown.
4. The scraped content is stored as a project belonging to the authenticated user.
5. The user can open the project details page and request an AI audit.
6. OpenRouter analyzes the stored content and returns a score from 0 to 100 together with a written SEO/readability review.
7. Previous analyses remain available in the user's analysis history.

## Features

- Email/password registration and sign-in
- Session-based authentication with protected dashboard and project routes
- Per-user project ownership and access control
- URL validation with Zod on the client and server
- Website scraping through Firecrawl
- Persisted analysis history in PostgreSQL
- AI-generated SEO and readability scoring through OpenRouter
- Server Actions for scraping and AI evaluation
- Responsive dashboard built with reusable UI components
- Error handling for invalid URLs, failed scrapes, unauthenticated requests, and invalid AI responses

## Technology Stack

### Application

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/) components with Base UI primitives
- [Lucide React](https://lucide.dev/) icons

### Backend and data

- [Better Auth](https://www.better-auth.com/) for email/password authentication and sessions
- [Prisma](https://www.prisma.io/) as the ORM
- PostgreSQL for users, sessions, accounts, projects, scraped content, and AI results
- Next.js Server Actions for server-side mutations

### External services

- [Firecrawl](https://www.firecrawl.dev/) for website scraping and Markdown extraction
- [OpenRouter](https://openrouter.ai/) for AI-powered content evaluation

## Architecture Highlights

- **Protected data access:** dashboard and project details are scoped to the current authenticated user's ID, so users can only access their own analyses.
- **Server-side secrets:** Firecrawl and OpenRouter credentials are used only in server-side actions and are never exposed to the browser.
- **Validated input:** URLs are validated with a shared Zod schema before a scrape is started.
- **Persistent workflow:** scraping and AI evaluation are separate steps. This allows users to inspect the captured content and request an AI review when needed.
- **Relational model:** Prisma connects users to their sessions, accounts, and projects with cascading cleanup for user-owned data.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- Docker Desktop, or another PostgreSQL 18-compatible database
- A [Firecrawl API key](https://www.firecrawl.dev/)
- An [OpenRouter API key](https://openrouter.ai/)

### Installation

Clone the repository and move into the application directory:

```bash
git clone <repository-url>
cd next-app
npm install
```

Start the local PostgreSQL database:

```bash
docker compose up -d db
```

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://admin:mysecretpassword@localhost:5432/next_app_db?schema=public"
FIRECRAWL_API_KEY="your-firecrawl-api-key"
OPENROUTER_API_KEY="your-openrouter-api-key"
```

Apply the Prisma migrations and start the development server:

```bash
npx prisma migrate deploy
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser, create an account, and submit a public website URL.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx prisma generate` | Generate the Prisma Client |
| `npx prisma migrate deploy` | Apply committed database migrations |
| `npx prisma studio` | Open the Prisma database browser |

## Project Structure

```text
app/
	actions/             Server Actions for scraping and AI evaluation
	api/auth/            Better Auth API route handler
	dashboard/           Protected dashboard and project details
	login/               Sign-in page
	register/            Registration page
components/ui/         Reusable interface components
lib/                   Authentication, Prisma, and shared utilities
prisma/                PostgreSQL schema and migrations
schemas/               Shared Zod validation schemas
```

## Current Scope

The current version focuses on content-based analysis. It does not yet run Lighthouse audits or measure technical performance metrics such as page load time, Core Web Vitals, accessibility, or resource-level network performance. The dashboard's average-score summary is also reserved for a future aggregation feature.

## Potential Next Steps

- Add Lighthouse or PageSpeed Insights metrics
- Calculate the dashboard's average score from completed AI reviews
- Add retry and progress states for long-running scrapes
- Store structured recommendations instead of only a score and free-form review
- Add automated tests for authentication, ownership checks, validation, and Server Actions
- Add production deployment documentation and environment-specific trusted origins

## License

This project is a portfolio application. Add a license here if the repository is intended for public reuse.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

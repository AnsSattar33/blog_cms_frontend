# Blog CMS Frontend

Next.js 16 frontend for the Blog CMS — public website and admin dashboard.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Login

- Email: `admin@blog.com`
- Password: `password123`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

See [../docs/folder-structure.md](../docs/folder-structure.md) for full documentation.

## Environment

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_API_URL=/api
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

The browser calls same-origin `/api`; the Next.js route handler proxies to `BACKEND_URL`. On Vercel, set `BACKEND_URL` to your Express deployment (no `/api` suffix) and `NEXT_PUBLIC_API_URL=/api`.

## Tech Stack

Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · React Hook Form · Zod · TanStack Query · Tiptap · Framer Motion · Sonner

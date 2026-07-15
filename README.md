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
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Tech Stack

Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · React Hook Form · Zod · TanStack Query · Tiptap · Framer Motion · Sonner

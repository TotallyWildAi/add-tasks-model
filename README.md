# Next.js Tasks App

Minimal task manager built with **Next.js 15 App Router**, **Prisma**, **Zod**, and **Vitest**.

## What it does

- `GET /` — Server Component that queries Prisma directly and renders open tasks (newest first).
- `GET /api/tasks` — returns all tasks ordered with **open tasks first** (`done asc, createdAt desc`).
- `POST /api/tasks` — accepts `{ "title": string }`, validates the title is non-empty (Zod), creates the task, returns `201`. Returns `400` on invalid JSON or empty/whitespace title.

## Domain model

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  done      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

## Layout

| Path | Purpose |
|------|---------|
| `prisma/schema.prisma` | `Task` model (SQLite for local dev) |
| `lib/prisma.ts` | PrismaClient singleton (hot-reload safe) |
| `lib/schemas.ts` | `createTaskSchema` — Zod validator (`z.string().trim().min(1)`) |
| `app/api/tasks/route.ts` | GET/POST route handlers |
| `app/page.tsx` | Server Component listing open tasks |
| `tests/tasks.test.ts` | Vitest tests for the title validator |
| `vitest.config.ts` | happy-dom env + `@/*` path alias |

## Local setup

```bash
npm install
cp .env.example .env          # or use the included .env (SQLite default)
npx prisma migrate dev --name init
npm run dev
```

## Verify

`./verify.sh` runs lint, typecheck, `next build`, and Vitest. Stages: `lint`, `typecheck`, `smoke`, `test`, `all`.

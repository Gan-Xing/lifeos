# LifeOS (人生系统)

**Slogan**
- "Upgrade your identity. Gamify your life."
- “升级你的身份内核，游戏化你的人生。”

## Overview
LifeOS is a multi-user identity coaching system that helps people record their daily actions, reflect on identity alignment, and receive AI-powered corrections and supervision.

## Tech Stack
- Next.js 16.1.0-canary.20
- React 19.3.0-canary
- Prisma + Postgres
- Tailwind CSS

## Local Development
1. Install dependencies
   ```bash
   pnpm install
   ```
2. Configure environment variables (copy `.env.example` to `.env.local`):
   - `DATABASE_URL` → Postgres connection (pgBouncer/pooled endpoint)
   - `DIRECT_DATABASE_URL` → Postgres non-pooling endpoint for Prisma migrations
   - `SUPABASE_URL` + `SUPABASE_ANON_KEY` → Supabase public API credentials (reserved for client usage)
   - `DEEPSEEK_API_KEY` → DeepSeek API key for AI calls
3. Start the dev server
   ```bash
   pnpm dev
   ```

## Notes
- Do not run `npx prisma migrate dev` on production data.
- Use `prisma migrate deploy` in non-dev environments.

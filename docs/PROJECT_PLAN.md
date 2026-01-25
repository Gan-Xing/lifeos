# LifeOS Project Plan

## Vision
LifeOS helps users upgrade their identity and gamify their life through structured daily reflection, AI-driven correction, and accountability loops.

## Milestones
1) MVP Auth + Daily Entry Flow
2) AI Feedback Loop (prompt + response storage)
3) Goal System + Streaks + Progress UI
4) Notifications and Coaching Routines

## Core User Flow
- Register / Login
- Create daily identity entry
- Receive AI correction + next action
- Track streak + alignment trend

## Modules
- Auth (sessions, registration, login)
- Entries (daily logs, identity statements, micro actions)
- Feedback (AI corrections)
- Goals (identity milestones)

## Data Sources
- Postgres (primary)
- AI provider (future)

## Security
- Hash passwords (scrypt)
- Signed session cookies
- Require session for private data

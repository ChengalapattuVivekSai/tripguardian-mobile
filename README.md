# tripguardian-mobile

TripGaurdion v1 (React Native) - Baseline

Overview
- Minimal TypeScript React Native (Expo) baseline and recommended folder structure for the TripGaurdion v1 tour app.
- Network endpoints are env-driven through `.env` so the repo stays safe to push to git.

Quick start
1. Copy `.env.example` to `.env` and set your backend URL.
2. From this folder run:

```bash
npm install
npm run start
```

Notes
- `src/config/environment.ts` resolves API and socket URLs from environment variables first.
- `src/services/api.ts`, `src/services/gpsApi.ts`, and `src/services/socket.ts` all consume the same config source.
- Avoid committing secrets, LAN IPs, or server URLs. Use `.env` locally and `.env.example` as the shared template.

Recommended folder structure

- `src/`
  - `config/` environment and runtime configuration
  - `components/` reusable UI primitives
  - `navigation/` app navigation and route types
  - `screens/` screen-level containers
  - `services/` API, socket, and external integrations
  - `hooks/` custom hooks
  - `store/` global state (context, redux, Zustand)
  - `theme/` colors, spacing, and visual tokens
  - `types/` shared TypeScript types
  - `utils/` helpers

Baseline rules
- Keep direct network access inside `services/`.
- Keep runtime values in `config/`.
- Keep UI widgets in `components/` and screen orchestration in `screens/`.
- Keep sensitive or machine-specific values out of version control.

Customization
- Replace services with real API endpoints, wire real state management, and add feature flags as project grows.

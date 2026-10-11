# Open Study workspace guidance

- Keep the app free-to-start, mobile-first, and installable as a Progressive Web App.
- Use React, TypeScript, Vite, Supabase Auth, and the existing visual conventions in `src/styles.css`.
- Never put a Supabase service-role key or other secret in client code. Student progress must remain protected by row-level security.
- Keep study content original, accurate, and organized by exam, subject, and lesson. Verify syllabus-specific claims before expanding the question bank.
- Run `npm run typecheck` and `npm run build` after relevant changes.

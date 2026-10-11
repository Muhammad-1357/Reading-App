# Open Study

A free-to-start study app for WAEC/WASSCE and JAMB/UTME candidates. The installable web app includes a subject catalogue, original starter lessons for Mathematics and English, practice questions with explanations, and per-student progress.

## Run locally

1. Install Node.js (LTS).
2. Run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.
4. Before connecting accounts, use **Preview the study space** on the development sign-in screen. Preview progress is saved only in that browser.

## Enable student accounts

The app uses Supabase Auth and its free tier to start. Free-plan limits and availability can change; the app does not require a paid plan, and should be kept within the provider's free limits.

1. Create a Supabase project and enable email/password sign-in.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the project API settings. The anon key is intended for client apps; never put a service-role key in this project.
3. In the Supabase SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql). The table has row-level security so a student can access only their own progress.
4. Restart the dev server. Students can then create accounts and sign in. If email confirmation is enabled, they need to confirm their address before signing in.

Keep `.env.local` private. Account sign-in and cloud progress require an internet connection. The lesson shell and bundled sample content are cached by the app's small service worker, but offline sign-in is not supported.

## Build and install

- `npm run typecheck` checks TypeScript.
- `npm run build` creates the deployable app in `dist/`.
- Serve the app over HTTPS to install it on Android from the browser. A Play Store listing is not needed for the installable web app.

## Content

The current catalogue is a starting point and includes many common WAEC/JAMB options; subject offerings and names can vary by syllabus and year. Mathematics, English, and Biology currently have complete sample lessons. Check future notes and practice sets against the relevant official syllabus and past-paper guidance before relying on them for an exam.

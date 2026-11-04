# PantryPal: project rules (PepSafe Studio)

Small local-first pantry app. Owner: PepSafe Studio, contact `contact@pepsafe.info`. Language of the app: English (UK market).

## Hard rules
- **Never give food-safety verdicts.** Show only the dates the user entered, labelled as reminders. No "safe", "unsafe", "still good", "spoiled".
- No invented numbers, prices, user counts, release dates or screenshots, in the app or anywhere else.
- **No secrets in the repo or in chat**: API keys, tokens, passwords and database URLs belong in the host's environment settings only. The repo may be public.
- Do not add analytics, ads or third-party trackers. Fonts come from Google Fonts and the privacy page says so; if that changes, update `src/pages/Privacy.tsx`.
- Do not claim accounts, sync or payments exist until they do.

## Work rules
- Before every change: `npm run build` must pass (it type-checks). Test in a real browser at phone width (390 px) and desktop (1280 px); no horizontal scroll, no console errors.
- All data goes through `src/data/pantry.ts` (validated reads, backup/restore). Do not write to localStorage elsewhere.
- Bump `CACHE` in `public/sw.js` when you change cached files so installed copies update.
- Commit messages: plain and neutral; do not mention tools or models. Do not force-push.

## Next steps (in order)
1. Host it (Render static site via `render.yaml`) and put it behind a subdomain.
2. Use it for a week with a few real people; fix what they hit.
3. Only then consider accounts and household sync (needs a backend such as Supabase; keys go in environment settings).

## Working with the owner: do it yourself first (owner decision, 4 Nov)
- For any problem, offer several solutions. Option **1** is always what you can do **yourself**, without the owner (code, repo, scripts, a workaround in code, a different route than planned), and **do it right away**.
- Send the owner only what you cannot do (accounts, clicks in dashboards, keys, payments, uploading files).
- The owner is usually on a **phone**: short, one step at a time, no options that need a computer when another route exists. Do not ask when you can decide.
- Why: twice (PantryPal deploy, subpage routing) the problem was solved in code with no dashboard clicks.

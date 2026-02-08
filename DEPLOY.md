# Deploying VidhiFlow to Bolt.new

VidhiFlow is built to run on **Bolt.new** (bolt.new) and can be published to a free **bolt.host** URL with no extra setup.

## Design system (Figma)

The UI uses **Bolt-style design tokens** so you can align with your Figma design system:

- **Tokens**: `src/styles/design-tokens.css` defines semantic variables (`--bolt-primary`, `--bolt-text`, `--bolt-surface`, etc.). Update these to match your Figma tokens.
- **Tailwind**: `tailwind.config.ts` maps Bolt tokens to utility classes (`bg-bolt-primary`, `text-bolt-text-muted`, `rounded-bolt-lg`, etc.).
- **Font**: Layout uses **Open Sans** (Bolt Design System default). Change in `src/app/layout.tsx` if your Figma kit uses another font.

To sync with Figma: replace the hex values in `design-tokens.css` with the colors and spacing from your Figma design system.

---

## Publish to Bolt.new (bolt.host)

1. Open your project in **Bolt** (bolt.new).
2. Click **Publish** in the top-right.
3. Click the second **Publish** button in the dialog.
4. Wait about a minute for the build and deploy.
5. Use the **bolt.host** link from the chat to open the live site.

Publishing from the **Publish** button does not use tokens. You can optionally attach a custom domain later (Pro plan).

### Before you publish

- **Tambo API key**: For the Judicial Assistant chat, set `NEXT_PUBLIC_TAMBO_API_KEY` in **Project settings → Environment variables** in Bolt. Without it, the chat page shows a message asking for the key.
- **Optional**: Add `NEXT_PUBLIC_APP_URL` with your final bolt.host URL (e.g. `https://your-app.bolt.host`) so server-side and MCP tools resolve correctly.

### Security

Bolt runs a security check when you publish. If something is reported, use the **Security** section in Project settings and **Ask Bolt to fix** if available.

---

## Other hosting (Netlify, Vercel, etc.)

To deploy outside Bolt:

1. Build: `npm run build`
2. Start: `npm run start` (or use the output of `next build` in `out` if you switch to static export).
3. Set env vars (see `.env.example`), especially `NEXT_PUBLIC_TAMBO_API_KEY` and, if needed, `NEXT_PUBLIC_APP_URL`.

For **Netlify**, connect the repo and set the build command to `npm run build` and publish directory to `.next` (or as required by your Next.js setup).

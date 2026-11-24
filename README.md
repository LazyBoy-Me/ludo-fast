# ludofast.edge

Download landing page for **Ludo King 10.6.0.416** — a tiny Next.js app deployed on Vercel that
serves a fast, resumable, ad-free download from an edge/release CDN.

## Structure

```
app/page.jsx        landing page
app/ui.jsx          client bits (download button, copy chip, mirrors, live badge)
app/api/dl/route.js 302 → mirror, so links never break
app/api/info/route.js metadata JSON
lib/file.js         version / size / sha256 / mirrors  ← edit this
```

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

## Deploy

```bash
pnpm dlx vercel --prod
```

## Swap mirrors

Edit `lib/file.js`. The first entry in `mirrors` is the default target. Set
`MIRROR_EDGE` in the Vercel project env to override it without a redeploy of the file.

## File facts

- name: `Ludo-King_10.6.0.416.zip` (contains `Ludo King_10.6.0.416.apk`)
- bytes: 165,226,271
- sha256: `2ca304c1bbe000ac2716890b817a427f0e04422dcdb0f5b753453eafe637c71c`

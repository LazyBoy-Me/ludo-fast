# lazyludo

Download landing page for **Ludo King 10.6.0.416 — Pawn (Guti) Live Fix APK**. Next.js app on
Vercel; the heavy bytes ride the GitHub release CDN behind a resumable 302.

Live: https://lazyludo.vercel.app

## Structure

```
app/page.jsx         landing page
app/ui.jsx           client bits (download button, copy chip, mirrors, live badge)
app/api/dl/route.js  302 → mirror, so links never break
app/api/info/route.js metadata JSON
lib/file.js          version / size / sha256 / mirrors  ← edit this
```

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

## Deploy

```bash
vercel deploy --prod --yes
```

`.vercel/project.json` pins the deployment to the lazyludo project.

## Swap mirrors

Edit `lib/file.js`. First mirror is the default target; `MIRROR_EDGE` env overrides it without a
code change.

## File facts — current build

- name: `LudoKing_10.6.0.416_PAWN_FIX.apk`
- bytes: 264,390,095
- sha256: `ecf2b55700af01629ca029aca69b53b4d8542093806773a058e7155f39709abe`
- signed with a different key → uninstall the old mod first
- changes: TCP STATUS reply carries `boardState=<pawns>`; cloud `status.json` carries `boardState`

## Archive

- `Ludo-King_10.6.0.416.zip` — previous release, 165,226,271 bytes,
  sha256 `2ca304c1bbe000ac2716890b817a427f0e04422dcdb0f5b753453eafe637c71c`

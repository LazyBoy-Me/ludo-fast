import { FILE } from '../lib/file';
import { DownloadButton, CopyChip, MirrorCards, LiveBadge } from './ui';

const changes = [
  {
    tag: 'tcp',
    title: 'boardState rides the STATUS reply',
    body: 'The TCP STATUS answer now appends boardState=<pawns>. The pipe separator is swapped for a semicolon so the controller parser accepts it.',
  },
  {
    tag: 'cloud',
    title: 'status.json carries the same field',
    body: 'Cloud sync writes "boardState" into status.json too. Remote, hotspot and cloud modes now get pawn positions, not just dice and turn.',
  },
  {
    tag: 'ctrl',
    title: 'Controller untouched',
    body: 'It already knew how to read both channels. No controller update, no PIN change, no pairing dance.',
  },
];

const steps = [
  [
    'Uninstall the old mod',
    'This build is signed with a different key, so Android refuses to update over the installed game. Uninstalling clears local settings — if you log in with an account, log in again after.',
  ],
  ['Install the APK', 'Tap the file, allow install from this source. 252.1 MB, no split bundles, no obb.'],
  ['Set the game up as before', 'Open it, server ON, same controller PIN and pairing. Nothing about the game flow changed.'],
  ['Connect by Remote / Hotspot / Cloud', 'Any mode. Same-device mode was never broken.'],
  ['Roll once and look at the board', 'After every roll and turn the guti positions should land on the controller board in all three modes.'],
];

const faq = [
  ['Will it install over my current Ludo King mod?', 'No. Different signing key. Uninstall first, then install this APK.'],
  ['The game closes by itself after install — what now?', 'Roll back: reinstall the previous build from the mirror list, or the original APK from your own backup folder.'],
  ['Is the download resumable?', 'Yes. The CDN answers range requests, so a dropped transfer picks up where it stopped.'],
  ['Checksum mismatch?', 'Re-download. A mismatch is a truncated transfer, not a bad build.'],
];

export default function Page() {
  const shortSha = `${FILE.sha256.slice(0, 12)}…${FILE.sha256.slice(-6)}`;

  return (
    <main>
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="top">
        <div className="brand">
          <span className="mark">LF</span>
          <span className="brand-text">
            lazyludo<em>.vercel.app</em>
          </span>
        </div>
        <LiveBadge />
      </header>

      <section className="hero">
        <div className="badge">
          <span className="spark" />
          build {FILE.version} · pawn live fix · {FILE.build}
        </div>

        <h1>
          {FILE.game}
          <span className="line2">the pawn fix, one tap away.</span>
        </h1>

        <p className="lede">
          Modded {FILE.version} where the guti positions finally leave the phone. Board state now
          travels over the TCP STATUS reply and cloud status.json — so Remote, Hotspot and Cloud
          Sync boards stop showing an empty yard.
        </p>

        <DownloadButton label="Download pawnfix APK" />

        <div className="under-cta">
          <CopyChip value={FILE.sha256} short={`sha256 ${shortSha}`} />
          <span className="sep" />
          <span className="mono">{FILE.size} on the wire</span>
          <span className="sep" />
          <span className="mono">{FILE.kind} · direct install</span>
        </div>
      </section>

      <section className="stats">
        <div>
          <span>payload</span>
          <strong>{FILE.size}</strong>
        </div>
        <div>
          <span>format</span>
          <strong>{FILE.kind}</strong>
        </div>
        <div>
          <span>version</span>
          <strong>{FILE.version}</strong>
        </div>
        <div>
          <span>signature</span>
          <strong>new key</strong>
        </div>
      </section>

      <section className="callout">
        <strong>Uninstall the old mod first.</strong> Different signing key — Android will reject the
        install otherwise. Local settings go with it.
      </section>

      <section className="block">
        <h2>What changed</h2>
        <p className="sub">Game APK only. Controller untouched.</p>
        <div className="changes">
          {changes.map((c) => (
            <article key={c.tag}>
              <code>{c.tag}</code>
              <strong>{c.title}</strong>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Mirrors</h2>
        <p className="sub">Current build up top, the previous release underneath.</p>
        <MirrorCards />
      </section>

      <section className="block">
        <h2>Install</h2>
        <ol className="steps">
          {steps.map(([title, body], i) => (
            <li key={title}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="block">
        <h2>Questions</h2>
        <div className="faq">
          {faq.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div className="foot-dl">
          <DownloadButton label="Download again" />
        </div>
        <div className="fine">
          <code>{FILE.filename}</code>
          <span>{FILE.bytes.toLocaleString('en-US')} bytes</span>
          <span>{FILE.version}</span>
        </div>
        <p className="credit">
          Unofficial mod build. {FILE.game} and its assets belong to their publisher. Page runs on
          Vercel, bytes ride the release CDN.
        </p>
      </footer>
    </main>
  );
}

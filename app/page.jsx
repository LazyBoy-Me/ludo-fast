import { FILE } from '../lib/file';
import { DownloadButton, CopyChip, MirrorCards, LiveBadge } from './ui';

const steps = [
  ['Tap download', 'The transfer starts straight from the edge node. If your browser asks "keep file?", say yes — big files trigger that.'],
  ['Unzip', 'Archive → Ludo King_10.6.0.416.apk. Password on the archive, if any, was set when it was packed.'],
  ['Allow install', 'Settings → Apps → Special access → Install unknown apps → pick your browser or file manager.'],
  ['Open and play', 'Tap the APK, install, done. No Play Store round trip, no update nag.'],
];

const speed = [
  ['5 GHz Wi-Fi', '2.4 GHz caps around 8–10 MB/s even on good routers. Switch bands and watch it double.'],
  ['Wired / hotspot USB', 'Phone-to-PC tether over USB beats Wi-Fi for one big pull. ADB pull or just a cable transfer.'],
  ['Download manager', 'ADM or 1DM opens 8 parallel connections. GitHub and edge nodes both allow range requests, so this stacks.'],
  ['Skip the browser throttle', 'Chrome sometimes limps on 100 MB+ files. The same URL in a download manager runs flat out.'],
  ['Off-peak', 'Local ISP congestion after 8 PM is real. 3 AM pulls are routinely 2–3× faster.'],
];

const faq = [
  ['Is the download resumable?', 'Yes. Both mirrors answer HTTP range requests, so a dropped transfer picks up exactly where it stopped.'],
  ['Why a ZIP instead of a bare APK?', 'The archive is the exact artifact that was packed and hashed. Serving it byte-for-byte means the SHA-256 below always matches.'],
  ['Checksum mismatch?', 'Re-download with the other mirror. A mismatch means a truncated or proxied transfer, not a bad build.'],
  ['Does it need extra permissions?', 'Install permission only, the one Android asks for when you sideload anything.'],
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
          <span className="brand-text">ludofast<em>.edge</em></span>
        </div>
        <LiveBadge />
      </header>

      <section className="hero">
        <div className="badge">
          <span className="spark" />
          build {FILE.version} · verified {FILE.build}
        </div>

        <h1>
          {FILE.game}
          <span className="line2">downloaded at full line rate.</span>
        </h1>

        <p className="lede">
          One file. One tap. Served from an anycast edge with range requests enabled — so it
          resumes instead of restarting, and it does not care how far you are from a datacenter.
        </p>

        <DownloadButton label="Download Ludo King" />

        <div className="under-cta">
          <CopyChip value={FILE.sha256} short={`sha256 ${shortSha}`} />
          <span className="sep" />
          <span className="mono">{FILE.size} on the wire</span>
          <span className="sep" />
          <span className="mono">{FILE.uncompressed} unpacked</span>
        </div>
      </section>

      <section className="stats">
        <div>
          <span>payload</span>
          <strong>{FILE.size}</strong>
        </div>
        <div>
          <span>format</span>
          <strong>ZIP → APK</strong>
        </div>
        <div>
          <span>version</span>
          <strong>{FILE.version}</strong>
        </div>
        <div>
          <span>resume</span>
          <strong>enabled</strong>
        </div>
      </section>

      <section className="block">
        <h2>Mirrors</h2>
        <p className="sub">Both serve identical bytes. The first one usually wins on latency.</p>
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
        <h2>Squeeze the pipe</h2>
        <p className="sub">Same file, faster wire. Ranked by how much it actually gains.</p>
        <ul className="speed">
          {speed.map(([title, body]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ul>
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
          Unofficial mirror. {FILE.game} and its assets belong to their publisher. Page runs on
          Vercel, bytes ride the release CDN.
        </p>
      </footer>
    </main>
  );
}

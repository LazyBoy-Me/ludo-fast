'use client';

import { useEffect, useState } from 'react';
import { FILE } from '../lib/file';

export function DownloadButton({ mirror = 'edge', label }) {
  const [state, setState] = useState('idle');

  function go() {
    if (state !== 'idle') return;
    setState('go');
    window.location.href = `/api/dl?m=${mirror}`;
    setTimeout(() => setState('idle'), 4000);
  }

  return (
    <button className="dl" onClick={go} data-state={state}>
      <span className="dl-glow" aria-hidden="true" />
      <span className="dl-label">
        {state === 'idle' ? label || 'Download now' : 'Starting transfer…'}
      </span>
      <span className="dl-meta">
        {FILE.kind} · {FILE.size} · resume ok
      </span>
      <span className="dl-arrow" aria-hidden="true">
        ↓
      </span>
    </button>
  );
}

export function CopyChip({ value, short }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button className="copy" onClick={copy} title="Copy SHA-256">
      <code>{short || value}</code>
      <span>{copied ? 'copied' : 'copy'}</span>
    </button>
  );
}

export function MirrorCards() {
  return (
    <div className="mirrors">
      {FILE.mirrors.map((m, i) => (
        <div className="mirror" key={m.id}>
          <div className="mirror-head">
            <span className="dot" data-best={i === 0 || undefined} />
            <strong>{m.name}</strong>
            <em>{m.note}</em>
          </div>
          <p>{i === 0 ? `${m.meta} — anycast edge, nearest node wins.` : `${m.meta} — the build before the pawn fix.`}</p>
          <a href={`/api/dl?m=${m.id}`} className="mirror-link">
            pull file <span aria-hidden="true">↗</span>
          </a>
        </div>
      ))}
    </div>
  );
}

export function LiveBadge() {
  const [t, setT] = useState(null);
  useEffect(() => {
    const start = performance.now();
    fetch('/api/info', { cache: 'no-store' })
      .then((r) => r.json())
      .then(() => setT(Math.round(performance.now() - start)));
  }, []);
  return (
    <span className="live">
      <span className="ping" />
      {t === null ? 'checking edge…' : `edge warm · ${t} ms`}
    </span>
  );
}

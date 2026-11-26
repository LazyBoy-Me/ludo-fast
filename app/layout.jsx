import './globals.css';

export const metadata = {
  title: 'lazyludo · Ludo King 10.6.0.416 — Pawn Live Fix',
  description:
    'Modded Ludo King 10.6.0.416 with pawn (guti) positions sent over TCP STATUS and cloud status.json. Direct, resumable APK download.',
  openGraph: {
    title: 'lazyludo · Ludo King 10.6.0.416 — Pawn Live Fix',
    description: 'Pawn live fix APK. Direct edge-CDN download, resume supported.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#07080d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

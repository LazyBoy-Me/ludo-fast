import './globals.css';

export const metadata = {
  title: 'Ludo King 10.6.0.416 — Fast Download',
  description: 'Direct, resumable download of Ludo King 10.6.0.416. Served from an edge CDN. No queues, no ad gates.',
  openGraph: {
    title: 'Ludo King 10.6.0.416 — Fast Download',
    description: 'Direct edge-CDN download. Resume supported.',
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

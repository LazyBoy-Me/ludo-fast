// Single source of truth for the download metadata.
// Change the mirrors here and the whole site follows.

export const FILE = {
  game: 'Ludo King',
  version: '10.6.0.416',
  kind: 'APK',
  filename: 'LudoKing_10.6.0.416_PAWN_FIX.apk',
  bytes: 264390095,
  size: '252.1 MB',
  sha256: 'ecf2b55700af01629ca029aca69b53b4d8542093806773a058e7155f39709abe',
  build: '2026-11-26',
  tag: 'pawnfix',
  resign: true,
  mirrors: [
    {
      id: 'edge',
      name: 'Edge CDN',
      note: 'Fastest',
      meta: 'APK · 252.1 MB',
      url: process.env.MIRROR_EDGE || 'https://github.com/LazyBoy-Me/ludo-fast/releases/download/v10.6.0.416-pawnfix/LudoKing_10.6.0.416_PAWN_FIX.apk',
    },
    {
      id: 'previous',
      name: 'Previous build',
      note: 'ZIP',
      meta: 'ZIP · 157.6 MB',
      url: 'https://github.com/LazyBoy-Me/ludo-fast/releases/download/v10.6.0.416/Ludo-King_10.6.0.416.zip',
    },
  ],
};

export function mirrorById(id) {
  return FILE.mirrors.find((m) => m.id === id) || FILE.mirrors[0];
}

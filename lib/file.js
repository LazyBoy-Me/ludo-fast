// Single source of truth for the download metadata.
// Change the mirrors here and the whole site follows.

export const FILE = {
  game: 'Ludo King',
  version: '10.6.0.416',
  filename: 'Ludo-King_10.6.0.416.zip',
  inner: 'Ludo King_10.6.0.416.apk',
  bytes: 165226271,
  size: '157.6 MB',
  uncompressed: '252.2 MB',
  sha256: '2ca304c1bbe000ac2716890b817a427f0e04422dcdb0f5b753453eafe637c71c',
  build: '2026-11-24',
  mirrors: [
    {
      id: 'edge',
      name: 'Edge CDN',
      note: 'Fastest',
      url: process.env.MIRROR_EDGE || 'https://github.com/LazyBoy-Me/ludo-fast/releases/download/v10.6.0.416/Ludo-King_10.6.0.416.zip',
    },
    {
      id: 'gh',
      name: 'GitHub',
      note: 'Global',
      url: 'https://github.com/LazyBoy-Me/ludo-fast/releases/download/v10.6.0.416/Ludo-King_10.6.0.416.zip',
    },
  ],
};

export function mirrorById(id) {
  return FILE.mirrors.find((m) => m.id === id) || FILE.mirrors[0];
}

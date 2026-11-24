export const dynamic = 'force-dynamic';

import { FILE } from '../../../lib/file';

export async function GET() {
  return Response.json(
    {
      game: FILE.game,
      version: FILE.version,
      filename: FILE.filename,
      bytes: FILE.bytes,
      size: FILE.size,
      sha256: FILE.sha256,
      build: FILE.build,
      mirrors: FILE.mirrors.map(({ id, name, note }) => ({ id, name, note })),
    },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
  );
}

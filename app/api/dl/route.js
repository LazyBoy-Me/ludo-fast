export const dynamic = 'force-dynamic';

import { FILE, mirrorById } from '../../../lib/file';

export async function GET(request) {
  const url = new URL(request.url);
  const m = mirrorById(url.searchParams.get('m') || 'edge');
  return Response.redirect(m.url, 302);
}

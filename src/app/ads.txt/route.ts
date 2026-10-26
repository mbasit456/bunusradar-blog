export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const content = 'google.com, pub-6911732447309638, DIRECT, f08c47fec0942fa0\n';

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

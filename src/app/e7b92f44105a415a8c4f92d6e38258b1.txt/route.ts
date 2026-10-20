export async function GET() {
  const key = 'e7b92f44105a415a8c4f92d6e38258b1';

  return new Response(key, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

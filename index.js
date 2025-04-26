export default {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);
    const target = searchParams.get('url');

    if (!target) {
      return new Response(`
        <form action="/" method="GET">
          <input name="url" type="text" placeholder="Enter URL" style="width:300px;"/>
          <button type="submit">Go</button>
        </form>
      `, {
        headers: { 'content-type': 'text/html' },
      });
    }

    try {
      const res = await fetch(target);
      const content = await res.text();
      return new Response(content, {
        headers: { 'content-type': 'text/html' },
      });
    } catch (err) {
      return new Response(`Error: ${err.message}`, { status: 500 });
    }
  }
}

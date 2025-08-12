export async function api(path, { method = "GET", body } = {}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const init = { method, headers: { "Content-Type": "application/json" } };
  if (body) init.body = JSON.stringify(body);
  const r = await fetch(url, init);
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`API ${r.status}: ${text}`);
  }
  return r.json();
}

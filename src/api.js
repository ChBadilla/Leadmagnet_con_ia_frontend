const API_URL = process.env.REACT_APP_API_URL;

export async function submitQuiz(data) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);

  let res;
  try {
    res = await fetch(`${API_URL}/api/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: ctrl.signal,
    });
  } catch (e) {
    clearTimeout(t);
    throw new Error(`Network error: ${e.message}`);
  }
  clearTimeout(t);

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j?.error) msg += `: ${j.error}`;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}
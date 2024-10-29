const API = "http://localhost:3001/api";

export async function fetchFromApi(endpoint, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };

  const res = await fetch(`${API}${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return res.json();
}

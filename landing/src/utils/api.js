const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://lamarta.es/api/route.php";

export function getApiUrl(endpoint = "") {
  return endpoint ? `${API_BASE_URL}/${endpoint}` : API_BASE_URL;
}

// Caché en memoria de lecturas públicas (sin token) para no repetir peticiones al navegar.
const CACHE_TTL_MS = 60 * 1000;
const publicCache = new Map();

export async function apiFetch(endpoint, { method = "GET", data, token } = {}) {
  const cacheable = method === "GET" && !token;

  if (cacheable) {
    const cached = publicCache.get(endpoint);
    if (cached && Date.now() - cached.time < CACHE_TTL_MS) {
      return cached.payload;
    }
  } else if (method !== "GET") {
    publicCache.clear();
  }

  const headers = {};

  if (data !== undefined) {
    headers["Content-Type"] = "application/json; charset=utf-8";
  }

  if (token) {
    headers["x-api-key"] = token;
  }

  const response = await fetch(getApiUrl(endpoint), {
    method,
    headers,
    body: data !== undefined ? JSON.stringify(data) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  let payload;

  if (contentType.includes("application/json")) {
    payload = await response.json();
  } else {
    const textPayload = await response.text();

    try {
      payload = JSON.parse(textPayload);
    } catch {
      payload = textPayload;
    }
  }

  if (!response.ok) {
    const message = typeof payload === "object" && payload?.error
      ? payload.error
      : `HTTP ${response.status}`;
    throw new Error(message);
  }

  if (cacheable) {
    publicCache.set(endpoint, { time: Date.now(), payload });
  }

  return payload;
}

export function destroySession() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("tipo");
  sessionStorage.removeItem("id_usuario");
}

export function getSession() {
  return {
    token: sessionStorage.getItem("token"),
    tipo: sessionStorage.getItem("tipo"),
    idUsuario: sessionStorage.getItem("id_usuario"),
  };
}

export function toBooleanNumber(value) {
  return value ? 1 : 0;
}

export function formatEuro(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return "-";
  }

  return `${number.toFixed(2).replace(".", ",")}€`;
}

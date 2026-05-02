const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://lamarta.es/api/route.php";

export function getApiUrl(endpoint = "") {
  return endpoint ? `${API_BASE_URL}/${endpoint}` : API_BASE_URL;
}

export async function apiFetch(endpoint, { method = "GET", data, token } = {}) {
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

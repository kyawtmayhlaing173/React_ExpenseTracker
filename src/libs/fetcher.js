const api = "http://localhost:8000";

export async function postUser(data) {
  const res = await fetch(`${api}/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res.json();
  }

  const errorResponse = await res.json();
  const errorMessage = errorResponse["msg"] || "Something went wrong";
  throw errorMessage;
}

export async function postLogin(data) {
  const res = await fetch(`${api}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res.json();
  }

  const errorResponse = await res.json();
  const errorMessage = errorResponse["msg"] || "Something went wrong";
  throw errorMessage;
}

export async function fetchExpenses(token) {
  const res = await fetch(`${api}/expenses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  const errorResponse = await res.json();
  const errorMessage = errorResponse["msg"] || "Something went wrong";
  throw errorMessage;
}

// TODO: Remove token from parameter
export async function postExpenses(data, token) {
  const res = await fetch(`${api}/expense`, {
    method: "POST",
    body: JSON.stringify({
      description: data.description,
      amount: Number(data.amount),
      category: data.category,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    // TODO: Create model and return modal
    return res.json();
  }
  // TODO: Update error response
  const errorResponse = await res.json();
  const errorMessage = errorResponse["msg"] || "Something went wrong";
  throw errorMessage;
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function verifyToken() {
  const token = getToken();
  const res = await fetch(`${api}/verify`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if (res.ok) {
    return res.json();
  }
  return false;
}

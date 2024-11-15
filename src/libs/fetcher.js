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

export const BASEURL = "https://auth.nomoreparties.co";

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
}

export function register(password, email) {
  return fetch(`${BASEURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then((res) => handleResponse(res));
}

export function authorize(password, email) {
  return fetch(`${BASEURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then((res) => handleResponse(res));
}

export const getContent = (token) => {
  return fetch(`${BASEURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

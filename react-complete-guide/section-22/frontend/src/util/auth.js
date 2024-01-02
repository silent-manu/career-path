import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("tokenExpiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function setAuthToken(token) {
  const tokenExpiration = new Date();
  tokenExpiration.setHours(tokenExpiration.getHours() + 1);

  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiration", tokenExpiration);
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  } 
  
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED_TOKEN";
  }

  return token;
}

export function removeAuthToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiration");
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}

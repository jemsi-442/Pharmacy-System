import { useEffect, useState } from "react";

function readUser() {
  try {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(localStorage.getItem("user") || "null") : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState(readUser);

  useEffect(() => {
    const syncUser = () => setUser(readUser());
    window.addEventListener("storage", syncUser);
    window.addEventListener("auth-change", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);

  const login = ({ token, user: loggedInUser }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("userId", String(loggedInUser._id));
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
  };

  return { user, login, logout };
}

import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const API_URL = "http://localhost:5555/api";

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const r = await fetch(`${API_URL}/check_session`, {
        credentials: "include",
      });
      if (!r.ok) {
        throw new Error("💥 Error");
      }
      const data = await r.json();
      if (data.logged_in) {
        setLoggedIn(true);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // always stop loading, success or fail
    }
  }

    async function signup(credentials) {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        await checkSession();
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, error: error.error };
      }
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  }

  async function login(credentials) {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        await checkSession();
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, error: error.error };
      }
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  }

  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    loading,
    loggedIn,
    user,
    login,
    logout,
    signup
  };

    return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )}
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL, SUCCESS_CODE } from "../config";
import axios from "axios";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => checkUserLogin(), []);
  //register
  const register = async (username, email, password) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === SUCCESS_CODE) {
      setUser(data.user);
    } else {
      setError(data.message);
      setError(null);
    }
  };
  //login
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === SUCCESS_CODE) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };
  //logout
  const logout = async () => {
    if (confirm("Are you sure logout?")) {
      const res = await fetch(`${NEXT_URL}/api/logout`, { method: "POST" });
      if (res.status === SUCCESS_CODE) {
        setUser(null);
        router.push("/");
      }
    }
  };
  //check user login
  const checkUserLogin = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/users`);
    const data = await res.json();
    if (res.status === SUCCESS_CODE) {
      setUser(data.user);
      // router.push("/account/dashboard");
    } else {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

axios.defaults.baseURL = "https://api.queen.kitchen"; 
axios.defaults.withCredentials = true;

// Helper function to decode JWT
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null); // Add this

  useEffect(() => {
    const initSession = async () => {
      try {
        // Try to refresh token
        const refreshResponse = await axios.post("/auth/refresh");
        
        // If refresh successful, decode the token to get user info
        if (refreshResponse.data?.accessToken) {
          const token = refreshResponse.data.accessToken;
          setAccessToken(token); // Store the token
          
          const decoded = decodeToken(token);
          
          if (decoded) {
            // Create user object from token payload
            setUser({
              id: decoded.sub,
              email: decoded.email,
              role: decoded.role,
            });
          }
        }
      } catch (err) {
        // Session expired or invalid - user needs to login
        console.log("No valid session");
        setUser(null);
        setAccessToken(null);
        
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error("Logout failed:", err);
      setUser(null);
      setAccessToken(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};
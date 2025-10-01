// src/layouts/ProtectedUserLayout.jsx
import { Outlet, Navigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../loaders/Loader";
import { UserContext } from "../context/AuthContext";
import axios from "axios";

function ProtectedUserLayout() {
  const { user, token, loading, setUser } = useContext(UserContext);
  const [fetchingUser, setFetchingUser] = useState(false);
  const location = useLocation();

  // ✅ If token exists but no user, fetch from `/users/me`
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user && !fetchingUser) {
        setFetchingUser(true);
        try {
          const res = await axios.get("/users/me");
          setUser(res.data);
        } catch (err) {
          console.error("❌ Failed to fetch user profile:", err);
        } finally {
          setFetchingUser(false);
        }
      }
    };
    fetchUser();
  }, [token, user, fetchingUser, setUser]);

  if (loading || fetchingUser) return <Loader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "USER" && user.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedUserLayout;
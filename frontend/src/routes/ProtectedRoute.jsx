import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";
import AgilifyLoader from "../ui/AgilifyLoader";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get("/auth/me");
        setValid(true);
      } catch (err) {
        localStorage.removeItem("token");
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) {
    return <AgilifyLoader />;
  }

  return valid ? children : <Navigate to="/login" replace />;
}

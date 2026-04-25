import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import AgilifyLoader from "../ui/AgilifyLoader";

export default function CheckWorkspace() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWorkspace = async () => {
      try {
        const res = await API.get("/workspaces/all-workspace");

        if (res.data.length === 0) {
          navigate("/create-workspace");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        if (err.response?.data?.message?.includes("slug")) {
          toast.error("Workspace already exists");
        } else {
          toast.error("Error creating workspace");
        }
      } finally {
        setLoading(false);
      }
    };

    checkWorkspace();
  }, [navigate]);

  if (loading) {
    return <AgilifyLoader label="Checking your workspace..." />;
  }

  return null;
}

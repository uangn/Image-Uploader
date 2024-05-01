import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../stores/authContext";

const useAuthCheck = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!ctx.user) {
          const jwtToken = localStorage.getItem("token");
          const response = await fetch("http://localhost:8080/auth/login", {
            headers: {
              Authorization: "Bearer " + jwtToken,
            },
          });
          if (response.ok) {
            const user = (await response.json()) as { username: string };
            ctx.setUser({ name: user?.username! });
          } else {
            throw new Error("w");
          }
        }
      } catch (error) {
        navigate("/auth/login");
      }
    };

    checkAuth();
  }, [ctx, navigate]);
  return ctx;
};

export default useAuthCheck;

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNotify } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const notify = useNotify();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      notify("Помилка автентифікації через Google", { type: "error" });
      navigate("/login");
      return;
    }

    if (token) {
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((user) => {
          if (!user.roles || !user.roles.includes("admin")) {
            notify("Доступ заборонено. Потрібна роль адміністратора.", {
              type: "error",
            });
            navigate("/login");
            return;
          }

          localStorage.setItem("token", token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              emailVerified: true,
              avatar: user.avatar,
              roles: user.roles,
            })
          );

          navigate("/");
          window.location.reload();
        })
        .catch(() => {
          notify("Помилка отримання даних користувача", { type: "error" });
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, notify]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>Автентифікація...</Typography>
    </Box>
  );
};

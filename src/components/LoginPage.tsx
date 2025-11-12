import { Login, LoginForm, useNotify } from "react-admin";
import { Button, CardContent, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { API_URL } from "../providers/authProvider";
import { useEffect, useRef } from "react";

const CustomLoginForm = () => {
  const notify = useNotify();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    const googleToken = params.get("googleToken");
    const refreshToken = params.get("refreshToken");

    if (errorParam) {
      processedRef.current = true;
      let errorMessage = "Помилка автентифікації через Google";

      if (errorParam === "user_not_found") {
        errorMessage = "Користувач не знайдений";
      } else if (errorParam === "not_admin") {
        errorMessage = "Доступ тільки для адміністратора";
      } else if (errorParam === "auth_failed") {
        errorMessage = "Не вдалося авторизуватися через Google";
      }

      notify(errorMessage, { type: "error" });
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (googleToken && refreshToken) {
      processedRef.current = true;

      fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${decodeURIComponent(googleToken)}` },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((user) => {
          if (!user.roles?.includes("admin")) {
            notify("Доступ тільки для адміністратора", { type: "error" });
            window.history.replaceState({}, "", window.location.pathname);
            return;
          }

          localStorage.setItem("token", decodeURIComponent(googleToken));
          localStorage.setItem(
            "refreshToken",
            decodeURIComponent(refreshToken)
          );
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              emailVerified: user.isEmailVerified,
              avatar: user.avatar,
              roles: user.roles,
            })
          );

          window.location.href = "/";
        })
        .catch((error) => {
          console.error("User fetch error:", error);
          notify("Помилка отримання даних користувача", { type: "error" });
          window.history.replaceState({}, "", window.location.pathname);
        });
    }
  }, [notify]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google?state=admin`;
  };

  return (
    <>
      <LoginForm />
      <CardContent sx={{ paddingTop: 0 }}>
        <Divider sx={{ mb: 2 }}>or</Divider>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          color="primary"
        >
          Увійти через Google
        </Button>
      </CardContent>
    </>
  );
};

export const LoginPage = () => (
  <Login>
    <CustomLoginForm />
  </Login>
);

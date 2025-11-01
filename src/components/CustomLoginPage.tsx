import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useLogin, useNotify } from "react-admin";
import { API_URL } from "../providers/authProvider";

export const CustomLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useLogin();
  const notify = useNotify();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleToken = params.get("googleToken");
    const error = params.get("error");

    if (error) {
      let errorMessage = "Помилка автентифікації через Google";

      if (error === "user_not_found") {
        errorMessage = "Користувач не знайдений";
      } else if (error === "not_admin") {
        errorMessage = "Доступ тільки для адміністратора";
      } else if (error === "auth_failed") {
        errorMessage = "Не вдалося авторизуватися через Google";
      }

      notify(errorMessage, { type: "error" });
      setError(errorMessage);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (googleToken) {
      setLoading(true);

      fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${googleToken}` },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((user) => {
          if (!user.roles?.includes("admin")) {
            notify("Доступ тільки для адміністратора", {
              type: "error",
            });
            setLoading(false);
            window.history.replaceState({}, "", window.location.pathname);
            return;
          }

          localStorage.setItem("token", googleToken);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/";
        })
        .catch(() => {
          notify("Помилка отримання даних користувача", { type: "error" });
          setLoading(false);
          window.history.replaceState({}, "", window.location.pathname);
        });
    }
  }, [notify]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ username: email, password });
    } catch (err) {
      setError((err as Error).message || "Помилка входу");
      notify("Помилка входу", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google?state=admin`;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card sx={{ minWidth: 400, maxWidth: 500 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            English Learning Admin
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            paragraph
          >
            Вхід до адмін-панелі
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Вхід..." : "Увійти"}
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>АБО</Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{
              borderColor: "#4285f4",
              color: "#4285f4",
              "&:hover": {
                borderColor: "#357ae8",
                backgroundColor: "rgba(66, 133, 244, 0.04)",
              },
            }}
          >
            Увійти через Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

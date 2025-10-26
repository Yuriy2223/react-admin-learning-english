import type { AuthProvider } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Помилка входу" }));
      throw new Error(error.message || "Невірний email або пароль");
    }

    const data = await response.json();

    const { accessToken, user } = data;

    if (!user.emailVerified) {
      throw new Error("Email не підтверджено. Перевірте пошту.");
    }

    const meResponse = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!meResponse.ok) {
      throw new Error("Не вдалося отримати дані користувача");
    }

    const fullUser = await meResponse.json();

    if (!fullUser.roles || !fullUser.roles.includes("admin")) {
      throw new Error("Доступ заборонено. Потрібна роль адміністратора.");
    }

    localStorage.setItem("token", accessToken);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        avatar: fullUser.avatar,
        roles: fullUser.roles,
      })
    );

    return Promise.resolve();
  },

  logout: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    return token ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return Promise.reject();
    }

    try {
      const user = JSON.parse(userStr);
      return Promise.resolve({
        id: user.id,
        fullName: user.name || user.email.split("@")[0],
        avatar: user.avatar,
      });
    } catch {
      return Promise.reject();
    }
  },

  getPermissions: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return Promise.reject();
    }

    try {
      const user = JSON.parse(userStr);

      return Promise.resolve(user.roles || []);
    } catch {
      return Promise.reject();
    }
  },
};

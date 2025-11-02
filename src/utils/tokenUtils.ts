import { API_URL } from "../providers/authProvider";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export const refreshToken = async (): Promise<string> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.status}`);
      }

      const data = await response.json();
      const { accessToken } = data;

      if (!accessToken) {
        throw new Error("No accessToken received");
      }

      localStorage.setItem("token", accessToken);

      return accessToken;
    } catch (error) {
      console.error("[RefreshToken] Error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

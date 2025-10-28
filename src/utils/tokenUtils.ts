import { API_URL } from "../providers/authProvider";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export const refreshToken = async (): Promise<string> => {
  if (isRefreshing && refreshPromise) {
    console.log("[RefreshToken] Already refreshing, waiting...");
    return refreshPromise;
  }

  console.log("[RefreshToken] Starting token refresh...");
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
        const errorData = await response.json().catch(() => ({}));
        console.error("[RefreshToken] Failed:", response.status, errorData);
        throw new Error(`Failed to refresh token: ${response.status}`);
      }

      const data = await response.json();
      const { accessToken } = data;

      if (!accessToken) {
        console.error("[RefreshToken] No accessToken in response");
        throw new Error("No accessToken received");
      }

      localStorage.setItem("token", accessToken);
      console.log("[RefreshToken] Success! New token saved");
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

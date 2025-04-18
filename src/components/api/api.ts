export const BASE_URL = "http://api.alikooshesh.ir:3000";

export const API_KEY =
  "ahmadreza-mohammadiDf4FntTt7eDYpjB1y6JrubLGirgncMnWPauJW8NTAyK7FvVX46U3oFl1eQUJCxKcs1KnEsp2nYuX90qx3G2DgUxXBkBSIqbu1gqNVGpKjB3DH";

export const ACCESS_TOKEN = localStorage.getItem("accessToken") || null;
export const ADMIN_NAME = localStorage.getItem("username") || null;

export const header = {
  api_key: API_KEY,
  "Content-Type": "application/json",
};

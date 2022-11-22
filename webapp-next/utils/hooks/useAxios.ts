import axios from "axios";
import { AxiosInstance } from "axios";

const NEXT_PUBLIC_STRAPI_URL: string = process.env
  .NEXT_PUBLIC_STRAPI_URL as string;
const NEXT_PUBLIC_JWT_STORAGE_KEY: string = process.env
  .NEXT_PUBLIC_JWT_STORAGE_KEY as string;

const getToken = (cookies: string): string | null => {
  if (!cookies) return null;

  const cookiesObject = cookies.split("; ").reduce((prev: any, current) => {
    const [name, ...value] = current.split("=");
    prev[name] = value.join("=");
    return prev;
  }, {});
  return cookiesObject[NEXT_PUBLIC_JWT_STORAGE_KEY] || null;
};

const getInstance = (token: string | null): AxiosInstance => {
  const axiosApiInstance = axios.create({
    baseURL: NEXT_PUBLIC_STRAPI_URL + "/api",
  });

  axiosApiInstance.interceptors.request.use(
    (config: any) => {
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }

      config.params = { ...(config.params || {}), populate: "*" };

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return axiosApiInstance;
};

export default function useAxios(cookies: string) {
  let token: string | null = null;
  if (
    cookies &&
    (cookies.includes("next-auth.session-token") ||
      cookies.includes(NEXT_PUBLIC_JWT_STORAGE_KEY))
  ) {
    token = getToken(cookies);
  } else if (cookies && !cookies.includes("=")) {
    token = cookies;
  }
  return getInstance(token);
}

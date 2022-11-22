import cookie from "js-cookie";

const NEXT_PUBLIC_JWT_STORAGE_KEY: string = process.env
  .NEXT_PUBLIC_JWT_STORAGE_KEY as string;

export const setJwt = (jwt: string) => {
  cookie.set(NEXT_PUBLIC_JWT_STORAGE_KEY, jwt, {
    expires: 1,
    path: "/",
  });
};

export const getJwt = (): string | null => {
  return cookie.get(NEXT_PUBLIC_JWT_STORAGE_KEY) || null;
};

export const destroyJwt = () => {
  cookie.remove(NEXT_PUBLIC_JWT_STORAGE_KEY);
};

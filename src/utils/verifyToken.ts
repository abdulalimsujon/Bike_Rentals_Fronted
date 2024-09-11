import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const decode = jwtDecode(token);
  return decode;
};

import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
export interface CustomJwtPayload extends JwtPayload {
  role: string; // Add other fields as needed
  userId: string;
  exp: number;
  iat: number;
}

export const verifyToken = (token: string): CustomJwtPayload => {
  const decode = jwtDecode(token);

  return decode as CustomJwtPayload;
};

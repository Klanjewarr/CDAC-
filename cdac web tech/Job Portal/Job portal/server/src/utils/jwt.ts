import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export interface ITokenPayload {
  id: string;
  role: string;
}

export const generateTokens = (userId: mongoose.Types.ObjectId | string, role: string) => {
  const payload: ITokenPayload = {
    id: userId.toString(),
    role,
  };

  const secret = process.env.JWT_SECRET || "fallback_secret_cdac";
  const refreshSecret = process.env.JWT_REFRESH_SECRET || "fallback_refresh_cdac";

  const accessToken = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): ITokenPayload => {
  const secret = process.env.JWT_SECRET || "fallback_secret_cdac";
  return jwt.verify(token, secret) as ITokenPayload;
};

export const verifyRefreshToken = (token: string): ITokenPayload => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET || "fallback_refresh_cdac";
  return jwt.verify(token, refreshSecret) as ITokenPayload;
};

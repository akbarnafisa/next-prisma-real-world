import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import {
  PUBLIC_JWK,
  TOKEN_ALG,
  TOKEN_KID,
  TOKEN_PREFIX,
  TOKEN_TTL,
} from "../constants";
import { AuthPayload } from "./types/user.type";
import slug from 'slug';

export const encodePassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// TODO: handle if the jwt token is false
export const issueToken = (payload: object) => {
  const privateKey = JSON.parse(process.env.PRIVATE_JWK as string);
  return jwt.sign(payload, jwkToPem(privateKey, { private: true }), {
    algorithm: TOKEN_ALG,
    expiresIn: TOKEN_TTL,
    keyid: TOKEN_KID,
  });
};

export const checkPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

const verifyToken = <T> (token: string): T => {
  const payload = jwt.verify(token, jwkToPem(PUBLIC_JWK), {
    algorithms: [TOKEN_ALG],
  });
  return payload as T
};

export const loadCurrentUser = (authorization: string | undefined) => {
  if (!authorization || !authorization.startsWith(TOKEN_PREFIX)) {
    return;
  }

  const token = authorization.split(TOKEN_PREFIX)[1];
  const payload = verifyToken<AuthPayload>(token);

  return payload.userId
};


export const slugify = (title: string): string => {
  return `${slug(title, { lower: true })}-${((Math.random() * Math.pow(36, 6)) | 0).toString(36)}`;
};

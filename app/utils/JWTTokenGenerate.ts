import jwt, { JwtPayload } from "jsonwebtoken";
export const JWTTokenGenerate = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded?.id as string;
  } catch (error) {
    return null;
  }
};

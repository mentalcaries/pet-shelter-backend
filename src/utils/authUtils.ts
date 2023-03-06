import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const compareHashedPassword = async (
  hashedPassword: string,
  password: string
) => {
  return bcrypt.compare(hashedPassword, password);
};

const generateToken = (id: string) => {
  const { JWT_SECRET, JWT_EXPIRATION } = process.env;

  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRATION as string,
  });
};

export { hashPassword, compareHashedPassword, generateToken };

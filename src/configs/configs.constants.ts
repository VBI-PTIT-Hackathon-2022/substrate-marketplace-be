import { config } from 'dotenv';
config();

export const databaseConfig = {
  type: process.env.DB_TYPE,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: process.env.DB_SYNCHRONIZE,
};

export const appConfig = {
  port: process.env.APP_PORT || '3001',
};

export const paginationConfig = {
  pageSize: 2,
};
export const bcryptConfig = {
  saltRound: process.env.BCRYPT_SALT_ROUNDS,
};

export const jwtConfig = {
  secret_AT: process.env.JWT_SECRET,
  secret_RT: process.env.JWT_SECRET_RT,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export const facebookConfig = {
  id: process.env.FACEBOOK_ID,
  secret: process.env.FACEBOOK_SECRET,
};

export const googleConfig = {
  id: process.env.GOOGLE_ID,
  secret: process.env.GOOGLE_SECRET,
};

export const stripeConfig = {
  public_key: process.env.STRIPE_PUBLIC_KEY,
  secret_key: process.env.STRIPE_SECRET_KEY,
};

export const awsBucket = {
  avatarsCategory: process.env.AVATARCATEGORY,
  imgProduct: process.env.IMGPRODUCT,
};

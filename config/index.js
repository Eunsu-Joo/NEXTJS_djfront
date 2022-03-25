const qs = require("qs");
export const API_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:1337`;
// 환경변수 process.env.NEXT_PUBLIC_API_URL가 있으면 요거. 없으면 localhost
export const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || `http://localhost:3000`;
export const PER_PAGE = 3;
export const FORBIDDEN_CODE = 403;
export const NOT_ALLOWED_CODE = 405;
export const NOT_FOUND_CODE = 400;
export const SUCCESS_CODE = 200;
export const POPULATE_FILTER = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true }
);

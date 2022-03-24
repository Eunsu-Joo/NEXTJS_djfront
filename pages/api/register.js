import { API_URL, SUCCESS_CODE } from "@/config/index";
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const strApi = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await strApi.json();
    if (strApi.status === SUCCESS_CODE) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(SUCCESS_CODE).json({ user: data.user });
    } else {
      res.status(strApi.status).json({ message: data.error.name });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(NOT_ALLOWED_CODE).json({ message: `Method ${res.status} not allowed` });
  }
};

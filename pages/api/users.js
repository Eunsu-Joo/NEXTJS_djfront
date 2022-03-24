import { API_URL, FORBIDDEN_CODE, SUCCESS_CODE } from "@/config/index";
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(FORBIDDEN_CODE).json({ message: "Not Authorized" });
      return;
    }
    const { token } = cookie.parse(req.headers.cookie);
    const strRes = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await strRes.json();
    if (strRes.status === SUCCESS_CODE) {
      res.status(SUCCESS_CODE).json({ user });
    } else {
      res.status(FORBIDDEN_CODE).json({ message: "User Forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(NOT_ALLOWED_CODE).json({ message: `Method ${res.status} not allowed` });
  }
};

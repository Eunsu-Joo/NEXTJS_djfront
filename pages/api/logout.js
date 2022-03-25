/* eslint-disable import/no-anonymous-default-export */
import { NOT_ALLOWED_CODE } from "@/config/index";
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Success Logout" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(NOT_ALLOWED_CODE).json({ message: `Method ${res.status} not allowed` });
  }
};

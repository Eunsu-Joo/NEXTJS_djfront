import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { register, error } = useContext(AuthContext);
  useEffect(() => error && toast.error(error));
  const pwRegEx = /(?=.*[a-z])(?=.*[A-Z]).{6,15}/;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmptyFiled = Object.values({ username, email, password }).some((elem) => elem === "");

    if (isEmptyFiled) {
      toast.error("Please fill all inputs");
      return false;
    }
    if (password !== passwordConfirm) {
      toast.error("Password do not match");
      return false;
    }
    if (!pwRegEx.test(password)) {
      toast.error("Password must includes 6 to 15 letters and at least 1 uppercase letter");
      return false;
    }
    register(username, email, password);
    toast.success("Success Register!");
  };

  return (
    <Layout title="User Registration">
      <div className="authPage">
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer hideProgressBar />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}

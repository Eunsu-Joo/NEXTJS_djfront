import React, { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import styles from "./Header.module.scss";
import Search from "../Search";
import AuthContext from "@/context/AuthContext";
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li className={styles.link}>
            <Link href={{ pathname: "/events", query: { page: 1 } }}>
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <>
              <li className={styles.link}>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li className={styles.link}>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li className={styles.username}>
                <span>{user.username}</span>
              </li>
              <li>
                <button onClick={() => logout()} className="btn-secondary btn-icon">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

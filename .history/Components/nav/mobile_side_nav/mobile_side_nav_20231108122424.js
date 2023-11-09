import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import styles from "./mobile_side_nav.module.css";
import { MyContext } from "@/context/global_context";

const SideMenu = (props) => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(props.isMenuOpen);

  const global_context = useContext(MyContext);

  useEffect(() => {
    setMenuOpen(props.isMenuOpen);
  }, [props.isMenuOpen]);

  const menuStyle = {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
    width: "70vw",
    opacity: menuOpen ? 1 : 0, // Adjust opacity instead of visibility
    transition: "transform .3s ease-in-out, opacity .3s ease-in-out", // Use transition for transform and opacity
    position: "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    backgroundColor: "black",
    overflowX: "hidden",
    padding: "1rem",
    zIndex: "999",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "0.5rem 1rem",
  };

  function closeMenu() {
    global_context.update_mobile_nav_bool_function(!menuOpen);
    menuOpen
      ? (document.documentElement.style.overflow = "auto")
      : (document.documentElement.style.overflow = "hidden");
  }
  return (
    <div>
      <div style={menuStyle}>
        <div className={styles.user_info_container}>
          <li className={styles.user_photo_container}>
            <Image
              className={styles.user_photo}
              src={user?.photoURL}
              alt="user_photo"
              height="50"
              width="50"
            ></Image>
          </li>

          <p className={styles.displayName}>{user["displayName"]}</p>
        </div>
        <Link
          href="/"
          style={linkStyle}
          className={styles.aa}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          href="/leaderboard"
          style={linkStyle}
          className={styles.aa}
          onClick={closeMenu}
        >
          Leaderboard
        </Link>
        <Link
          href="/legal/about_us"
          style={linkStyle}
          className={styles.aa}
          onClick={closeMenu}
        >
          About
        </Link>
        <li
          onClick={() => {
            auth.signOut();
            closeMenu();
          }}
          className={styles.aa}
          href="#"
          style={linkStyle}
        >
          Logout -&gt;
        </li>
      </div>
    </div>
  );
};

export default SideMenu;

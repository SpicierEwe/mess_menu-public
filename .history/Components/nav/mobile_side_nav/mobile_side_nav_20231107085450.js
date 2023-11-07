import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import styles from "./mobile_side_nav.module.css";

const SideMenu = (props) => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(props.isMenuOpen);

  useEffect(() => {
    setMenuOpen(props.isMenuOpen);
  }, [menuOpen, props.isMenuOpen]);

  const menuStyle = {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
    width: "70vw",
    opacity: menuOpen ? 1 : 0, // Adjust opacity instead of visibility
    transition: "transform 1s ease-in-out, opacity 1s ease-in-out", // Use transition for transform and opacity
    position: "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    backgroundColor: "black",
    overflowX: "hidden",
    padding: "1rem",
    zIndex: "99",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "0.5rem 1rem",
  };

  return (
    <div>
      <div style={menuStyle}>
        <div
          className={styles.user_info_container}
          onClick={() => {
            set_is_dropdown_open(!is_dropdown_open);
          }}
        >
          <li className={styles.user_photo_container}>
            <Image
              className={styles.user_photo}
              src={user?.photoURL}
              alt="user_photo"
              height="50"
              width="50"
            ></Image>{" "}
          </li>

          <p className={styles.displayName}>{user["displayName"]}</p>
        </div>

        <Link href="#" style={linkStyle}>
          Home
        </Link>
        <Link href="#" style={linkStyle}>
          About
        </Link>
        <li
          onClick={() => {
            auth.signOut();
            setMenuOpen(false);
          }}
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

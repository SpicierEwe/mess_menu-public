import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Image from "next/image";

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
    width: menuOpen ? "70vw" : "0",
    visibility: menuOpen ? "visible" : "hidden",
    transition: "0.5s ease-in-out",
    position: "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    backgroundColor: "#333",
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
        <div className={styles.user_info}>
          <Image src={user.photoURL} alt="logo" height="70" width="70"></Image>
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

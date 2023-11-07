import Link from "next/link";
import { useEffect, useState } from "react";

const SideMenu = (props) => {
  const [menuOpen, setMenuOpen] = useState(props.isMenuOpen);

  useEffect(() => {
    setMenuOpen(props.isMenuOpen);
  }, [menuOpen, props.isMenuOpen]);

  const menuStyle = {
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
        <Link href="#" style={linkStyle}>
          Home
        </Link>
        <Link href="#" style={linkStyle}>
          Linkbout
        </Link>
        <Link href="#" style={linkStyle}>
          Services
        </Link>
        <Link href="#" style={linkStyle}>
          Linkt
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;

import { useEffect, useState } from "react";

const SideMenu = (props) => {
  const [menuOpen, setMenuOpen] = useState(props.isMenuOpen);

  useEffect(() => {
    setMenuOpen(props.isMenuOpen);
  }, [menuOpen, props.isMenuOpen]);

  const menuStyle = {
    width: menuOpen ? "70vw" : "70vh",
    // visibility: menuOpen ? "visible" : "hidden",
    transition: "0.5s ease-in-out",
    position: "fixed",
    top: "0",
    left: "0",
    height: "100%",
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
        <a href="#" style={linkStyle}>
          Home
        </a>
        <a href="#" style={linkStyle}>
          About
        </a>
        <a href="#" style={linkStyle}>
          Services
        </a>
        <a href="#" style={linkStyle}>
          Contact
        </a>
      </div>
    </div>
  );
};

export default SideMenu;

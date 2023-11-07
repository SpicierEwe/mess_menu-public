import { useState } from "react";

const MobileSideMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuStyle = {
    width: "70vw",
    transition: "0.5s",
    position: "fixed",
    top: "0",
    left: "0",
    height: "100%",
    backgroundColor: "#333",
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

export default MobileSideMenu;

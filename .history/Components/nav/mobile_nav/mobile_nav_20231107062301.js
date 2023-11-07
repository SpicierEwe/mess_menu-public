import { useState } from "react";

const MobileSideMenu = (props) => {
  const [menuOpen, setMenuOpen] = useState(props.isMwnuOpen);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuStyle = {
    width: menuOpen ? "250px" : "0",
    visibility: menuOpen ? "visible" : "hidden",
    transition: "0.5s",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    backgroundColor: "#333",
    overflowX: "hidden",
    padding: "1rem",
    zindex: "9999999",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "0.5rem 1rem",
  };

  return (
    <div>
      <button onClick={toggleMenu}>Open Menu</button>
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

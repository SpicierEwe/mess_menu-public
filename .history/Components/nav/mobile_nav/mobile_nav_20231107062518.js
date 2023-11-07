import { useState } from "react";

const MobileSideMenu = (props) => {
  const [menuOpen, setMenuOpen] = useState(props.isMwnuOpen);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
};

export default MobileSideMenu;

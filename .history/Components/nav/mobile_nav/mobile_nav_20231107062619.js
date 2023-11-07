import { useState } from "react";

const MobileSideMenu = (props) => {
  const [menuOpen, setMenuOpen] = useState(props.isMwnuOpen);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
    </div>
  );
};

export default MobileSideMenu;

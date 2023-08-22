import React from "react";
import './HeaderStyles.css'
import { useTheme } from "../../CustomHooks/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [toggle, dark] = useTheme();
  return (
    <div className="navbar">
      <div className="left"></div>
      <div className="right">
        <button onClick={toggle} className="theme" >
        <FontAwesomeIcon icon={dark ? faSun : faMoon} style={{ color: dark ? "black" : "black" }} />
        </button>
      </div>
    </div>
  );
};
export default Header;

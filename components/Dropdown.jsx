import React from "react";
import MenuItems from "./MenuItems";

const Dropdown = ({ submenu, drowdown, depthLevel }) => {
  depthLevel = depthLevel + 1;

  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${drowdown ? "show" : ""}`}>
      {submenu.map((item, index) => {
        return (
          <MenuItems
            item={item}
            key={index}
            depthLevel={depthLevel}
          ></MenuItems>
        );
      })}
    </ul>
  );
};

export default Dropdown;

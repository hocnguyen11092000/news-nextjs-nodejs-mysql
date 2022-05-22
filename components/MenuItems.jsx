import React, { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";
import Link from "next/link";

function MenuItems({ item, depthLevel }) {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!dropdown && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMoseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMoseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <div>
      <li
        className="menu-items"
        ref={ref}
        onMouseEnter={onMoseEnter}
        onMouseLeave={onMoseLeave}
      >
        {item.sub ? (
          <>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={() => setDropdown((pre) => !pre)}
            >
              <Link
                href={{
                  pathname: `/category/${item.id}`,
                  // query: { name: item.name },
                }}
              >
                <span> {item.name}</span>
              </Link>

              {depthLevel > 0 ? (
                <span style={{ position: "relative", left: "10px" }}>
                  &raquo;
                </span>
              ) : (
                <span className="arrow"></span>
              )}
            </button>
            <Dropdown
              depthLevel={depthLevel}
              submenu={item.sub}
              drowdown={dropdown}
            ></Dropdown>
          </>
        ) : (
          <Link
            href={{
              pathname: `/category/${item.id}`,
              // query: { name: item.name },
            }}
          >
            {item.name}
          </Link>
        )}
      </li>
    </div>
  );
}

export default MenuItems;

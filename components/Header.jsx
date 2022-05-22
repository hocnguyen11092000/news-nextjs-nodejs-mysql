import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import MenuItems from "./MenuItems";
import styles from "../styles/header.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function Header() {
  const { state, dispatch } = useContext(DataContext);
  const handleToggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL_SEARCH" });
  };

  return (
    <>
      <div className={cx("header")}>
        <div className={cx("header-wrapper")}>
          <div className={cx("header-logo")}>
            <Link href="/">next news</Link>
          </div>
          <ul className="menus">
            {state.categories.map((menu, index) => {
              const depthLevel = 0;
              return (
                <MenuItems item={menu} key={index} depthLevel={depthLevel} />
              );
            })}
          </ul>
          <div className={cx("header-info")}>
            <span className={cx("header-info-search")}>
              <FontAwesomeIcon icon={faSearch} onClick={handleToggleModal} />
            </span>
            <span className="header-info-user">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
}

export default Header;

import React from "react";
import styles from "./modal.module.scss";
import { useContext, useEffect } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../store/GlobalState";

const cx = classNames.bind(styles);

function Modal({ children, show }) {
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    window.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("modal_modal__CPpAi")) {
        dispatch({ type: "CLOSE_MODAL" });
      }
    });
  }, [dispatch]);

  const handleToggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL_SEARCH" });
  };

  return (
    <div
      className={cx("modal")}
      style={show ? { opacity: "1", visibility: "visible" } : {}}
    >
      <div
        className={cx("modal-content")}
        style={
          show
            ? {
                opacity: "1",
                visibility: "visible",
                transform: "translate(-50%, -50%)",
              }
            : {}
        }
      >
        {children}
        <div className={cx("close-icon")}>
          <FontAwesomeIcon
            icon={faClose}
            onClick={handleToggleModal}
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}

export default Modal;

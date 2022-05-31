import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles["footer__copyright"]}>
        Copyright ©2022 by nguyen hoang thai hoc
      </div>
      <div className={styles["footer__info"]}>
        <span>emai: hocnguyen1109200@gmail.com</span>
        <span>phone: 0363935029</span>
      </div>
    </div>
  );
}

export default Footer;

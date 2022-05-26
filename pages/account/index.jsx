import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import styles from "./account.module.scss";
import router from "next/router";

function Account() {
  const { state, dispatch } = useContext(DataContext);
  const user = state.auth;
  const handleLogOut = () => {
    localStorage.removeItem("next_user");
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  return (
    <div className={styles.account}>
      <h2>Your info</h2>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <button onClick={handleLogOut}>logout</button>
    </div>
  );
}

export default Account;

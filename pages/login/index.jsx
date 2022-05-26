import React, { useContext } from "react";
import LoginForm from "./components/LoginForm";
import styles from "./login.module.scss";
import userApi from "../../api-client/userApi";
import { DataContext } from "../../store/GlobalState";
import router from "next/router";
import Head from "next/head";

function Login() {
  const { state, dispatch } = useContext(DataContext);

  const handleLogin = async (values) => {
    try {
      const res = await userApi.login(values);
      await dispatch({
        type: "AUTH",
        payload: { user: res.user, acc_token: res.token },
      });
      localStorage.setItem("next_user", JSON.stringify(res.user));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles["login-content"]}>
        <Head>
          <title>Login page</title>
        </Head>
        <LoginForm styles={styles} onSubmit={handleLogin}></LoginForm>
      </div>
    </div>
  );
}

export default Login;

import React, { useContext } from "react";
import LoginForm from "./components/LoginForm";
import styles from "./login.module.scss";
import userApi from "../../api-client/userApi";
import { DataContext } from "../../store/GlobalState";
import router from "next/router";
import Head from "next/head";
import { useSnackbar } from "notistack";

function Login() {
  const { state, dispatch } = useContext(DataContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (values) => {
    try {
      const res = await userApi.login(values);
      await dispatch({
        type: "AUTH",
        payload: { user: res.user, acc_token: res.token },
      });

      localStorage.setItem("next_user", JSON.stringify(res.user));
      enqueueSnackbar("login successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });

      router.push("/");
    } catch (error) {
      enqueueSnackbar(error.error, {
        variant: "error",
        autoHideDuration: 2000,
      });
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

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../components/form-control/inputField";
import Loading from "../../../components/Loading";

function LoginForm({ styles, onSubmit }) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("please enter your email")
      .email("please enter vallid email"),
    password: yup.string().required("please enter your password"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className="login-form">
      <h2 style={{ margin: "1rem 0", textAlign: "center" }}>Login</h2>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <InputField
            form={form}
            name="email"
            id="email"
            placeholder="Enter email..."
            label="email"
          ></InputField>
        </div>
        <div className="form-group">
          <InputField
            form={form}
            name="password"
            id="password"
            label="password"
            placeholder="Password"
            type="password"
          ></InputField>
        </div>
        <div
          className="form-group"
          style={{ textAlign: "right", paddingTop: "1rem" }}
        >
          <button
            type="submit"
            className={styles["login-btn"]}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loading w="20" h="20"></Loading> : " Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

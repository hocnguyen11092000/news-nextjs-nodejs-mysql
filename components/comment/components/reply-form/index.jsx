import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../form-control/inputField";
import styles from "./reply-form.module.scss";

function index({ onSubmit, cancel }) {
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const hanldeCancelReply = () => {
    if (cancel) {
      cancel();
    }
  };

  return (
    <div className={styles["reply-form"]}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
      >
        <InputField
          form={form}
          name="content"
          placeholder="Reply..."
          borderbt
          id="content"
        ></InputField>
        <span className={styles["cancel-reply"]} onClick={hanldeCancelReply}>
          hủy
        </span>
      </form>
    </div>
  );
}

export default index;

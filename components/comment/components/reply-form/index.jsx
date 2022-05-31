import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../form-control/inputField";
import styles from "./reply-form.module.scss";
import Image from "next/image";
import { DataContext } from "../../../../store/GlobalState";

function ReplyForm({ onSubmit, cancel, item }) {
  const { state, dispatch } = useContext(DataContext);

  const user = state.auth;

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
        style={{
          display: "flex",
          gap: "0.4rem",
          alignItems: "center",
          margin: "0.875rem 0",
        }}
      >
        <Image
          style={{ borderRadius: "50%" }}
          src={user.avatar}
          alt={user.name}
          width={32}
          height={32}
        ></Image>
        <div className={styles["reply-input"]}>
          <div>
            <span className={styles["reply-input__reply-name"]}>
              {"@" + item.user.name}
            </span>
          </div>
          <InputField
            form={form}
            name="content"
            borderbt
            id="content"
          ></InputField>
        </div>
        <span className={styles["cancel-reply"]} onClick={hanldeCancelReply}>
          hủy
        </span>
      </form>
    </div>
  );
}

export default ReplyForm;

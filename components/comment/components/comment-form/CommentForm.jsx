import React from "react";
import { useForm } from "react-hook-form";
import CommentLoading from "../../../CommentLoading";
import InputField from "../../../form-control/inputField";
import Loading from "../../../Loading";

function CommentForm({ onSubmit }) {
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
      setValue("content", "");
    }
  };

  return (
    <div className="comment-form">
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <InputField
            form={form}
            name="content"
            placeholder="Comment..."
            borderbt
          ></InputField>
        </div>
      </form>
      {isSubmitting && (
        <span style={{ display: "inline-block", margin: "0.5rem" }}>
          <CommentLoading w="32" h="32"></CommentLoading>
        </span>
      )}
    </div>
  );
}

export default CommentForm;

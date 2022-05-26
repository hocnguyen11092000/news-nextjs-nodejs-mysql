import React, { useState } from "react";
import Image from "next/image";
import ReplyForm from "./components/reply-form";

function Comment({ cx, item, ta }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  const handleShowReplyForm = () => {
    setShowReplyForm(true);
  };

  const handleCancel = () => {
    setShowReplyForm(false);
  };

  return (
    <div className={cx("detail-post__comments-comment")}>
      <div style={{ display: "flex", gap: "0.875rem" }}>
        <div className={cx("detail-post__comments-comment__avatar")}>
          <Image
            width={35}
            height={35}
            style={{
              borderRadius: "50%",
            }}
            src={item.user.avatar}
            alt={item.user.name}
          ></Image>
        </div>
        <div className={cx("detail-post__comments-comment__content")}>
          <span
            className={cx("detail-post__comments-comment__content-username")}
          >
            {item.username}
          </span>
          <span className={cx("detail-post__comments-comment__content-text")}>
            {item.content}
          </span>
        </div>
      </div>
      <div className={cx("detail-post__comments-comment__content-time")}>
        <span
          className={cx("detail-post__comments-comment__content-time-reply")}
          onClick={handleShowReplyForm}
        >
          trả lời
        </span>
        <span style={{ fontSize: "0.875rem" }}> {ta.ago(item.createdAt)}</span>
      </div>
      {showReplyForm && (
        <ReplyForm onSubmit={handleSubmit} cancel={handleCancel}></ReplyForm>
      )}
    </div>
  );
}

export default Comment;

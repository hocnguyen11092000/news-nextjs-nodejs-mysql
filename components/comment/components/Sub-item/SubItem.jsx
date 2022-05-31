import Image from "next/image";
import React, { useContext, useState } from "react";
import commentApi from "../../../../api-client/commentApi";
import { DataContext } from "../../../../store/GlobalState";
import ReplyForm from "../reply-form/index";

function SubItem({ cx, item, ta, postId, parent, onSubmit, onCancel }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [newReplyComment, setNewReplyComment] = useState();

  const { state } = useContext(DataContext);
  const user_id = state.auth.id;

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }

    setShowReplyForm(false);

    if (onCancel) {
      await onCancel();
    }
  };

  const handleShowReplyForm = () => {
    setShowReplyForm(true);
  };

  const handleCancel = () => {
    setShowReplyForm(false);
  };

  return (
    <>
      {item && (
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
                className={cx(
                  "detail-post__comments-comment__content-username"
                )}
              >
                {item.user?.name}
              </span>
              <span
                className={cx("detail-post__comments-comment__content-text")}
              >
                {parent && (
                  <span
                    style={{
                      color: "#007575",
                      fontWeight: "600",
                      display: "inline-block",
                      marginRight: "0.5rem",
                    }}
                  >
                    {parent && parent.user?.name}
                  </span>
                )}
                {item.content}
              </span>
            </div>
          </div>
          <div className={cx("detail-post__comments-comment__content-time")}>
            <span
              className={cx(
                "detail-post__comments-comment__content-time-reply"
              )}
              onClick={handleShowReplyForm}
            >
              trả lời
            </span>
            <span style={{ fontSize: "0.875rem" }}>
              {" "}
              {ta.ago(item.createdAt)}
            </span>
          </div>
          {showReplyForm && (
            <ReplyForm
              item={item}
              onSubmit={handleSubmit}
              cancel={handleCancel}
            ></ReplyForm>
          )}
        </div>
      )}
    </>
  );
}

export default SubItem;

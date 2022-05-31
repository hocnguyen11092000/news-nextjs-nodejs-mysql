import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import ReplyForm from "./components/reply-form";
import SubComment from "./components/sub-comment/SubComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import CommentLoading from "../CommentLoading";
import commentApi from "../../api-client/commentApi";
import { DataContext } from "../../store/GlobalState";

function Comment({ cx, item, ta, postId, parent }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubComment, setShowSubComment] = useState(false);
  const [commentLoading, setCommentLoading] = useState();
  const [newReplyComment, setNewReplyComment] = useState();
  const [number, setNumber] = useState(0);

  const { state } = useContext(DataContext);
  const user_id = state.auth.id;

  const handleSubmit = async (values) => {
    values.post_id = postId;
    values.parent_id = parent?.id || item.id;
    values.user_id = user_id;

    try {
      const res = await commentApi.add(values);

      setNewReplyComment(res.comment.id);
      setShowReplyForm(false);
      setShowSubComment(true);
      setNumber(number + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoading = (loading) => {
    setCommentLoading(loading);
  };

  const handleShowReplyForm = () => {
    setShowReplyForm(true);
  };

  const handleCancel = () => {
    setShowReplyForm(false);
  };

  const handleToggleSubComment = () => {
    setShowSubComment(!showSubComment);
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

          <div
            className={cx("detail-post__comments-comment__content-watch-more")}
            onClick={handleToggleSubComment}
          >
            {item.hasChild !== 0 &&
              `See ${!showSubComment ? "more" : "less"} ${
                item.hasChild
              } comments`}
            {item.hasChild !== 0 && (
              <span style={{ display: "inline-block", marginLeft: "0.5rem" }}>
                {commentLoading ? (
                  <div style={{ position: "relative", top: "0.875rem" }}>
                    <span></span>
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon={!showSubComment ? faChevronDown : faChevronUp}
                  ></FontAwesomeIcon>
                )}
              </span>
            )}
          </div>

          {showSubComment && (
            <SubComment
              onSubmit={handleSubmit}
              number={number}
              loading={handleLoading}
              postId={postId}
              parent={item}
              cx={cx}
              ta={ta}
              root={parent}
              newCommentId={newReplyComment}
              onCancel={handleCancel}
            ></SubComment>
          )}
        </div>
      )}
    </>
  );
}

export default Comment;

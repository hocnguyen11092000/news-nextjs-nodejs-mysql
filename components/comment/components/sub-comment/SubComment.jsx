import React, { useEffect, useState } from "react";
import commentApi from "../../../../api-client/commentApi";
import SubItem from "../Sub-item/SubItem";
import styles from "./sub-comment.module.scss";

function SubComment({
  parent,
  loading,
  cx,
  ta,
  postId,
  newCommentId,
  root,
  number,
  onSubmit,
  onCancel,
}) {
  const [subComment, setSubComment] = useState([]);
  console.log(subComment);
  console.log(newCommentId);
  useEffect(() => {
    console.log("re render");
    (async () => {
      if (loading) {
        await loading(true);
      }

      try {
        const res = await commentApi.getSubComment(postId, root.id);

        if (loading) {
          await loading(false);
        }
        setSubComment(res.subComment);
      } catch (error) {
        console.log(error);
        if (loading) {
          await loading(false);
        }
      }
    })();
  }, [subComment.length, newCommentId]);

  return (
    <div>
      {
        <div className={styles["sub-comment"]}>
          <div>
            {subComment &&
              subComment.map((item) => {
                return (
                  // <Comment
                  //   key={item.id}
                  //   parent={parent}
                  //   item={item}
                  //   ta={ta}
                  //   cx={cx}
                  //   postId={postId}
                  // ></Comment>
                  <SubItem
                    key={item.id}
                    parent={parent}
                    item={item}
                    ta={ta}
                    cx={cx}
                    postId={postId}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                  ></SubItem>
                );
              })}
          </div>
        </div>
      }
    </div>
  );
}

export default SubComment;

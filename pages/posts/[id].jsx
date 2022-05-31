import classNames from "classnames/bind";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import ta from "time-ago";
import commentApi from "../../api-client/commentApi";
import postApi from "../../api-client/postApi";
import Comment from "../../components/comment";
import CommentForm from "../../components/comment/components/comment-form/CommentForm";
import { DataContext } from "../../store/GlobalState";
import styles from "../../styles/detail-post.module.scss";

const cx = classNames.bind(styles);

const DetailProduct = ({ post }) => {
  const { state, dispatch } = useContext(DataContext);

  const userId = state.auth.id;

  const { data, error, mutate } = useSWR(
    "comments",
    () => postApi.getCommentOfPost(post.id),
    { refreshInterval: 2 }
  );

  if (error) return <h2>{error.message}</h2>;

  const handleAddComment = async (values) => {
    values.user_id = userId;
    values.post_id = post.id;

    try {
      await commentApi.add(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("detail-post")}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div
        className={cx("detail-post__content")}
        dangerouslySetInnerHTML={{ __html: post.description }}
      ></div>
      <div className={cx("detail-post__content-comment-form")}>
        <div style={{ width: "32px", height: "32px", marginRight: "0.5rem" }}>
          <Image
            width={32}
            height={32}
            style={{
              borderRadius: "50%",
            }}
            src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c141.0.480.480a_dst-jpg_p480x480&_nc_cat=1&ccb=1-7&_nc_sid=12b3be&_nc_ohc=IpS7Xv0a4ogAX84wnG8&_nc_ht=scontent.fsgn2-4.fna&edm=AHgPADgEAAAA&oh=00_AT8P3E0WYojknKD7VJAmEG3DqCRr1NkHGK4_yL8N5B5hHA&oe=62B4A019"
          ></Image>
        </div>
        <CommentForm onSubmit={handleAddComment}></CommentForm>
      </div>
      <div className={cx("detail-post__comments")}>
        {data &&
          data.comments.map((item) => {
            return (
              <Comment
                postId={post.id}
                key={item.id}
                item={item}
                cx={cx}
                ta={ta}
                parent={item}
              ></Comment>
            );
          })}
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await postApi.get(id);
  // server side rendering
  return {
    props: { post: res.post }, // will be passed to the page component as props
  };
}

export default DetailProduct;

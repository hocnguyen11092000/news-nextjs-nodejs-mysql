import postApi from "../../api-client/postApi";
import Head from "next/head";
import styles from "../../styles/detail-post.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect, useContext } from "react";
import useSWR from "swr";

import ta from "time-ago";
import Comment from "../../components/comment";
import { DataContext } from "../../store/GlobalState";

const cx = classNames.bind(styles);

const DetailProduct = ({ post }) => {
  const { state, dispatch } = useContext(DataContext);

  const { data, error } = useSWR("api/comments", () =>
    postApi.getCommentOfPost(post.id)
  );

  if (error) return <h2>{error.message}</h2>;

  return (
    <div className={cx("detail-post")}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div
        className="detail-post__content"
        dangerouslySetInnerHTML={{ __html: post.description }}
      ></div>
      <div className={cx("detail-post__comments")}>
        {data &&
          data.comments.map((item) => {
            return (
              <Comment key={item.id} item={item} cx={cx} ta={ta}></Comment>
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

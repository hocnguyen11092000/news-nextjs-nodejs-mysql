import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import postApi from "../api-client/postApi";
import Highlighter from "react-highlight-words";
import Loading from "./Loading";

function ListPost({
  item,
  cx = undefined,
  ta,
  count,
  imageProps,
  searchWords = "",
}) {
  const [posts, setPosts] = useState(item);
  const [hasMore, setHasMore] = useState(true);

  const getMorePosts = useCallback(async () => {
    const res = await postApi.getAll({ page: Math.ceil(posts.length / 8 + 1) });
    setPosts((posts) => [...posts, ...res.posts]);
  }, [posts.length]);

  useEffect(() => {
    setHasMore(count > posts.length + 1 ? true : false);
  }, [posts.length]);

  return (
    <>
      {posts.length === 0 && <h3>Không có bài viết...</h3>}
      {posts &&
        posts.map((post) => {
          return (
            <div
              key={post.id}
              className={cx("wrapper-news__left-news-list-post-block")}
            >
              <div
                className={cx("wrapper-news__left-news-list-post-block-imgBox")}
              >
                <Link href={`../posts/${post.id}`}>
                  <Image
                    {...imageProps}
                    src={post.image}
                    alt={post.title}
                    width={160}
                    height={120}
                    placeholder="blur"
                  ></Image>
                </Link>
              </div>
              <div
                className={cx(
                  "wrapper-news__left-news-list-post-block-content"
                )}
              >
                <Link href={`../posts/${post.id}`}>
                  <Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={searchWords?.split(" ")}
                    autoEscape={true}
                    textToHighlight={post.title}
                  />
                </Link>
                <div
                  className={cx(
                    "wrapper-news__left-news-list-post-block-content-description"
                  )}
                >
                  {post.shortDescription}
                </div>
                <div
                  className={cx("wrapper-news__left-news-list-post-block-info")}
                  style={{ marginTop: "0.5rem" }}
                >
                  <span style={{ marginRight: "1rem" }}>
                    {ta.ago(post.createdAt)}
                  </span>
                  <span>{post.user.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      {
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePosts}
          hasMore={hasMore}
          loader={
            <div style={{ textAlign: "center" }}>
              <Loading></Loading>
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center", margin: "2rem 0" }}>
              <b>hết rồi...</b>
            </p>
          }
        ></InfiniteScroll>
      }
    </>
  );
}

export default ListPost;

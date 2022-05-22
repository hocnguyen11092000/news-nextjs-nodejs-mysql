import React from "react";
import Link from "next/link";
import Image from "next/image";

function PostByView({ item, cx, ta, imageProps }) {
  return (
    <>
      {item &&
        item.map((post) => {
          return (
            <div key={post.id} className={cx("wrapper-news__right-news-block")}>
              <div className={cx("wrapper-news__right-news-block-imgBox")}>
                <Link href={`/posts/${post.id}`}>
                  <Image
                    {...imageProps}
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    placeholder="blur"
                    // loader={myLoader}
                  ></Image>
                </Link>
              </div>
              <div className={cx("wrapper-news__right-news-block-description")}>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                <div
                  className={cx(
                    "wrapper-news__left-news-lasted-post-left-info"
                  )}
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
    </>
  );
}

export default PostByView;

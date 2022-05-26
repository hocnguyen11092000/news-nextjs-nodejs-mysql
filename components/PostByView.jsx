import Image from "next/image";
import Link from "next/link";
import React from "react";

function PostByView({ item, cx, ta, imageProps, timeReading }) {
  return (
    <>
      {item &&
        item.map((post) => {
          return (
            <div key={post.id} className={cx("wrapper-news__right-news-block")}>
              <div className={cx("wrapper-news__right-news-block-imgBox")}>
                <Link href={`/posts/${post.id}`}>
                  <div>
                    <Image
                      {...imageProps}
                      src={post.image}
                      alt={post.title}
                      width={80}
                      height={80}
                      placeholder="blur"
                    ></Image>
                  </div>
                </Link>
              </div>
              <div className={cx("wrapper-news__right-news-block-description")}>
                <Link href={`/posts/${post.id}`}>
                  <span>{post.title}</span>
                </Link>
                <div
                  className={cx(
                    "wrapper-news__left-news-lasted-post-left-info"
                  )}
                  style={{ marginTop: "0.5rem" }}
                >
                  <span style={{ marginRight: "1rem" }}>
                    {ta.ago(post.createdAt)}
                  </span>
                  <span style={{ marginRight: "1rem" }}>{post.user.name}</span>
                  <span>{post.timeReading.text}</span>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default PostByView;

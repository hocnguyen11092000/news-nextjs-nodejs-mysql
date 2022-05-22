import postApi from "../../api-client/postApi";
import Head from "next/head";
import ListPost from "../../components/ListPost";
import * as ta from "time-ago";
import styles from "../../styles/home.module.scss";
import classNames from "classnames/bind";
import { getPlaiceholder } from "plaiceholder";

const cx = classNames.bind(styles);

const Category = ({ posts, count, category, imageProps }) => {
  return (
    <div className="category">
      <Head>
        <title>{posts.title}</title>
      </Head>
      <div className="container">
        <h2>{category.name}</h2>
        <ListPost
          imageProps={imageProps}
          item={posts}
          count={count}
          ta={ta}
          cx={cx}
        ></ListPost>
      </div>
    </div>
  );
};

export default Category;

export async function getServerSideProps({ params: { id } }) {
  const res = await postApi.getByCategory(id);
  const { base64, img } = await getPlaiceholder(
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80",
    { size: 10 }
  );
  // server side rendering
  return {
    props: {
      posts: res.posts,
      count: res.count,
      category: res.category,
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    }, // will be passed to the page component as props
  };
}

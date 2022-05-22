import postApi from "../../api-client/postApi";
import Head from "next/head";
import styles from "../../styles/detail-post.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DetailProduct = ({ post }) => {
  return (
    <div className={cx("detail-post")}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div
        className="detail-post__content"
        dangerouslySetInnerHTML={{ __html: post.description }}
      ></div>
      <div className="detail-post__comment"></div>
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

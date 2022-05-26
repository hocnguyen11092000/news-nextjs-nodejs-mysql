import axios from "axios";
import classNames from "classnames/bind";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as ta from "time-ago";
import postApi from "../api-client/postApi";
import InputField from "../components/form-control/inputField";
import ListPost from "../components/ListPost";
import Modal from "../components/modal/Modal";
import PostByView from "../components/PostByView";
import useDebounce from "../hooks/useDebound";
import { DataContext } from "../store/GlobalState";
import styles from "../styles/home.module.scss";
import { removeAccents } from "../utils/removeDiacritic";
import readingTime from "reading-time";

const cx = classNames.bind(styles);

export default function Home({ posts, count, imageProps }) {
  const { state, dispatch } = useContext(DataContext);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasPost, setHasPost] = useState(false);

  const showModal = state.showModalSearch;

  // const schema = yup.object().shape({
  //   keyword: yup.string().required("Nhập từ khóa..."),
  // });

  const [lasted, ...postList] = posts;
  const form = useForm({
    defaultValues: {
      keyword: "",
    },
    // resolver: yupResolver(schema),
  });

  const { watch } = form;
  const deboundValue = useDebounce(watch().keyword, 300);

  const searchObj = {
    keyword: removeAccents(deboundValue),
  };

  useEffect(() => {
    (async () => {
      if (deboundValue === "") {
        setSearchData([]);
        return;
      }

      setLoading(true);
      try {
        const res = await postApi.getAll(searchObj);
        setLoading(false);

        setSearchData(res.posts);
        setHasPost(res.hasPost);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [deboundValue, searchData.length]);

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="home-container">
      <Head>
        <title>Home Page</title>
      </Head>
      <div className={cx("wrapper-news")}>
        <div className={cx("wrapper-news__left-news")}>
          <div className={cx("wrapper-news__left-news-lasted-post")}>
            <div className={cx("wrapper-news__left-news-lasted-post-left")}>
              <div
                className={cx(
                  "wrapper-news__left-news-lasted-post-left-imgBox"
                )}
              >
                <Link href={`/posts/${lasted.id}`}>
                  <div>
                    <Image
                      {...imageProps}
                      src={lasted.image}
                      alt={lasted.title}
                      width={700}
                      height={465}
                      placeholder="blur"
                    ></Image>
                  </div>
                </Link>
              </div>
              <div
                className={cx(
                  "wrapper-news__left-news-lasted-post-left-description"
                )}
              >
                <Link href={`/posts/${lasted.id}`}>{lasted.title}</Link>
              </div>
              <div
                className={cx("wrapper-news__left-news-lasted-post-left-info")}
              >
                <span style={{ marginRight: "1rem" }}>
                  {ta.ago(lasted.createdAt)}
                </span>
                <span style={{ marginRight: "1rem" }}>{lasted.user.name}</span>
                <span>{lasted.timeReading.text}</span>
              </div>
            </div>
          </div>
          <div className={cx("wrapper-news__left-news-list-post")}>
            <ListPost
              imageProps={imageProps}
              item={posts}
              cx={cx}
              ta={ta}
              count={count}
              left
              readingTime={readingTime}
            ></ListPost>
          </div>
        </div>
        <div className={cx("wrapper-news__right-news")}>
          <PostByView
            imageProps={imageProps}
            item={postList}
            cx={cx}
            ta={ta}
            readingTime={readingTime}
          ></PostByView>
        </div>
      </div>
      <Modal show={showModal}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className={cx("form-group")}>
            <InputField
              form={form}
              name="keyword"
              id="keyword"
              placeholder="nhập từ khóa ..."
            ></InputField>
            <button
              style={{ minWidth: "80px" }}
              type="submit"
              className={cx("search-btn")}
            >
              {loading ? "..." : " Tìm kiếm"}
            </button>
          </div>
        </form>

        {searchData.length === 0 ? (
          <div style={{ textAlign: "center", margin: "5rem 0" }}>
            {hasPost
              ? "Không tìm thấy bài viết phù hợp"
              : " Tìm kiếm gì đi nè..."}
          </div>
        ) : (
          <div style={{ margin: "2rem 1.5rem" }}>
            <ListPost
              imageProps={imageProps}
              item={searchData}
              cx={cx}
              ta={ta}
              count={count}
              left
              searchWords={deboundValue}
              search
              readingTime={readingTime}
            ></ListPost>
          </div>
        )}
      </Modal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await axios.get("http://localhost:8000/api/posts?page=1");

  const { base64, img } = await getPlaiceholder(
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80",
    { size: 10 }
  );

  return {
    props: {
      posts: data.data.posts,
      count: data.data.count,
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  };
}

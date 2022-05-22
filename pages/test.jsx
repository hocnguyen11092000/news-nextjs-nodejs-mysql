import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

function test({ posts }) {
  console.log(posts);
  return <div>test</div>;
}

export async function getStaticProps() {
  const data = await axios.get("http://localhost:8000/api/categories");

  return {
    props: {
      posts: data.data.category,
    },
  };
}

export default test;

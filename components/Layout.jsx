import React from "react";
import Footer from "./footer/Footer";
import Header from "./Header";

function Layout(props) {
  return (
    <>
      <div className="container" style={{ margin: "0 50px" }}>
        <Header></Header>
        {props.children}
      </div>
      <Footer></Footer>
    </>
  );
}

export default Layout;

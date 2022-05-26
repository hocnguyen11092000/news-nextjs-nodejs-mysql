import React from "react";
import Header from "./Header";

function Layout(props) {
  return (
    <div className="container" style={{ margin: "0 50px" }}>
      <Header></Header>
      {props.children}
    </div>
  );
}

export default Layout;

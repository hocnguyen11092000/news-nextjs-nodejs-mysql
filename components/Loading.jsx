import React from "react";

function Loading({ w, h }) {
  return (
    <div
      className="loadingio-spinner-rolling-jgb4h4imw0j"
      style={w && h ? { width: w + "px", height: h + "px" } : {}}
    >
      <div className="ldio-qzcypzydlna">
        <div
          style={
            w && h ? { top: (1 / 2) * w + "px", left: (1 / 2) * h + "px" } : {}
          }
        ></div>
      </div>
    </div>
  );
}

export default Loading;

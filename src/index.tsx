import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RealTimeDom from "./real-time-dom/real-time-dom";
import CssIllusion from "./css-illusion/css-illusion";

/**
 * Uncomment RealTimeDom or CssIllusion.
 * Only allow one to render at a time.
 *
 * Which one is more performant?
 * The one that adds DOM elements to the tree in real time?
 * Or the one that toggles visibility via CSS?
 */
ReactDOM.render(
  <React.StrictMode>
    <div style={{ display: "flex" }}>
      <RealTimeDom />
      {/* <CssIllusion /> */}
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

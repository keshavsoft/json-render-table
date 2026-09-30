import render from "../../src/index.js";
import data from "../simple/data.json" with { type: "json" };

const start = () => {
  try {
    render({
      tableType: "headerOnly",
      data,
      targetHtmlId: "dom-render-container"
    });
  } catch (err) {
    console.error("Error rendering header-only table:", err);
  }
};

start();

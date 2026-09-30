import render from "../../../src/index.js";
import data from "./data.json" with { type: "json" };

const start = () => {
  try {
    render({
      flavor: "simple",
      data,
      targetHtmlId: "dom-render-container"
    });
  } catch (err) {
    console.error("Error rendering simple table:", err);
  }
};

start();

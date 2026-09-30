import { prepareData } from "../../../src/index.js";
import data from "./data.json" with { type: "json" };
import columns from "./columns.json" with { type: "json" };

const start = () => {
  try {
    const k1 = prepareData({
      flavor: "withBodyAndFooter",
      data, columns,
      targetHtmlId: "dom-render-container"
    });

    // console.log("sssssss : ", k1.children[1].children[0].children);

    console.log("sssssss : ", JSON.stringify(k1));

  } catch (err) {
    console.error("Error rendering simple table:", err);
  }
};

start();

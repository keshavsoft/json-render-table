import { prepareSpec, prepareSource, prepareRecipe } from "../../../src/index.js";
import data from "./data.json" with { type: "json" };
import columns from "./columns.json" with { type: "json" };

const start = () => {
  try {
    const specJson = prepareSpec({
      flavor: "simple",
      data, columns,
      targetHtmlId: "dom-render-container"
    });

    // console.log("sssssss : ", k1.children[1].children[0].children);

    // console.log("sssssss 11: ", JSON.stringify(prepareRecipe({})));

    // console.log("sssssss 22: ", JSON.stringify(prepareSource({ data, columns })));

    console.log("sssssss 33: ", JSON.stringify(specJson));

  } catch (err) {
    console.error("Error rendering simple table:", err);
  }
};

start();

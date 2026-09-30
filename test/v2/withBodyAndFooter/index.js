import render from "../../../src/index.js";
import data from "../simple/data.json" with { type: "json" };

const start = () => {
  try {
    render({
      tableType: "withBodyAndFooter",
      data,
      footerData: [
        { itemName: "Summary", baseUnit: "Total Items: 5", rate: "Avg: 950" }
      ],
      targetHtmlId: "dom-render-container"
    });
  } catch (err) {
    console.error("Error rendering withBodyAndFooter table:", err);
  }
};

start();

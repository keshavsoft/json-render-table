import jsonToTag from "@keshavsoft/json-to-tag";

import registerGlobal from "./registerGlobal.js";
import prepareSpec from "./prepareSpec/index.js";
import prepareSource from "./prepareSpec/prepareSource.js";
import prepareRecipe from "./prepareSpec/prepareRecipe.js";

/**
 * Clean outside API for rendering tables.
 *
 * @param {Object} options
 * @param {string} [options.flavor="simple"] - "simple" | "headerOnly" | "withBodyAndFooter"
 * @param {Array} [options.data=[]] - Row records array
 * @param {Array} [options.columns] - Optional explicit columns. If omitted, extracted from first record.
 * @param {Array} [options.footerData] - Optional footer rows for withBodyAndFooter flavor
 * @param {string|HTMLElement} [options.targetHtmlId] - Target container element or its ID
 */
const render = ({
    flavor = "simple",
    tableType,
    data = [],
    columns,
    footerData,
    targetHtmlId
} = {}) => {
    const localTargetHtmlId = targetHtmlId;

    const domSpec = prepareSpec({
        flavor,
        tableType,
        data,
        columns,
        footerData,
        targetHtmlId
    });

    const container = (typeof localTargetHtmlId === "string")
        ? document.getElementById(localTargetHtmlId)
        : localTargetHtmlId;

    if (!container) return domSpec;

    container.innerHTML = "";

    const createdElement = jsonToTag(domSpec);

    if (Array.isArray(createdElement)) {
        createdElement.forEach((element) => container.append(element));
    } else {
        container.append(createdElement);
    }

    return createdElement;
};

registerGlobal(render);

export { render, prepareSpec, prepareSource, prepareRecipe };
export default render;

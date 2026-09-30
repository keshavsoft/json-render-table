import jsonTraversal from "json-traversal";
import jsonToTag from "@keshavsoft/json-to-tag";

import { resolveColumns } from "./common/resolveColumns.js";
import recipes from "./recipes.json" with { type: "json" };
import registerGlobal from "./registerGlobal.js";

const FLAVOR_MAP = {
    simple: "simple",
    headeronly: "headerOnly",
    "header-only": "headerOnly",
    header: "headerOnly",
    withbodyandfooter: "withBodyAndFooter",
    "with-body-and-footer": "withBodyAndFooter",
    bodyandfooter: "withBodyAndFooter",
    footer: "withBodyAndFooter"
};

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
    const localFlavorRaw = flavor !== "simple" ? flavor : (tableType ?? flavor);
    const localFlavorKey = FLAVOR_MAP[String(localFlavorRaw ?? "simple").toLowerCase()] ?? "simple";
    const localRecipe = recipes[localFlavorKey] ?? recipes.simple;
    const localData = Array.isArray(data) ? data : [];
    const localColumns = columns;
    const localFooterData = footerData;
    const localTargetHtmlId = targetHtmlId;

    if (localFlavorKey !== "headerOnly" && localData.length === 0) {
        const container = (typeof localTargetHtmlId === "string")
            ? document.getElementById(localTargetHtmlId)
            : localTargetHtmlId;
        if (container) container.innerHTML = "<p class='text-muted p-3'>No data available</p>";
        return null;
    }

    // Resolve columns: from outside if supplied, otherwise guard extracts from first record
    const colKeys = resolveColumns({ inColumns: localColumns, inData: localData });

    const recipeColumns = colKeys.map((key) => ({ title: key }));
    const recipeRows = localData.map((row) => ({
        cells: colKeys.map((k) => ({ value: String(row?.[k] ?? "") }))
    }));

    let recipeFooterRows = [];
    if (localFlavorKey === "withBodyAndFooter") {
        if (Array.isArray(localFooterData) && localFooterData.length > 0) {
            recipeFooterRows = localFooterData.map((fRow) => {
                if (Array.isArray(fRow)) {
                    return { cells: fRow.map((val) => ({ value: String(val ?? "") })) };
                }
                return {
                    cells: colKeys.map((k) => ({ value: String(fRow?.[k] ?? "") }))
                };
            });
        } else {
            recipeFooterRows = [
                {
                    cells: colKeys.map((k, idx) => ({
                        value: idx === 0 ? `Total: ${localData.length} records` : ""
                    }))
                }
            ];
        }
    }

    const sourceData = {
        columns: recipeColumns,
        rows: recipeRows,
        footerRows: recipeFooterRows
    };

    const domSpec = jsonTraversal.transform(sourceData, localRecipe);

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

export { render };
export default render;

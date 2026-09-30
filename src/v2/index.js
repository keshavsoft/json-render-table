import jsonTraversal from "../../node_modules/json-traversal/index.js";
import jsonToTag from "../../node_modules/@keshavsoft/json-to-tag/index.js";
import registerGlobal from "./registerGlobal.js";
import recipeJson from "./recipe.json" with { type: "json" };

/**
 * v2 Table Renderer powered by json-traversal
 */
const render = ({
    targetHtmlId,
    inTargetHtmlId,
    data,
    inData,
    columns,
    inColumns,
    inRecipe = recipeJson
} = {}) => {
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;
    const localData = inData ?? data ?? [];
    const localColumns = inColumns ?? columns;
    const localRecipe = inRecipe;

    if (!Array.isArray(localData) || localData.length === 0) {
        const container = (typeof localTargetHtmlId === "string")
            ? document.getElementById(localTargetHtmlId)
            : localTargetHtmlId;
        if (container) container.innerHTML = "<p class='text-muted p-3'>No data available</p>";
        return;
    }

    const firstRow = localData[0] || {};
    const colKeys = (localColumns && localColumns.length > 0)
        ? localColumns.map(col => typeof col === "string" ? col : (col.key ?? col.title ?? col.label))
        : Object.keys(firstRow);

    const recipeColumns = colKeys.map(key => ({ title: key }));
    const recipeRows = localData.map(row => ({
        cells: colKeys.map(k => ({ value: String(row[k] ?? "") }))
    }));

    const sourceData = {
        columns: recipeColumns,
        rows: recipeRows
    };

    // Transform using json-traversal recipe
    const domSpec = jsonTraversal.transform(sourceData, localRecipe);

    // Convert spec to native DOM elements
    const container = (typeof localTargetHtmlId === "string")
        ? document.getElementById(localTargetHtmlId)
        : localTargetHtmlId;

    if (!container) return;

    container.innerHTML = "";

    const createdElement = jsonToTag(domSpec);

    if (Array.isArray(createdElement)) {
        createdElement.forEach(element => container.append(element));
    } else {
        container.append(createdElement);
    }

    return createdElement;
};

registerGlobal(render);

export default render;

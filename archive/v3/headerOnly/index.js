import jsonTraversal from "../../../node_modules/json-traversal/index.js";
import jsonToTag from "../../../node_modules/@keshavsoft/json-to-tag/index.js";
import deriveColumnsFromData from "../common/deriveColumnsFromData.js";
import recipeJson from "./recipe.json" with { type: "json" };

const startFunc = ({
    inTargetHtmlId,
    targetHtmlId,
    inData,
    data,
    inColumns,
    columns,
    inRecipe
} = {}) => {
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;
    const localData = inData ?? data ?? [];
    const localColumns = inColumns ?? columns;
    const localRecipe = inRecipe ?? recipeJson;

    let colKeys = [];

    if (localColumns && localColumns.length > 0) {
        colKeys = localColumns.map(col => typeof col === "string" ? col : (col.key ?? col.title ?? col.label));
    } else if (Array.isArray(localData) && localData.length > 0) {
        colKeys = deriveColumnsFromData({ inData: localData }).map(col => col.key);
    }

    const recipeColumns = colKeys.map(key => ({ title: key }));

    const sourceData = {
        columns: recipeColumns
    };

    const domSpec = jsonTraversal.transform(sourceData, localRecipe);

    const container = (typeof localTargetHtmlId === "string")
        ? document.getElementById(localTargetHtmlId)
        : localTargetHtmlId;

    if (!container) return domSpec;

    container.innerHTML = "";

    const createdElement = jsonToTag(domSpec);

    if (Array.isArray(createdElement)) {
        createdElement.forEach(element => container.append(element));
    } else {
        container.append(createdElement);
    }

    return createdElement;
};

export default startFunc;

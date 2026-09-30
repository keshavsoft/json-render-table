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
    inFooterData,
    footerData,
    inRecipe
} = {}) => {
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;
    const localData = inData ?? data ?? [];
    const localColumns = inColumns ?? columns;
    const localFooterData = inFooterData ?? footerData;
    const localRecipe = inRecipe ?? recipeJson;

    if (!Array.isArray(localData) || localData.length === 0) {
        const container = (typeof localTargetHtmlId === "string")
            ? document.getElementById(localTargetHtmlId)
            : localTargetHtmlId;
        if (container) container.innerHTML = "<p class='text-muted p-3'>No data available</p>";
        return null;
    }

    let colKeys = [];
    if (localColumns && localColumns.length > 0) {
        colKeys = localColumns.map(col => typeof col === "string" ? col : (col.key ?? col.title ?? col.label));
    } else {
        colKeys = deriveColumnsFromData({ inData: localData }).map(col => col.key);
    }

    const recipeColumns = colKeys.map(key => ({ title: key }));
    const recipeRows = localData.map(row => ({
        cells: colKeys.map(k => ({ value: String(row[k] ?? "") }))
    }));

    let recipeFooterRows = [];
    if (Array.isArray(localFooterData) && localFooterData.length > 0) {
        recipeFooterRows = localFooterData.map(fRow => {
            if (Array.isArray(fRow)) {
                return { cells: fRow.map(val => ({ value: String(val ?? "") })) };
            }
            return {
                cells: colKeys.map(k => ({ value: String(fRow[k] ?? "") }))
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
        createdElement.forEach(element => container.append(element));
    } else {
        container.append(createdElement);
    }

    return createdElement;
};

export default startFunc;

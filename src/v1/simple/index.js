import jsonToSpec from "../../../node_modules/json-to-spec/index.js";
import jsonToTag from "../../../node_modules/@keshavsoft/json-to-tag/index.js";
import deriveColumnsFromData from "../common/deriveColumnsFromData.js";
import skeletonJson from "./skeleton.json" with { type: "json" };

const startFunc = ({
    targetHtmlId,
    inTargetHtmlId,
    inData,
    data,
    inColumns,
    columns,
    inSkeletonJson = skeletonJson,
    inShowLog = false
} = {}) => {
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;
    const localData = inData ?? data ?? [];
    const localColumns = inColumns ?? columns ?? deriveColumnsFromData({ inData: localData });
    const localSkeletonJson = inSkeletonJson;
    const localShowLog = inShowLog;

    try {
        const specAsJsonToDom = jsonToSpec({
            specJson: localSkeletonJson,
            dataJson: {
                columns: localColumns,
                data: localData
            },
            showLog: localShowLog
        });

        const targetContainer = (typeof localTargetHtmlId === "string")
            ? document.getElementById(localTargetHtmlId)
            : localTargetHtmlId;

        if (!targetContainer) return;

        targetContainer.innerHTML = "";

        const renderedTable = jsonToTag(specAsJsonToDom);

        if (Array.isArray(renderedTable)) {
            renderedTable.forEach(el => targetContainer.append(el));
        } else {
            targetContainer.append(renderedTable);
        }

        return renderedTable;
    } catch (error) {
        console.error("[json-render-table:v1:simple] Error rendering table:", error);
    }
};

export default startFunc;

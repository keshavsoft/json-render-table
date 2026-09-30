import registerGlobal from "./registerGlobal.js";
import renderSimpleTable from "./simple/index.js";

const FLAVOR_MAP = {
    simple: renderSimpleTable,
    default: renderSimpleTable
};

const render = ({
    flavor = "simple",
    inFlavor,
    data,
    inData,
    columns,
    inColumns,
    targetHtmlId,
    inTargetHtmlId,
    ...restProps
} = {}) => {
    const localFlavor = inFlavor ?? flavor ?? "simple";
    const localData = inData ?? data;
    const localColumns = inColumns ?? columns;
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;

    const renderer = FLAVOR_MAP[localFlavor.toLowerCase()] ?? FLAVOR_MAP.default;

    return renderer({
        inData: localData,
        inColumns: localColumns,
        inTargetHtmlId: localTargetHtmlId,
        ...restProps
    });
};

registerGlobal(render);

export { renderSimpleTable };
export default render;

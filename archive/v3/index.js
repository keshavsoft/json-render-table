import registerGlobal from "./registerGlobal.js";
import renderSimple from "./simple/index.js";
import renderHeaderOnly from "./headerOnly/index.js";
import renderWithBodyAndFooter from "./withBodyAndFooter/index.js";

const TABLE_TYPE_MAP = {
    simple: renderSimple,
    default: renderSimple,
    headeronly: renderHeaderOnly,
    "header-only": renderHeaderOnly,
    header: renderHeaderOnly,
    withbodyandfooter: renderWithBodyAndFooter,
    "with-body-and-footer": renderWithBodyAndFooter,
    bodyandfooter: renderWithBodyAndFooter,
    footer: renderWithBodyAndFooter
};

const render = ({
    inTableType,
    tableType,
    inFlavor,
    flavor,
    inType,
    type,
    inData,
    data,
    inColumns,
    columns,
    inFooterData,
    footerData,
    inTargetHtmlId,
    targetHtmlId,
    ...restProps
} = {}) => {
    const localTableType = inTableType ?? tableType ?? inFlavor ?? flavor ?? inType ?? type ?? "simple";
    const resolvedType = typeof localTableType === "string" ? localTableType.toLowerCase() : "simple";
    const localData = inData ?? data;
    const localColumns = inColumns ?? columns;
    const localFooterData = inFooterData ?? footerData;
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;

    const renderer = TABLE_TYPE_MAP[resolvedType] ?? TABLE_TYPE_MAP.default;

    return renderer({
        inData: localData,
        inColumns: localColumns,
        inFooterData: localFooterData,
        inTargetHtmlId: localTargetHtmlId,
        ...restProps
    });
};

registerGlobal(render);

export { renderSimple, renderHeaderOnly, renderWithBodyAndFooter };
export default render;

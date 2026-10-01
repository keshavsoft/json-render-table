import { resolveColumns } from "../common/resolveColumns.js";

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

const startFunc = ({
    flavor,
    tableType,
    data,
    columns,
    footerData
} = {}) => {
    const localFlavorRaw = flavor !== "simple" ? flavor : (tableType ?? flavor);
    const localFlavorKey = FLAVOR_MAP[String(localFlavorRaw ?? "simple").toLowerCase()] ?? "simple";
    const localData = Array.isArray(data) ? data : [];
    const localColumns = columns;
    const localFooterData = footerData;

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

    return sourceData;
};

export default startFunc;

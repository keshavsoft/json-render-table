import deriveColumnsFromData from "./deriveColumnsFromData.js";

/**
 * Resolve columns using strict guard:
 * If columns are supplied from outside, use them directly.
 * Only if columns are NOT supplied, extract from the first record.
 */
const resolveColumns = ({ inColumns, inData } = {}) => {
    const localColumns = inColumns;
    const localData = inData;

    // 1. Outside columns supplied: use directly without inspecting records
    if (Array.isArray(localColumns) && localColumns.length > 0) {
        return localColumns.map((col) =>
            typeof col === "string" ? col : (col.key ?? col.title ?? col.label)
        );
    }

    // 2. Guard: Only if columns are not sent, extract from first data record
    return deriveColumnsFromData({ inData: localData }).map((col) => col.key);
};

export { resolveColumns };
export default resolveColumns;

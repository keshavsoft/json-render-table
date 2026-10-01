import jsonTraversal from "json-traversal";

import prepareSource from "./prepareSource.js";
import prepareRecipe from "./prepareRecipe.js";

const startFunc = ({
    flavor = "simple",
    tableType,
    data = [],
    columns,
    footerData
} = {}) => {
    const sourceData = prepareSource({
        flavor,
        tableType,
        data,
        columns,
        footerData
    });

    const localRecipe = prepareRecipe({ flavor, tableType });

    const domSpec = jsonTraversal.transform(sourceData, localRecipe);

    return domSpec;
};

export default startFunc;

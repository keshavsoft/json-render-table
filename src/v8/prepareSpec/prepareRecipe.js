import recipes from "../recipes.json" with { type: "json" };

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
    flavor = "simple",
    tableType
} = {}) => {
    const localFlavorRaw = flavor !== "simple" ? flavor : (tableType ?? flavor);
    const localFlavorKey = FLAVOR_MAP[String(localFlavorRaw ?? "simple").toLowerCase()] ?? "simple";
    const localRecipe = recipes[localFlavorKey] ?? recipes.simple;

    return localRecipe;
};

export default startFunc;

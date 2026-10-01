const registerGlobal = (renderFunc) => {
    if (typeof window !== "undefined") {
        window.renderTable = renderFunc;
    }
};

export default registerGlobal;

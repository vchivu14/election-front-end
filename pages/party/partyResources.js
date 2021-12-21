export default() => {
    const bodyNode = document.querySelector("body");
    let script = document.createElement("script");
    script.src = "./resources/js/containerAlignment.js";
    script.type = "text/javascript";
    bodyNode.appendChild(script);

    let scriptTwo = document.createElement("script");
    scriptTwo.src = "./resources/js/filterForTable.js";
    scriptTwo.type = "text/javascript";
    bodyNode.appendChild(scriptTwo);
}
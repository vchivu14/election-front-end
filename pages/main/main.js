export default () => {
    const content = document.querySelector("#content");

    return fetch("./pages/main/main.html")
        .then((response) => response.text())
        .then((theHtml) => {
            content.innerHTML = theHtml;
        })
}
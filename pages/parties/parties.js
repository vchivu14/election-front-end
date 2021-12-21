import { SERVER_URL } from "../../constants.js"
let parties = [];

const getHTML = async () => {
    const content = document.querySelector("#content");
    const response = await fetch("./pages/parties/parties.html")
    const html = await response.text();
    content.innerHTML = html;
    fetchParties();
    // addListenerForRows();
}

const fetchParties = async () => {
    const response = await fetch(`${SERVER_URL}/api/parties`);
    parties = await response.json();
    const tableBody = document.querySelector("#parties tbody");
    generateHTML(tableBody, parties);
}

const generateHTML = (parentElement, parties) => {
    let HTML = ``;
    parties.forEach((party, i) => {
        HTML += `
            <tr>
                <th data-rowindex=${i}>${i+1}</th>
                <th data-rowindex=${i}>${party.name}</th>
                <a class="btn btn-outline-primary" href="/#/parties/${party.id}" data-navigo>Go</a>
            </tr>
        `
    });
    parentElement.innerHTML = HTML;
}

// const addListenerForParties = () => {
//     const rows = Array.from(document.querySelectorAll("tbody tr"));
//     rows.forEach(row => {
//         row.addEventListener("click", (e) => {
//             console.log("whatsapp");
//             const id = e.target.getAttribute('data-id');
//             location.replace("#/parties/"+id, data-navigo)
//         })
//     })
// }

// const addListenerForRows = () => {
//     const rows = Array.from(document.querySelectorAll("tbody tr"));
//     rows.forEach(row => {
//         row.addEventListener("click", (e) => {
//             const partyIndex = e.target.getAttribute('data-rowindex');
//             console.log(partyIndex);
//         })
//     })
// }


export default () => getHTML();
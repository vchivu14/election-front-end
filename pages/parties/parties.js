import { SERVER_URL } from "../../constants.js"
let parties = [];

const getHTML = async () => {
    const content = document.querySelector("#content");
    const response = await fetch("./pages/parties/parties.html")
    const html = await response.text();
    content.innerHTML = html;
    fetchParties();
    addListenerForParties();
}

const fetchParties = async () => {
    const response = await fetch(`${SERVER_URL}/api/parties`);
    const parties = await response.json();
    generateHTML(document.querySelector("tbody"), parties);
}

const generateHTML = (parentElement, parties) => {
    let HTML = ``;
    parties.forEach((party, i) => {
        HTML += `
            <tr>
                <a href="/#/parties/${party.id}" data-navigo>
                    <th data-rowindex=${i}>${i+1}</th>
                    <th data-rowindex=${i}>${party.name}</th>
                </a>
            </tr>
        `
    });
    parentElement.innerHTML = HTML;
}

const addListenerForParties = () => {
    const rows = Array.from(document.querySelectorAll("tbody tr"));
    rows.forEach(row => {
        row.addEventListener("click", (e) => {
            console.log("whatsapp");
            const id = e.target.getAttribute('data-id');
            location.replace("#/parties/"+id, data-navigo)
        })
    })
}

export default () => getHTML();
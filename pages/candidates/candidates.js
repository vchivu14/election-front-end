import { SERVER_URL } from "../../constants.js"
let candidates = [];

const getHTML = async () => {
    const content = document.querySelector("#content");
    const response = await fetch("./pages/candidates/candidates.html")
    const html = await response.text();
    content.innerHTML = html;
    fetchCandidates();
}

const fetchCandidates = async () => {
    const response = await fetch(`${SERVER_URL}/api/candidates`);
    const candidates = await response.json();
    generateHTML(document.querySelector("tbody"), candidates);
}

const generateHTML = (parentElement, candidates) => {
    let HTML = ``;
    candidates.forEach((candidate, i) => {
        HTML += `
            <tr>
                <th data-rowindex=${i}>${i+1}</th>
                <th data-rowindex=${i}>${candidate.firstName}</th>
                <th data-rowindex=${i}>${candidate.lastName}</th>
            </tr>
        `
    });
    parentElement.innerHTML = HTML;
}

export default () => getHTML();
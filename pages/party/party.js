import { SERVER_URL } from "../../constants.js"
let candidates = [];
let idParty;

const fetchData = async (partyId) => {
    try {
        const response = await fetch(`${SERVER_URL}/api/party?id=${partyId}`);
        idParty = partyId;
        const data = await response.json();
        candidates = data.candidateDTOList;
        const tableBody = document.querySelector("#firstTable tbody");
        generateHTML(tableBody, candidates);
        addListenerForRows();
        addListenerToCloseUpdateModel();
        addListenerForCandidateCreate();
        addListenerForCandidateUpdate();
        addListenerForCandidateRemove();
    } catch (error) {
        console.log(error)
    }
}

const getHTML = async (params) => {
    const content = document.querySelector("#content");
    const response = await fetch("./pages/party/party.html")
    const html = await response.text()
    content.innerHTML = html;
    fetchData(params.data.id);
}


export default (params) => getHTML(params);

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

const addListenerForRows = () => {
    const rows = Array.from(document.querySelectorAll("tbody tr"));
    rows.forEach(row => {
        row.addEventListener("click", (e) => {
            const candidateIndex = e.target.getAttribute('data-rowindex');
            console.log(candidateIndex);
            const candidate = candidates[candidateIndex];
            console.log(candidate);
            displayUpdateModel(candidate);
        })
    })
}

const addListenerToCloseUpdateModel = () => {
    document.getElementById("firstContainerChildTwoButtonUnShow").addEventListener("click", () => {
        document.getElementById("updateCandidate").style.display = "none";
    })
}

const addListenerForCandidateCreate = () => {
    const form = document.querySelector("#candidateForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            partyId: idParty
        }

        fetch(`${SERVER_URL}/api/candidate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                fetchData(idParty);
                form.reset();
                document.getElementById("firstContainerChildOne").style.display = "none";
                document.getElementById("firstContainerChildOneButtonShow").style.display = "block";
            })
            .catch(error => console.log(error));
    })
}

const addListenerForCandidateUpdate = () => {
    const form = document.querySelector("#candidateUpdateForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = {
            id: form.id.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
        }

        fetch(`${SERVER_URL}/api/candidate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                fetchData(idParty);
                form.reset();
                document.getElementById("updateCandidate").style.display = "none"
            })
            .catch(error => console.log(error));
    })
}

const addListenerForCandidateRemove = () => {
    let removeButton = document.getElementById("candidateRemove");
    removeButton.addEventListener("click", (e) => {
        e.preventDefault()
        const form = document.querySelector("#candidateUpdateForm");
        const candidateId = form.id.value;

        fetch(`${SERVER_URL}/api/candidate?id=`+candidateId, {
            method: 'DELETE',
        })
            .then(data => {
                fetchData(idParty);
                form.reset();
                document.getElementById("updateCandidate").style.display = "none"
            })
            .catch(error => console.log(error));
    })
}

const displayUpdateModel = candidate => {
    document.getElementById("updateCandidate").style.display = "block";
    const form = document.querySelector("#candidateUpdateForm");
    form.id.value = candidate.id;
    form.firstName.value = candidate.firstName;
    form.lastName.value = candidate.lastName;
}

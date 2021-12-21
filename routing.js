import renderMain from "./pages/main/main.js";
import renderParties from "./pages/parties/parties.js";
import renderParty from "./pages/party/party.js";
import renderCandidates from "./pages/candidates/candidates.js"
import partyResources from "./pages/party/partyResources.js";

export default function () {
    const router = new Navigo("/", { hash: true });

    router
        .on({
            "/": () => {
                renderMain();
        },
            "/parties": () => {
                renderParties();
        },
            "/parties/:id": (params) => {
                renderParty(params).then(router.updatePageLinks);
                partyResources();
        },
            "/candidates": () => {
                renderCandidates();
        }
    })
        .resolve();
}
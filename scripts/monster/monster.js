import { generateHTML } from "./monster-data-fill.js";
import { hideSideButtons } from "./monster-events.js";

let monster;
var spells = {};
let innate_spells = [];
const id = getURLParameter("id").toLowerCase();
const api = "https://jgss-web-service.onrender.com/hnm";

function accentsTidy(s){
    var r = s.toLowerCase();
    non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
    for (i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
    return r;
};

function getURLParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

async function getMonsterData() {
    const monster_response = await fetch(api+`/query-${id}`);
    monster = await monster_response.json();

    if(monster.spells.length > 0){
        for (let i = 0; i < monster.spells.length; i++) {
            const response = await fetch(api+`/query-${accentsTidy(monster.spells[i])}`);
            spells[monster.spells[i]] = await response.json()
        }
    }
    if(monster.innate_spellcasting.length > 0){
        for (let i = 0; i < monster.innate_spellcasting.length; i++) {
            const response = await fetch(api+`/query-${accentsTidy(monster.innate_spellcasting[i].spell)}`);
            spells[monster.innate_spellcasting[i].spell] = await response.json()
        }
    }

    hideSideButtons(monster);

    generateHTML(monster);
}

document.querySelector("#back-btn").addEventListener("click", () => {
    location.href = "index.html";
});

getMonsterData();
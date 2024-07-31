import { accentsTidy } from "../utils.js";
import { generateHTML } from "./display.js";
import { hideSideButtons } from "./monster-events.js";

let monster;
export let spells = {};
let innate_spells = [];
const keyMonster = getURLParameter("id").toLowerCase();
const apiURL = "https://jgss-web-service.onrender.com/hnm";

function getURLParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

async function getMonsterData() {
    const monsterResponse = await fetch(apiURL+`/query-${keyMonster}`);
    monster = await monsterResponse.json();
    
    const spellPromises = [];

    if(monster.spells.length > 0){
        monster.spells.forEach(spell => {
            const responsePromise = fetch(apiURL + `/query-${accentsTidy(spell)}`).then(response => response.json());
            spellPromises.push(responsePromise);
        });
    }
    if(monster.innate_spellcasting.length > 0){
        monster.innate_spellcasting.forEach(spellCasting => {
            const responsePromise = fetch(apiURL + `/query-${accentsTidy(spellCasting.spell)}`).then(response => response.json());
            spellPromises.push(responsePromise);
        });
    }

    const spellsArray = await Promise.all(spellPromises);
    spellsArray.forEach((spellData, index) => {
        if (index < monster.spells.length) {
            spells[monster.spells[index]] = spellData;
        } else {
            spells[monster.innate_spellcasting[index - monster.spells.length].spell] = spellData;
        }
    });

    hideSideButtons(monster);
    generateHTML(monster);
}

document.querySelector("#back-btn").addEventListener("click", () => history.back());

getMonsterData();
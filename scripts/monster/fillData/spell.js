import { getSpellCost } from "../../utils.js";
import { spells } from "../monster.js";

export function generateSpellHTML(type, spellName, spell_attribute_modvalue, spell_limit){
    const spell = spells[spellName];
    const spellDC = 6 + spell_attribute_modvalue + spell.magic_circle;

    // Função auxiliar para gerar linhas de evolução da magia
    function generateSpellEvolutionHTML(evolutionArray, evolutionType) {
        let evolutionHTML = '<table><tr><th>' + (evolutionType === "level" ? "Nível" : evolutionType === "mana" ? "Mana" : evolutionType) + '</th><th>Efeito</th></tr>';
        evolutionArray.forEach(evolution => {
            evolutionHTML += `<tr><td>${evolution[0]}</td><td>${evolution[1]}</td></tr>`;
        });
        evolutionHTML += '</table>';

        return evolutionHTML;
    }

    let HTML = `
    <div class="action-element">
        <div class="action-name">
            <h4>${spell.name} (${spell.magic_circle}º Círculo)</h4>
        </div>`;

    if(type == "innate"){
        HTML += `
            <h4>${spell_limit}</h4>
            <div id="innate-spell-info" class="action-info">
        `;
    } else {
        HTML += `
        <div class="action-info">
            <p><b>Custo de Mana:&nbsp;</b>${getSpellCost(spell.magic_circle)}</p>
        `;
    }

    HTML += `<p><b>Tempo de Conjuração:&nbsp;</b>${spell.cast_time}</p>`;

    if(spell.range) {
        HTML += `<p><b>Alcance:&nbsp;</b>${spell.range}</p>`;
    }

    if(spell.attack_roll) {
        HTML += `<p><b>Rolagem de Ataque:&nbsp;</b><button class="roll-button">+${spell_attribute_modvalue}</button></p>`;
    }

    spell.damage.forEach(dmg => {
        HTML += `<p><b>${dmg[0]}:&nbsp;</b><button class="roll-button">${dmg[1]}</button></p>`;
    });

    if(spell.heal) {
        HTML += `<p><b>Cura:&nbsp;</b><button class="roll-button">${spell.name === "Cura" ? `d8+${spell_attribute_modvalue}` : spell.heal}</button></p>`;
    }

    if(spell.saving_trow) {
        HTML += `<p><b>Teste de Salvamento:&nbsp;</b>${spellDC} de ${spell.saving_trow}</p>`;
    }

    if(spell.duration) {
        HTML += `<p><b>Duração:&nbsp;</b>${spell.duration}${spell.concentration ? " (Concentração)" : ""}</p>`;
    }

    if(spell.description.length) {
        HTML += `<div class="spell-description"><p><b>Efeito:&nbsp;</b><span>${spell.description[0]}</span></p>`;
        for (let j = 1; j < spell.description.length; j++) {
            HTML += `<p>${spell.description[j]}</p>`;
        }
    }

    if(spell.spell_evolution.length) {
        const evolutionDesc = spell.spell_evolution_type === "level" ? "Esta magia evolui conforme seu nível de conjurador:" :
                              spell.spell_evolution_type === "mana" ? "Esta magia evolui se conjurada com o custo de mana de um círculo superior:" :
                              spell.spell_evolution_desc;
        
        HTML += `<p>${evolutionDesc}</p>`;
        HTML += generateSpellEvolutionHTML(spell.spell_evolution, spell.spell_evolution_type);
    }

    HTML += `</div></div>`;

    if(type == "innate"){
        document.querySelector("#innate-spells .spell-list").innerHTML += HTML;
    } else {
        document.querySelector("#spells .spell-list").innerHTML += HTML;
    }
}
import { addDecimalPoints, convertNumberToFraction, getAttributeFromPortugueseName, showStats_Meters } from "../utils.js";
import { generateSpellHTML } from "./fillData/spell.js";
import { fillData_skills } from "./fillData/skills.js";
import { fillData_res_and_immunities } from "./fillData/resistances_and_immunities.js";
import { fillData_attributes } from "./fillData/attributes.js";


export function generateHTML(monster) {
    let title = monster.name;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    document.querySelector("title").innerHTML = title;

    document.querySelector("main h1").innerHTML = monster.name;

    document.querySelector("main h3").innerHTML = `${monster.type}, ${monster.size}`;

    document.querySelector("#monster-image").alt = monster.name;
    document.querySelector("#monster-image").src = `./img/monsters/${monster.english_name.toLowerCase()}.webp`;
    document.querySelector("#monster-image").onerror = function() {
        this.onerror = null;
        this.src = `../img/monsters/${monster.english_name.toLowerCase()}.webp`;
    };
    
    function setElementText(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerText = text;
        }
    }
    
    function setElementWidth(selector, width) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.width = width;
        }
    }

    function updateCRBar(selector, value, logBase) {
        setElementText(selector+"-value", convertNumberToFraction(value));
        setElementWidth(selector+"-bar", ((Math.log(value + 1) / Math.log(logBase)) * 100) + "%");
    }
    
    updateCRBar("#cr", monster.challenge_ratio, 30);
    updateCRBar("#atk", monster.atk_cr, 30);
    updateCRBar("#dmg", monster.damage_cr, 30);
    updateCRBar("#res", monster.resistances_and_immunities_cr, 30);
    updateCRBar("#hp", monster.hp_cr, 30);
    updateCRBar("#def", monster.defense_cr, 30);

    //###############################################################################################################################################################################

    document.querySelector("#stats-alignment span").innerText = monster.alignment;
    //document.querySelector("#stats-challenge-ratio span").innerText = convertNumberToFraction(monster.challenge_ratio);
    document.querySelector("#stats-xp span").innerText = addDecimalPoints(monster.xp);
    document.querySelector("#stats-defense span").innerText = monster.defense;
    document.querySelector("#stats-hp span").innerText = addDecimalPoints(monster.hp);

    showStats_Meters(monster.movement_walking,"#stats-deslocamento-w");
    showStats_Meters(monster.movement_hovering,"#stats-deslocamento-h");
    showStats_Meters(monster.movement_flying,"#stats-deslocamento-f");
    showStats_Meters(monster.movement_burrow,"#stats-deslocamento-d");
    showStats_Meters(monster.movement_climbing,"#stats-deslocamento-c");
    showStats_Meters(monster.movement_swimming,"#stats-deslocamento-s");
    showStats_Meters(monster.dark_vision,"#stats-dark-vision");
    showStats_Meters(monster.blind_sight,"#stats-blind-sight");
    showStats_Meters(monster.tremor_sense,"#stats-tremor-sense");
    showStats_Meters(monster.true_vision,"#stats-true-vision");

    if(monster.spellcaster_level != 0){
        document.querySelector("#spells").style.display = "block";
    }

    if(monster.bonuses_in_defense.length != 0){
        document.querySelector("#stats-defense span").innerText += "\u00A0("
        for (let i = 0; i < monster.bonuses_in_defense.length; i++) {
            document.querySelector("#stats-defense span").innerText += monster.bonuses_in_defense[i].value + " = " + monster.bonuses_in_defense[i].name;
            if(i+1 < monster.bonuses_in_defense.length){
                document.querySelector("#stats-defense span").innerText += ";\u00A0"
            }
        }
        document.querySelector("#stats-defense span").innerText += ")"
    }

    fillData_skills(monster.skills);
    fillData_res_and_immunities("vulnerability", monster.vulnerability);
    fillData_res_and_immunities("resistances", monster.resistances);
    fillData_res_and_immunities("immunities", monster.immunities);
    fillData_res_and_immunities("condition_immunities", monster.condition_immunities);

    if(monster.languages.length != 0){
        document.querySelector("#stats-languages").style.display = "block";

        if(monster.only_understands == true)
            document.querySelector("#stats-languages").innerHTML = "<b>Idiomas que compreende, mas não pode falar:&nbsp</b><span></span>";
        else
            document.querySelector("#stats-languages").innerHTML = "<b>Idiomas:&nbsp</b><span></span>";

        for (let i = 0; i < monster.languages.length; i++) {
            document.querySelector("#stats-languages span").innerText += monster.languages[i];
            if(i+1 < monster.languages.length){
                document.querySelector("#stats-languages span").innerText += ",\u00A0"
            }
        }
    }
    if(monster.telepathy == true){
        document.querySelector("#stats-languages > b").innerText = "Idiomas (Telepatia):\u00A0";
    }

    fillData_attributes(monster);

    //###############################################################################################################################################################################

    if(monster.abilities.length != 0){
        document.querySelector("#abilities").style.display = "block";

        for (let i = 0; i < monster.abilities.length; i++) {            
            let elementHTML =`
                    <div class="ability-description">
                        <p><b>${monster.abilities[i].name}:&nbsp</b><span>${monster.abilities[i].description[0]}</span></p>
                    `
            
            if(monster.abilities[i].description.length > 1){
                for (let j = 1; j < monster.abilities[i].description.length; j++) {
                    elementHTML += `<p>${monster.abilities[i].description[j]}</p>`;
                }
            }

            elementHTML += `</div>`
            document.getElementById("abilities-list").innerHTML += elementHTML;
        }
    }


    //###############################################################################################################################################################################


    for (let i = 0; i < monster.actions.length; i++) {
        const action = monster.actions[i];

        let elementHTML = `
        <div class="action-element">
            <div class="action-info">
                <h4>${action.name}</h4>
        `

        if(action.limit != ""){
            elementHTML += `<p><b>Limite:&nbsp</b>${action.limit}</p>`
        }
        if(action.recharge != ""){
            elementHTML += `<p><b>Recarga:&nbsp</b>${action.recharge}</p>`
        }
        if(action.range != ""){
            elementHTML += `<p><b>Alcance:&nbsp</b>${action.range}</p>`
        }
        if(action.roll != ""){
            elementHTML += `<p><b>Rolagem de Ataque:&nbsp</b><button class="roll-button">${action.roll}</button></p>`
        }
        if(action.damage != ""){
            elementHTML += `<p><b>Dano:&nbsp</b><button class="damage-button">${action.damage}</button></p>`
        }
        if(action.save_throw != ""){
            elementHTML += `<p><b>Teste de Salvamento:&nbsp</b>${action.save_throw}</p>`
        }
        if(action.time != ""){
            elementHTML += `<p><b>Tempo:&nbsp</b>${action.time}</p>`
        }
        if(action.effect.length != 0){
            elementHTML +=`
                    <div class="spell-description">
                        <p><b>Efeito:&nbsp</b><span>${action.effect[0]}</span></p>
                    `
            
            if(action.effect.length > 1){
                for (let j = 1; j < action.effect.length; j++) {
                    elementHTML += `<p>${action.effect[j]}</p>`;
                }
            }

            elementHTML += `</div>`
        }

        elementHTML +=`</div></div>`

        document.querySelector("#actions .action-list").innerHTML += elementHTML;
    }


    //###############################################################################################################################################################################


    if(monster.innate_spellcasting.length != 0){
        document.querySelector("#innate-spells").style.display = "block";

        const spell_attribute_modvalue = Math.floor((getAttributeFromPortugueseName(monster.innate_spellcasting_attribute, monster)-10)/2);
        
        if(monster.innate_spellcasting_description != ""){
            document.querySelector("#innate-spells-description").innerText = monster.innate_spellcasting_description;
        }
        else{
            const name = monster.name_pronoun.charAt(0).toUpperCase() + monster.name_pronoun.slice(1);
            document.querySelector("#innate-spells-description").innerText = name + " pode conjurar de maneira inata as seguintes magias:";
        }

        if(monster.innate_spellcasting_attribute != ""){
            document.querySelector("#innate-spells-attribute").style.display = "block";
            document.querySelector("#innate-spells-attribute").innerHTML = `<b>Atributo de Conjuração:&nbsp</b>${monster.innate_spellcasting_attribute} (+${spell_attribute_modvalue})`;
        }

        for (let i = 0; i < monster.innate_spellcasting.length; i++) {
            generateSpellHTML("innate", monster.innate_spellcasting[i].spell, spell_attribute_modvalue, monster.innate_spellcasting[i].limit);
        }
    }


    //###############################################################################################################################################################################


    if(monster.spellcaster_level != 0){
        document.querySelector("#spells").style.display = "block";

        document.querySelector("#spellcaster-level span").innerText = monster.spellcaster_level+"º";
        document.querySelector("#mana-value span").innerText = monster.mana;
        
        const spell_attribute_modvalue = Math.floor((getAttributeFromPortugueseName(monster.spellcasting_attribute, monster)-10)/2);
        
        document.querySelector("#spellcasting-attribute span").innerText = monster.spellcasting_attribute+" (+"+spell_attribute_modvalue+")";

        if(monster.special_spell_feature != "")
            document.querySelector("#special-spell-feature span").innerText = monster.special_spell_feature;
        else{
            const elem = document.getElementById("special-spell-feature");
            elem.parentNode.removeChild(elem);
        }

        if(monster.arcane_failure != 0)
            document.querySelector("#arcane-failure span").innerText = monster.arcane_failure+"%"
        else{
            const elem = document.getElementById("arcane-failure");
            elem.parentNode.removeChild(elem);
        }
        

        for (let i = 0; i < monster.spells.length; i++) {
            generateSpellHTML("spell",monster.spells[i],spell_attribute_modvalue,"");
        }
    }


    //###############################################################################################################################################################################

    
    if(monster.legendary_actions.length != 0){
        document.querySelector("#legendary-actions").style.display = "block";

        const name = monster.name_pronoun.charAt(0).toUpperCase() + monster.name_pronoun.slice(1);

        document.querySelector("#legendary-actions").innerHTML += "<p>"+name+" pode realizar 3 ações lendárias, escolhidas dentre as opções abaixo. Apenas uma ação lendária pode ser usada por vez e apenas no final do turno de outra criatura. "+name+" recupera as ações lendárias gastas no começo do turno dele:</p>";

        for (let i = 0; i < monster.legendary_actions.length; i++) {
            let action = "<li><b>"+monster.legendary_actions[i].name;

            if(monster.legendary_actions[i].cost == 1){
                action += ":</b>";
            }
            else{
                action += " (Custa "+monster.legendary_actions[i].cost+" Ações):</b>";
            }

            action += ` ${monster.legendary_actions[i].description}</li>`;

            document.querySelector("#legendary-actions").innerHTML += action;
        }
    }
    
    
    //###############################################################################################################################################################################


    if(monster.lair_description.length != 0){
        document.querySelector("#lair").style.display = "block";

        for (let i = 0; i < monster.lair_description.length; i++) {
            document.querySelector("#lair").innerHTML += `<p class="description-text">${monster.lair_description[i]}</p>`;
        }
    }


    //###############################################################################################################################################################################

    
    if(monster.lair_actions.length != 0){
        document.querySelector("#lair-actions").style.display = "block";

        document.querySelector("#lair-actions").innerHTML += "<p>Quando estiver lutando dentro de seu covil, "+monster.name_pronoun+" pode invocar a magia ambiente para realizar ações de covil. No valor de iniciativa 20 (quebrando toda a sequência de iniciativa), "+monster.name_pronoun+" realiza uma ação de covil, fazendo um dos efeitos a seguir:</p>";

        for (let i = 0; i < monster.lair_actions.length; i++) {
            document.querySelector("#lair-actions").innerHTML += `<li>${monster.lair_actions[i]}</li>`;
        }
    }
    
    
    //###############################################################################################################################################################################


    if(monster.regional_effects_description.length != 0){
        document.querySelector("#regional-effects").style.display = "block";

        for (let i = 0; i < monster.regional_effects_description.length; i++) {
            document.querySelector("#regional-effects").innerHTML += `<li>${monster.regional_effects_description[i]}</li>`;
        }

        document.querySelector("#regional-effects").innerHTML += `<p>${monster.regional_effects_dissolution}</p>`;
    }


    //###############################################################################################################################################################################
    

    if(monster.description.length != 0){
        document.querySelector("#description").style.display = "block";

        for (let i = 0; i < monster.description.length; i++) {
            document.querySelector("#description").innerHTML += `<p class="description-text">${monster.description[i]}</p>`;
        }
    }


    //###############################################################################################################################################################################
    const attributes = {
        FOR: {
            element: document.getElementById("attribute-FOR"),
            content: `
                <ul>
                    <li>Atletismo</li>
                </ul>
            `
        },
        VIT: {
            element: document.getElementById("attribute-VIT"),
            content: `
                <ul>
                    <li>Resistência</li>
                </ul>
            `
        },
        AGI: {
            element: document.getElementById("attribute-AGI"),
            content: `
                <ul>
                    <li>Acrobacia</li>
                    <li>Furtividade</li>
                    <li>Ladroagem</li>
                    <li>Reflexos</li>
                </ul>
            `
        },
        CAR: {
            element: document.getElementById("attribute-CAR"),
            content: `
                <ul>
                    <li>Atuação</li>
                    <li>Diplomacia</li>
                    <li>Enganação</li>
                </ul>
            `
        },
        VON: {
            element: document.getElementById("attribute-VON"),
            content: `
                <ul>
                    <li>Concentração</li>
                    <li>Coragem</li>
                    <li>Intimidação</li>
                </ul>
            `
        },
        SAB: {
            element: document.getElementById("attribute-SAB"),
            content: `
                <ul>
                    <li>Iniciativa</li>
                    <li>Lidar com Animais</li>
                    <li>Medicina</li>
                    <li>Percepção</li>
                    <li>Sobrevivência</li>
                </ul>
            `
        },
        INT: {
            element: document.getElementById("attribute-INT"),
            content: `
                <ul>
                    <li>Arcanismo</li>
                    <li>Conhecimento</li>
                    <li>Construir</li>
                    <li>Investigação</li>
                    <li>Religião</li>
                </ul>
            `
        }
    };
    
    Object.values(attributes).forEach(attr => {
        tippy(attr.element, {
            content: attr.content,
            allowHTML: true,
            interactive: true,
            theme: 'attributes',
        });
    });
    

    
    //###############################################################################################################################################################################
    
    document.querySelectorAll(".damage-button").forEach(e => {
        e.addEventListener("click", event => {
            const damageString = event.target.innerText;
            const roll = rollDice(damageString);
            let html = ``;
            html += `<table class="roll-table">`

            roll.results.forEach(result => {
                
                html += `
                <tr>
                    <td>${result.expression}:</td>
                    <td>(
                `

                for (let i = 0; i < result.subroll.length; i++) {
                    const r = result.subroll[i];
                    
                    html += `
                        ${r.roll}
                    `

                    if(i+1 < result.subroll.length){
                        html += ` + `
                    }
                    else if(result.modifier != 0) {
                        html += `) + ${result.modifier}`
                    }
                    else {
                        html += `)`
                    }
                }

                html += `
                        <td>=</td>
                        <td><b>${result.total}</b></td>
                    <tr>
                `
            });


            Swal.fire({
                html: `
                    ${html}
                    <h1>${roll.total}</h1>
                `,
                showCloseButton: true,
                focusConfirm: false,
              });
        });
    });


    document.querySelectorAll(".roll-button").forEach(e => {
        e.addEventListener("click", event => {
            const damageString = "d20"+event.target.innerText;
            const roll = rollDice(damageString);
            let html = ``;
            html += `<table class="roll-table">`

            roll.results.forEach(result => {
                
                html += `
                <tr>
                    <td>${result.expression}:</td>
                    <td>(
                `

                for (let i = 0; i < result.subroll.length; i++) {
                    const r = result.subroll[i];
                    
                    html += `
                        ${r.roll}
                    `

                    if(i+1 < result.subroll.length){
                        html += ` + `
                    }
                    else if(result.modifier != 0) {
                        html += `) + ${result.modifier}`
                    }
                    else {
                        html += `)`
                    }
                }

                html += `
                        <td>=</td>
                        <td><b>${result.total}</b></td>
                    <tr>
                `
            });


            Swal.fire({
                html: `
                    ${html}
                    <h1>${roll.total}</h1>
                `,
                showCloseButton: true,
                focusConfirm: false,
              });
        });
    });
}

function rollDice(diceString) {
    function diceRoll(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    function rollSingleDiceExpression(expression) {
        const regex = /(\d*)d(\d+)(\+\d+)?/;
        const matches = expression.match(regex);
        const roll = [];
        roll.subroll = [];

        if (matches) {
            const count = matches[1] ? parseInt(matches[1]) : 1; // Quantidade de dados
            const sides = parseInt(matches[2]); // Lados do dado
            const modifier = matches[3] ? parseInt(matches[3]) : 0; // Modificador adicional

            let total = 0;

            for (let i = 0; i < count; i++) {
                const rollValue = diceRoll(sides);
                
                const subroll = {
                    roll: 0,
                    sides: 0,
                }

                subroll.sides = sides;
                subroll.roll = rollValue;

                roll.subroll.push(subroll);

                total += rollValue;
            }

            roll.expression = matches.input;
            roll.modifier = modifier;
            roll.total = total+modifier;

            total += modifier;

            return roll;

        } else {
            throw new Error("Invalid dice expression format");
        }
    }

    const diceExpressions = diceString.split(' + ');

    const results = diceExpressions.map(rollSingleDiceExpression);

    return {results, total: results.reduce((total, roll) => total + roll.total, 0)};
}
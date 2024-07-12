import { spells } from "./monster.js";
import { addDecimalPoints, convertNumberToFraction, getAttributeFromPortugueseName, getSpellCost, showStats_Meters } from "./utils.js";

function generateSpellHTML(type, spellName, spell_attribute_modvalue, spell_limit){
    const spell = spells[spellName];
    const spellDC = 6 + spell_attribute_modvalue + spell.magic_circle;

    let elementHTML = `
    <div class="action-element">
        <div class="action-name">
            <h4>${spell.name} (${spell.magic_circle}º Círculo)</h4>
        </div>`
        
    if(type == "innate"){
        elementHTML += `
            <h4>${spell_limit}</h4>

            <div id="innate-spell-info" class="action-info">
        `
    }
    else{
        elementHTML += `
        <div class="action-info">
            <p><b>Custo de Mana:&nbsp</b>${getSpellCost(spell.magic_circle)}</p>
        `
    }

    elementHTML += `<p><b>Tempo de Conjuração:&nbsp</b>${spell.cast_time}</p>`

    if(spell.range != ""){
        elementHTML += `<p><b>Alcance:&nbsp</b>${spell.range}</p>`
    }

    if(spell.attack_roll != false){
        elementHTML += `<p><b>Rolagem de Ataque:&nbsp</b>+${spell_attribute_modvalue}</p>`
    }

    for (let i = 0; i < spell.damage.length; i++) {
        elementHTML += `<p><b>${spell.damage[i][0]}:&nbsp</b>${spell.damage[i][1]}</p>`
    }

    if(spell.heal != ""){
        if(spell.name == "Cura")
            elementHTML += `<p><b>Cura:&nbsp</b>d8+${spell_attribute_modvalue}</p>`
        else
            elementHTML += `<p><b>Cura:&nbsp</b>${spell.heal}</p>`
    }
    if(spell.saving_trow != ""){
        elementHTML += `<p><b>Teste de Salvamento:&nbsp</b>${spellDC} de ${spell.saving_trow}</p>`
    }
    if(spell.duration != ""){
        elementHTML += `<p><b>Duração:&nbsp</b>${spell.duration}`
        if(spell.concentration)
            elementHTML += ` (Concentração)`;  
        elementHTML += `</p>`;
    }
    if(spell.description.length != 0){
        elementHTML +=`
                <div class="spell-description">
                    <p><b>Efeito:&nbsp</b><span>${spell.description[0]}</span></p>
                `
        
        if(spell.description.length > 1){
            for (let j = 1; j < spell.description.length; j++) {
                elementHTML += `<p>${spell.description[j]}</p>`;
            }
        }
    }
    if(spell.spell_evolution.length != 0){
        if(spell.spell_evolution_type == "level"){
            elementHTML += "<p>Esta magia evolui conforme seu nível de conjurador:</p>"
        }
        else if(spell.spell_evolution_type == "mana"){
            elementHTML += "<p>Esta magia evolui se conjurada com o custo de mana de um círculo superior:</p>"
        }
        else{
            elementHTML += `<p>${spell.spell_evolution_desc}</p>`
        }
        elementHTML += `</div>`
        
        elementHTML += "<table><tr><th>"

        if(spell.spell_evolution_type == "level"){
            elementHTML += "Nível</th>";
        }
        else if(spell.spell_evolution_type == "mana"){
            elementHTML += "Mana</th>";
        }
        else{
            elementHTML += spell.spell_evolution_type+"</th>";
        }
        
        elementHTML += "<th>Efeito</th></tr>"

        for(let i = 0; i < spell.spell_evolution.length; i++){
            const element = spell.spell_evolution[i];

            elementHTML += `
            <tr>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
            </tr>
            `;
        }

    }
    else{
        elementHTML += `</table></div>`
    }

    elementHTML +=`</div></div>`

    if(type == "innate"){
        document.querySelector("#innate-spells .spell-list").innerHTML += elementHTML;
    }
    else{
        document.querySelector("#spells .spell-list").innerHTML += elementHTML;
    }
}


export function generateHTML(monster) {
    let title = monster.name;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    document.querySelector("title").innerHTML = title;

    document.querySelector("#container h1").innerHTML = monster.name;

    document.querySelector("#container h3").innerHTML = `${monster.type}, ${monster.size}`;

    document.querySelector("#monster-image").alt = monster.name;
    document.querySelector("#monster-image").src = `https://raw.githubusercontent.com/JGSS-GabrielSousa/RPG-Image-API/main/monster/${monster.english_name.toLowerCase()}.webp`;

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

    function updateCR(selector, value, logBase) {
        setElementText(selector+"-value", convertNumberToFraction(value));
        setElementWidth(selector+"-bar", ((Math.log(value + 1) / Math.log(logBase)) * 100) + "%");
    }

    updateCR("#cr", monster.challenge_ratio, 30);
    updateCR("#atk", monster.atk_cr, 30);
    updateCR("#dmg", monster.damage_cr, 30);
    updateCR("#res", monster.resistances_and_immunities_cr, 30);
    updateCR("#hp", monster.hp_cr, 30);
    updateCR("#def", monster.defense_cr, 30);

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
    if(monster.skills.length != 0){
        document.querySelector("#stats-skills").style.display = "block";
        for (let i = 0; i < monster.skills.length; i++) {
            document.querySelector("#stats-skills span").innerText += monster.skills[i];
            if(i+1 < monster.skills.length){
                document.querySelector("#stats-skills span").innerText += ",\u00A0"
            }
        }
    }
    if(monster.vulnerability.length != 0){
        document.querySelector("#stats-vulnerability").style.display = "block";
        for (let i = 0; i < monster.vulnerability.length; i++) {
            document.querySelector("#stats-vulnerability span").innerText += monster.vulnerability[i];
            if(i+1 < monster.vulnerability.length){
                document.querySelector("#stats-vulnerability span").innerText += ",\u00A0"
            }
        }
    }
    if(monster.resistances.length != 0){
        document.querySelector("#stats-resistances").style.display = "block";
        for (let i = 0; i < monster.resistances.length; i++) {
            document.querySelector("#stats-resistances span").innerText += monster.resistances[i];
            if(i+1 < monster.resistances.length){
                document.querySelector("#stats-resistances span").innerText += ",\u00A0"
            }
        }
    }
    if(monster.immunities.length != 0){
        document.querySelector("#stats-immunities").style.display = "block";
        for (let i = 0; i < monster.immunities.length; i++) {
            document.querySelector("#stats-immunities span").innerText += monster.immunities[i];
            if(i+1 < monster.immunities.length){
                document.querySelector("#stats-immunities span").innerText += ",\u00A0"
            }
        }
    }
    if(monster.condition_immunities.length != 0){
        document.querySelector("#stats-condition_immunities").style.display = "block";
        for (let i = 0; i < monster.condition_immunities.length; i++) {
            document.querySelector("#stats-condition_immunities span").innerText += " "+monster.condition_immunities[i];
            if(i+1 < monster.condition_immunities.length){
                document.querySelector("#stats-condition_immunities span").innerText += ","
            }
        }
    }
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


    document.querySelector("#attributes").rows[1].cells[0].innerHTML = monster.strength;
    document.querySelector("#attributes").rows[2].cells[0].innerHTML = (monster.strength >= 10 ? "+" : "") + Math.floor((monster.strength-10)/2);
    
    document.querySelector("#attributes").rows[1].cells[1].innerHTML = monster.vitality;
    document.querySelector("#attributes").rows[2].cells[1].innerHTML = (monster.vitality >= 10 ? "+" : "") + Math.floor((monster.vitality-10)/2);

    document.querySelector("#attributes").rows[1].cells[2].innerHTML = monster.agility;
    document.querySelector("#attributes").rows[2].cells[2].innerHTML = (monster.agility >= 10 ? "+" : "") + Math.floor((monster.agility-10)/2);

    document.querySelector("#attributes").rows[1].cells[3].innerHTML = monster.charisma;
    document.querySelector("#attributes").rows[2].cells[3].innerHTML = (monster.charisma >= 10 ? "+" : "") + Math.floor((monster.charisma-10)/2);

    document.querySelector("#attributes").rows[1].cells[4].innerHTML = monster.willpower;
    document.querySelector("#attributes").rows[2].cells[4].innerHTML = (monster.willpower >= 10 ? "+" : "") + Math.floor((monster.willpower-10)/2);

    document.querySelector("#attributes").rows[1].cells[5].innerHTML = monster.wisdom;
    document.querySelector("#attributes").rows[2].cells[5].innerHTML = (monster.wisdom >= 10 ? "+" : "") + Math.floor((monster.wisdom-10)/2);

    document.querySelector("#attributes").rows[1].cells[6].innerHTML = monster.intelligence;
    document.querySelector("#attributes").rows[2].cells[6].innerHTML = (monster.intelligence >= 10 ? "+" : "") + Math.floor((monster.intelligence-10)/2);  


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


function filterDamageString(damageString) {
    const regex = /(\d*d\d+(\+\d+)?)/g;
    const matches = damageString.match(regex);

    if (matches) {
        const formattedMatches = matches.map(diceValue => {
            if (diceValue.startsWith('d')) {
                diceValue = '1' + diceValue;
            }
            return diceValue;
        });

        const resultString = formattedMatches.join(' + ');

        return resultString;

    } else {
        throw new Error("Invalid damage string format");
    }
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
/*
function rollDice(diceString) {
    function diceRoll(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    const roll = {
        subrolls: [],
        total: 0
    }
    const regex = /(\d*)d(\d+)(\+\d+)?/g;
    let matches;
    let total = 0;

    while ((matches = regex.exec(diceString)) !== null) {
        let count = matches[1] ? parseInt(matches[1]) : 1;
        let sides = parseInt(matches[2]);
        let modifier = matches[3] ? parseInt(matches[3]) : 0;

        for (let i = 0; i < count; i++) {
            const rollValue = diceRoll(sides)

            roll.subrolls.push({
                sides: sides,
                roll: rollValue
            });

            total += rollValue;
        }

        total += modifier;

        roll.total = total
        roll.modifier = modifier
    }

    return roll;
}
*/
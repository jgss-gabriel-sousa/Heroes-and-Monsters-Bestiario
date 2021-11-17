function generateHTML() {
    let title = monster.name;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    document.querySelector("title").innerHTML = title;

    document.querySelector("#container h1").innerHTML = monster.name;

    document.querySelector("#container h3").innerHTML = `${monster.type}, ${monster.size}`;

    document.querySelector("#monster-image").alt = monster.name;
    document.querySelector("#monster-image").src = `https://raw.githubusercontent.com/JGSS-GabrielSousa/DnD-Image-API/main/monster/400px/${monster.english_name.toLowerCase()}.png`;

    document.querySelector("#cr-bar").innerText = convertNumberToFraction(monster.challenge_ratio);
    document.querySelector("#cr-bar").style.width = ((monster.challenge_ratio/30)*100).toString()+"%";

    document.querySelector("#atk-bar").innerText = convertNumberToFraction(monster.atk_cr);
    document.querySelector("#atk-bar").style.width = ((monster.atk_cr/30)*100).toString()+"%";
    
    document.querySelector("#dmg-bar").innerText = convertNumberToFraction(monster.damage_cr);
    document.querySelector("#dmg-bar").style.width = ((monster.damage_cr/30)*100).toString()+"%";

    document.querySelector("#res-bar").innerText = convertNumberToFraction(monster.resistances_and_immunities_cr);
    document.querySelector("#res-bar").style.width = ((monster.resistances_and_immunities_cr/30)*100).toString()+"%";

    document.querySelector("#hp-bar").innerText = convertNumberToFraction(monster.hp_cr);
    document.querySelector("#hp-bar").style.width = ((monster.hp_cr/30)*100).toString()+"%";

    document.querySelector("#def-bar").innerText = convertNumberToFraction(monster.defense_cr);
    document.querySelector("#def-bar").style.width = ((monster.defense_cr/30)*100).toString()+"%";

    //###############################################################################################################################################################################

    document.querySelector("#stats-alignment span").innerText = monster.alignment;
    document.querySelector("#stats-challenge-ratio span").innerText = convertNumberToFraction(monster.challenge_ratio);
    document.querySelector("#stats-xp span").innerText = addDecimalPoints(monster.xp);
    document.querySelector("#stats-defense span").innerText = monster.defense;
    document.querySelector("#stats-hp span").innerText = addDecimalPoints(monster.hp);

    if(monster.mana != 0){
        document.querySelector("#stats-mana").style.display = "block";
        document.querySelector("#stats-mana span").innerText = monster.mana;
    }
    if(monster.movement_walking != 0){
        document.querySelector("#stats-deslocamento-w").style.display = "block";
        document.querySelector("#stats-deslocamento-w span").innerText = monster.movement_walking+" metros";
    }
    if(monster.movement_hovering != 0){
        document.querySelector("#stats-deslocamento-h").style.display = "block";
        document.querySelector("#stats-deslocamento-h span").innerText = monster.movement_hovering+" metros";
    }
    if(monster.movement_flying != 0){
        document.querySelector("#stats-deslocamento-f").style.display = "block";
        document.querySelector("#stats-deslocamento-f span").innerText = monster.movement_flying+" metros";
    }
    if(monster.movement_digging != 0){
        document.querySelector("#stats-deslocamento-d").style.display = "block";
        document.querySelector("#stats-deslocamento-d span").innerText = monster.movement_digging+" metros";
    }
    if(monster.movement_climbing != 0){
        document.querySelector("#stats-deslocamento-c").style.display = "block";
        document.querySelector("#stats-deslocamento-c span").innerText = monster.movement_climbing+" metros";
    }
    if(monster.movement_swimming != 0){
        document.querySelector("#stats-deslocamento-s").style.display = "block";
        document.querySelector("#stats-deslocamento-s span").innerText = monster.movement_swimming+" metros";
    }
    if(monster.dark_vision != 0){
        document.querySelector("#stats-dark-vision").style.display = "block";
        document.querySelector("#stats-dark-vision span").innerText = monster.dark_vision+" metros";
    }
    if(monster.blind_sight != 0){
        document.querySelector("#stats-blind-sight").style.display = "block";
        document.querySelector("#stats-blind-sight span").innerText = monster.blind_sight+" metros";
    }
    if(monster.tremor_sense != 0){
        document.querySelector("#stats-tremor-sense").style.display = "block";
        document.querySelector("#stats-tremor-sense span").innerText = monster.tremor_sense+" metros";
    }
    if(monster.true_vision != 0){
        document.querySelector("#stats-true-vision").style.display = "block";
        document.querySelector("#stats-true-vision span").innerText = monster.true_vision+" metros";
    }
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
        for (let i = 0; i < monster.languages.length; i++) {
            document.querySelector("#stats-languages span").innerText += monster.languages[i];
            if(i+1 < monster.languages.length){
                document.querySelector("#stats-languages span").innerText += ",\u00A0"
            }
        }
    }

    if(monster.telepathy == true){
        document.querySelector("#stats-languages strong").innerText = "Idiomas (Telepatia):\u00A0";
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
                        <p><strong>${monster.abilities[i].name}:&nbsp</strong><span>${monster.abilities[i].description[0]}</span></p>
                    `
            
            if(monster.abilities[i].description.length > 1){
                for (let j = 1; j < action.effect.length; j++) {
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
            elementHTML += `<p><strong>Limite:&nbsp</strong>${action.limit}</p>`
        }
        if(action.recharge != ""){
            elementHTML += `<p><strong>Recarga:&nbsp</strong>${action.recharge}</p>`
        }
        if(action.range != ""){
            elementHTML += `<p><strong>Alcance:&nbsp</strong>${action.range}</p>`
        }
        if(action.roll != ""){
            elementHTML += `<p><strong>Rolagem de Ataque:&nbsp</strong>${action.roll}</p>`
        }
        if(action.damage != ""){
            elementHTML += `<p><strong>Dano:&nbsp</strong>${action.damage}</p>`
        }
        if(action.save_throw != ""){
            elementHTML += `<p><strong>Teste de Salvamento:&nbsp</strong>${action.save_throw}</p>`
        }
        if(action.time != ""){
            elementHTML += `<p><strong>Tempo:&nbsp</strong>${action.time}</p>`
        }
        if(action.effect.length != 0){
            elementHTML +=`
                    <div class="spell-description">
                        <p><strong>Efeito:&nbsp</strong><span>${action.effect[0]}</span></p>
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

        const spell_attribute_modvalue = Math.floor((getAttributeFromPortugueseName(monster.innate_spellcasting)-10)/2);
        
        if(monster.innate_spellcasting_description != ""){
            document.querySelector("#innate-spells-description").innerText = monster.innate_spellcasting_description;
        }
        else{
            const name = monster.name_pronoun.charAt(0).toUpperCase() + monster.name_pronoun.slice(1);
            document.querySelector("#innate-spells-description").innerText = name + " pode conjurar de maneira inata as seguintes magias:";
        }

        if(monster.innate_spellcasting_attribute != ""){
            document.querySelector("#innate-spells-attribute").style.display = "block";
            document.querySelector("#innate-spells-attribute").innerHTML = `<strong>Atributo de Conjuração:&nbsp</strong>${monster.innate_spellcasting_attribute} (+${spell_attribute_modvalue})`;
        }

        for (let i = 0; i < monster.innate_spellcasting.length; i++) {
            const spell = spells[monster.innate_spellcasting[i].spell];
            const spellDC = 6+spell_attribute_modvalue+spell.magic_circle;

            let elementHTML = `
            <div class="action-element">
                <div class="action-name">
                    <h4>${spell.name} (${spell.magic_circle}º Círculo)</h4>
                </div>
                <h4>${monster.innate_spellcasting[i].limit}</h4>

                <div id="innate-spell-info" class="action-info">
            `

            elementHTML += `<p><strong>Tempo de Conjuração:&nbsp</strong>${spell.cast_time}</p>`

            if(spell.attack_roll != false){
                elementHTML += `<p><strong>Rolagem de Ataque:&nbsp</strong>+${spell_attribute_modvalue}</p>`
            }

            for (let i = 0; i < spell.damage.length; i++) {
                elementHTML += `<p><strong>${spell.damage[i][0]}:&nbsp</strong>${spell.damage[i][1]}</p>`
            }

            if(spell.saving_trow != ""){
                elementHTML += `<p><strong>Teste de Salvamento:&nbsp</strong>${spellDC} de ${spell.saving_trow}</p>`
            }
            if(spell.duration != ""){
                elementHTML += `<p><strong>Duração:&nbsp</strong>${spell.duration}`
                if(spell.concentration)
                    elementHTML += ` (Concentração)`;  
                elementHTML += `</p>`;
            }
            if(spell.description.length != 0){
                elementHTML +=`
                        <div class="spell-description">
                            <p><strong>Efeito:&nbsp</strong><span>${spell.description[0]}</span></p>
                        `
                
                if(spell.description.length > 1){
                    for (let j = 1; j < spell.description.length; j++) {
                        elementHTML += `<p>${spell.description[j]}</p>`;
                    }
                }

                elementHTML += `</div>`
            }

            elementHTML +=`</div></div>`

            document.querySelector("#innate-spells .spell-list").innerHTML += elementHTML;
        }
    }


    //###############################################################################################################################################################################


    if(monster.spellcaster_level != 0){
        document.querySelector("#spells").style.display = "block";

        document.querySelector("#spellcaster-level span").innerText = monster.spellcaster_level;
        
        const spell_attribute_modvalue = Math.floor((getAttributeFromPortugueseName(monster.spellcasting_attribute)-10)/2);
        
        document.querySelector("#spellcasting-attribute span").innerText = monster.spellcasting_attribute+" (+"+spell_attribute_modvalue+")";

        if(monster.special_spell_feature != "")
            document.querySelector("#special-spell-feature span").innerText = monster.special_spell_feature;

        for (let i = 0; i < monster.spells.length; i++) {
            const spell = spells[monster.spells[i]];
            const spellID = monster.innate_spellcasting.length+i;
            const spellDC = 6+spell_attribute_modvalue+spell.magic_circle;

            let elementHTML = `
            <div class="action-element">
                <div class="action-name">
                    <h4>${spell.name} (${spell.magic_circle}º Círculo)</h4>
                    <button id="showSpell-${spellID}-button" onclick="showSpell('${spellID}')">-</button>
                </div>
            <div id="spell-${spellID}-info" class="action-info">
            `

            elementHTML += `<p><strong>Custo de Mana:&nbsp</strong>${getSpellCost(spell.magic_circle)}</p>`
            elementHTML += `<p><strong>Tempo de Conjuração:&nbsp</strong>${spell.cast_time}</p>`

            if(spell.attack_roll != false){
                elementHTML += `<p><strong>Rolagem de Ataque:&nbsp</strong>+${spell_attribute_modvalue}</p>`
            }

            for (let i = 0; i < spell.damage.length; i++) {
                elementHTML += `<p><strong>${spell.damage[i][0]}:&nbsp</strong>${spell.damage[i][1]}</p>`
            }

            if(spell.saving_trow != ""){
                elementHTML += `<p><strong>Teste de Salvamento:&nbsp</strong>${spellDC} de ${spell.saving_trow}</p>`
            }
            if(spell.duration != ""){
                elementHTML += `<p><strong>Duração:&nbsp</strong>${spell.duration}`
                if(spell.concentration)
                    elementHTML += ` (Concentração)`;  
                elementHTML += `</p>`;
            }
            if(spell.description.length != 0){
                elementHTML +=`
                        <div class="spell-description">
                            <p><strong>Efeito:&nbsp</strong><span>${spell.description[0]}</span></p>
                        `
                
                if(spell.description.length > 1){
                    for (let j = 1; j < spell.description.length; j++) {
                        elementHTML += `<p>${spell.description[j]}</p>`;
                    }
                }

                elementHTML += `</div>`
            }

            elementHTML +=`</div></div>`

            document.querySelector("#spells .spell-list").innerHTML += elementHTML;
        }
    }


    //###############################################################################################################################################################################


    if(monster.description.length != 0){
        document.querySelector("#description").style.display = "block";

        for (let i = 0; i < monster.description.length; i++) {
            document.querySelector("#description").innerHTML += `<p>${monster.description[i]}</p>`;
        }
    }
}
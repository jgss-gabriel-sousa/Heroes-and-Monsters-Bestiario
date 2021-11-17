let monster;
let spells = {};
let innate_spells = [];
const id = getURLParameter("id").toLowerCase();


accentsTidy = function(s){
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
    const monster_response = await fetch(`https://heroes-and-monsters-api.herokuapp.com/query-${id}`);
    monster = await monster_response.json();
    
    if(monster.spells.length > 0){
        for (let i = 0; i < monster.spells.length; i++) {
            const response = await fetch(`https://heroes-and-monsters-api.herokuapp.com/query-${accentsTidy(monster.spells[i])}`);
            spells[monster.spells[i]] = await response.json()
        }
    }
    if(monster.innate_spellcasting.length > 0){
        for (let i = 0; i < monster.innate_spellcasting.length; i++) {
            const response = await fetch(`https://heroes-and-monsters-api.herokuapp.com/query-${accentsTidy(monster.innate_spellcasting[i].spell)}`);
            spells[monster.innate_spellcasting[i].spell] = await response.json()
        }
    }

    generateHTML();
}

function convertNumberToFraction(value) {
    if(value < 1){
        if(typeof value == "string"){
            if(value == "0.5"){
                return "1/2";
            }
            else if(value == "0.25"){
                return "1/4";
            }
            else if(value == "0.125"){
                return "1/8";
            }
            else if(value == "0"){
                return "0";
            }
        }
        else{
            if(value == 0.5){
                return "1/2";
            }
            else if(value == 0.25){
                return "1/4";
            }
            else if(value == 0.125){
                return "1/8";
            }
            else if(value == 0){
                return "0";
            }
        }
    }
    return value
}

function addDecimalPoints(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function goBack() {
    location.href = "index.html";
}

function getSpellCost(magic_circle){
    switch(magic_circle){
        case 1: return 1;
        case 2: return 3;
        case 3: return 6;
        case 4: return 10;
        case 5: return 15;
        case 6: return 21;
        case 7: return 28;
        case 8: return 36;
        case 9: return 45;
        case 10: return 55;
    }
}

function getAttributeFromPortugueseName(portugueseAttributeName){
    switch(portugueseAttributeName){
        case "Força": return monster.strength;
        case "Vitalidade": return monster.vitality;
        case "Agilidade": return monster.agility;
        case "Carisma": return monster.charisma;
        case "Vontade": return monster.willpower;
        case "Sabedoria": return monster.wisdom;
        case "Inteligência": return monster.intelligence;
    }
}


getMonsterData();
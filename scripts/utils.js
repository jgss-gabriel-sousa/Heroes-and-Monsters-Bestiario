export function showStats_Meters(variable, element_id){
    if(variable != 0){
        document.querySelector(element_id).style.display = "block";
        document.querySelector(element_id+" span").innerText = variable+" metros";
    }
}

export function convertNumberToFraction(value) {
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

export function addDecimalPoints(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function getSpellCost(magic_circle) {
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

export function getAttributeFromPortugueseName(portugueseAttributeName, monster) {
    switch(portugueseAttributeName){
        case "Força":           return monster.strength;
        case "Vitalidade":      return monster.vitality;
        case "Agilidade":       return monster.agility;
        case "Carisma":         return monster.charisma;
        case "Vontade":         return monster.willpower;
        case "Sabedoria":       return monster.wisdom;
        case "Inteligência":    return monster.intelligence;
    }
}
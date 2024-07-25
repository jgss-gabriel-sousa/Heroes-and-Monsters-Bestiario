export function fillData_attributes(monster){
    
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


    const cells = document.querySelector("#attributes").rows[2].cells;

    for (let i = 0; i < cells.length; i++) {
        const e = cells[i];

        const baseHTML = e.innerHTML;
        let html = `<button class="roll-button">${baseHTML}</button>`;
        e.innerHTML = html;
    }

}
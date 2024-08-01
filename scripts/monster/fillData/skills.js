export function fillData_skills(skills){
    if(skills.length > 0){
        document.querySelector("#stats-skills").style.display = "block";
        
        let html = "<strong>Perícias:&nbsp;</strong>";

        for (let i = 0; i < skills.length; i++) {
            html += `<button class="roll-button">${skills[i]}</button>`;

            if(i+1 < skills.length){
                html += ",\u00A0";
            }
        }

        document.querySelector("#stats-skills").innerHTML = html;
    }
}
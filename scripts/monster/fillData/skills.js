export function fillData_skills(skills){

    document.querySelector("#stats-skills").style.display = "block";
    for (let i = 0; i < skills.length; i++) {
        document.querySelector("#stats-skills span").innerText += skills[i];
        if(i+1 < skills.length){
            document.querySelector("#stats-skills span").innerText += ",\u00A0"
        }
    }
}
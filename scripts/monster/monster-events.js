export function hideSideButtons(monster){
    if(monster.abilities.length == 0)
        document.getElementById("abilities-btn").style.display = "none";

    if(monster.innate_spellcasting.length == 0)
        document.getElementById("innate-btn").style.display = "none";

    if(monster.spells.length == 0)
        document.getElementById("spells-btn").style.display = "none";

    if(monster.legendary_actions.length == 0)
        document.getElementById("legendary-btn").style.display = "none";

    if(monster.lair_description == "")
        document.getElementById("lair-btn").style.display = "none";

    if(monster.lair_actions.length == 0)
        document.getElementById("lair-action-btn").style.display = "none";

    if(monster.regional_effects_description.length == 0)
        document.getElementById("regional-btn").style.display = "none";

    if(monster.description.length == 0)
        document.getElementById("description-btn").style.display = "none";


    document.getElementById("side-buttons-section").style.display = "grid";
}
export function fillData_res_and_immunities(typeName, data){
    if(data.length > 0){
        document.querySelector(`#stats-${typeName}`).style.display = "block";
        
        for (let i = 0; i < data.length; i++) {
            document.querySelector(`#stats-${typeName} span`).innerText += data[i];
            if(i+1 < data.length){
                document.querySelector(`#stats-${typeName} span`).innerText += ",\u00A0"
            }
        }
    }
}
let loadFinished = false;
let loadStartTime = new Date();

const loadingCheck = setInterval(loadingChecker,1000);

function loadingChecker(){
    const currentTime = new Date();
    const difference = currentTime - loadStartTime;

    if(SpinnerLoading.style.display == "none") clearInterval(loadingCheck);

    if(difference >= 10000){
        document.querySelector("#slow-loading-advert").style.display = "flex";
    }
}

document.querySelector("#close-btn").addEventListener("click", e => {
    document.querySelector("#slow-loading-advert").style.display = "none";
    clearInterval(loadingCheck);
});
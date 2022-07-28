function _blockGmailAds() {
    console.log("!");
    var ads = document.querySelectorAll("span.ast");
    for (var x = 0; x < ads.length; ++x) {
        if (ads[x].innerHTML == 'Ad') {
            var parentDiv = ads[x].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            parentDiv.style.height = "0px";
            parentDiv.style.visibility = "hidden";
        }
    }
}

window.addEventListener("load", function () {
	console.log("2");
    var elementsToObserve = document.querySelectorAll("div.ae4");
    var observer = new MutationObserver(_blockGmailAds);
    for (var x = 0; x < elementsToObserve.length; ++x) {
        console.log("3");
        observer.observe(elementsToObserve[x], {
            characterData: false,
            childList: true,
            attributes: true
        });
    }
    _blockGmailAds();
});

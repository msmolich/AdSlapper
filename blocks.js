function _blockGmailAds() {
    var ads = document.querySelectorAll("span.ast");
    for (var x = 0; x < ads.length; ++x) {
        if (ads[x].innerHTML == 'Ad') {
            var parentDiv = _getParent(ads[x], 8);
            _hideElement(parentDiv, false);
        }
    }
}

function _blockRedditAds() {    
	var ads = document.getElementsByClassName("promotedlink");
    console.log(ads.length);
    for (var x = 0; x < ads.length; ++x) {
		if (ads[x].id == 'acceptabletest')
			continue;
        var parentDiv = _getParent(ads[x], 3);
        _hideElement(parentDiv, true);
    }
}

function _hideElement(element, remove) {
    if (!remove) {
        element.style.height = "0px";
        element.style.visibility = "hidden";
    } else {
        if (element.parentElement != null) {//reddit has a fake ad test div if parent is null then we prob don't care about the element
			
			var newDiv = document.createElement("div");
			element.parentElement.insertBefore(newDiv, element);//no idea why this makes it work, but without this sometimes the first ad on the page sneaks through
			element.style = "background-color:white";
            
			element.parentElement.removeChild(element);
        }
    }

}

function _getParent(element, depth) {
    if (element.parentElement == null || depth == 0)
        return element;

    return _getParent(element.parentElement, depth - 1);
}

var _currentHref = window.location.href;

if (_currentHref.includes("mail.google.com")) {
    window.addEventListener("load", function () {
        var elementsToObserve = document.querySelectorAll("div.ae4");
        var observer = new MutationObserver(_blockGmailAds);
        for (var x = 0; x < elementsToObserve.length; ++x) {
            observer.observe(elementsToObserve[x], {
                characterData: false,
                childList: true,
                attributes: true
            });
        }
        _blockGmailAds();
    });
    _blockGmailAds();
} else if (_currentHref.includes("reddit.com")) {
    window.addEventListener("load", function () {
		var elementToObserve = document.getElementsByTagName("body")[0];
        var observer = new MutationObserver(_blockRedditAds);
        observer.observe(elementToObserve, {
            characterData: false,
            childList: true,
            attributes: true
        });
        _blockRedditAds();
    });
    _blockRedditAds();
}

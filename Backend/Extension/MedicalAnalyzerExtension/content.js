function getSearchQuery() {
    let query = "";

    if (window.location.hostname.includes("google.com")) {
        let input = document.querySelector("input[name='q']");
        query = input ? input.value : "";
    } 
    else if (window.location.hostname.includes("amazon.com")) {
        let input = document.getElementById("twotabsearchtextbox");
        query = input ? input.value : "";
    } 
    else if (window.location.hostname.includes("flipkart.com")) {
        let input = document.querySelector("input[type='text']");
        query = input ? input.value : "";
    }

    if (query) {
        chrome.runtime.sendMessage({ type: "search_query", query: query });
    }
}

// Run search detection every 2 seconds
setInterval(getSearchQuery, 2000);

chrome.browserAction.onClicked.addListener(function (tab) {
    
    //Fix numbers
    for (var i = 0; i < tabStorage.length; i++) {
        tabStorage[i] = tabStorage[i].toString().replace("+370", "8");        
    }

    //remove duplicates
    /*
    var arr = [9, 9, 111, 2, 3, 4, 4, 5, 7];
var sorted_arr = arr.sort(); // You can define the comparing function here. 
                             // JS by default uses a crappy string compare.
var results = [];
for (var i = 0; i < arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
    }
}

alert(results);
    */
    var sorted_arr = tabStorage.sort();
    var results = [];
    for (var i = 0; i < tabStorage.length - 1; i++) {
        if (sorted_arr[i + 1] != sorted_arr[i]) {
            results.push(sorted_arr[i]);            
        }
        if (i + 1 == tabStorage.length - 1) {            
            results.push(sorted_arr[i + 1]);
        }
    }


    //get results
    var consoleString = "";
    for (var i = 0; i < results.length; i++) {
        if (consoleString)
            consoleString += "<br>";
        consoleString += results[i];
    }

    //if (tabStorage.length > 0)
    var htmlCode = "<html><body>" + consoleString + "</body></html>";
    var url = "data:text/html," + encodeURIComponent(htmlCode);
    chrome.tabs.create({ url: url });

    tabStorage = [];
    chrome.browserAction.setBadgeText({ text: "" });
});

var tabStorage = [];
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if (request.cmd == "save") {  
        tabStorage.push(request.data);
        chrome.browserAction.setBadgeText({ text: tabStorage.length.toString() });
    }

    if (request.cmd == "load") {
        sendResponse(tabStorage);
    }
});
var x = document.getElementsByClassName("title-list");
var i;
for (i = 0; i < x.length; i++) {    
    var im = document.createElement("img");
    im.src = "http://icons.iconarchive.com/icons/led24.de/led/16/clipboard-text-icon.png";

    //var t = document.createElement("a");
    im.setAttribute("href", x[i].childNodes[0].getAttribute("href"));
    //t.appendChild(im);
    im.onclick = function(){
        var xmlHttp = null;
        var numeris = "";
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", this.getAttribute("href"), false);
        
        xmlHttp.send(null);
        var test = document.createElement("div");
        test.innerHTML = xmlHttp.responseText;
        
        var tr = test.getElementsByClassName("col-panel")[0].getElementsByTagName("tr");
        ///////////////////////////////////////
        //reikia atlikti paieska
        var table = test.getElementsByClassName("col-panel")[0];
        var ta = table.getElementsByTagName("th");
        ind = 0;
        for (var j = 0; j < ta.length; j++) {            
            if (ta[j].innerText.match("Telefonas pasiteirauti")) {
                ind = j;
                break;
            }

        }
        /////////////////////////////////////

        var phoneScript = tr[ind].getElementsByTagName("td")[0].getElementsByTagName("strong")[0].childNodes[0].text;

        function addNumber(a){
            numeris += a;
        }
  
        phoneScript = phoneScript.toString().replace(/document.write/gi, "addNumber");
        
        eval(phoneScript);
        
        //save to storage
        //save
        chrome.extension.sendRequest({ cmd: "save", data: numeris });
        
        //load
        chrome.extension.sendRequest({cmd: "load"}, function(response) {
            console.log(response);
        });

        
    }
    x[i].appendChild(im);
}
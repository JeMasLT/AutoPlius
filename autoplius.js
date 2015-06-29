var x = document.getElementsByClassName("title-list");
var i;
localStorage["numeris"] = "";
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
            
        
        //console.log(ind);
        var phoneScript = tr[ind].getElementsByTagName("td")[0].getElementsByTagName("strong")[0].childNodes[0].text;

        function addNumber(a){
            numeris += a;
        }
        //console.log(phoneScript);
        phoneScript = phoneScript.toString().replace(/document.write/gi, "addNumber");
        //console.log(phoneScript);
        eval(phoneScript);
        //console.log(numeris);
        if (localStorage["numeris"])
            localStorage["numeris"] += "\n";
        localStorage["numeris"] +=  numeris;
        console.log(localStorage["numeris"]);
    }
    x[i].appendChild(im);
}
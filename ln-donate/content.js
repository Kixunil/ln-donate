console.log("LNURL donate loaded");

function httpGetAsync(theUrl, callback) {
    console.log("Getting " + theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(".lndonate retreived");
            callback(xmlHttp.responseText);
	}
        if (xmlHttp.status == 404) {
            console.log(".lndonate not present, ignoring");
	}
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send();
}


let path = window.location.pathname.split("/")
httpGetAsync("https://raw.githubusercontent.com/" + path[1] + "/" + path[2] + "/master/.lndonate",
    function(response) {
        var ul = document.getElementsByClassName("pagehead-actions")[0];
        var li = document.createElement("li");

        var lines = response.split("\n")

        var link = ""
        for (let i = 0; i < lines.length; i++) {
            var item = lines[i];
            if (item.startsWith("lnurlp=")) {
                link = item.substr(7);
                break;
            }
        }

        if (link != "") {
            link = link.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
            li.innerHTML = '<a href="' + link + '"><summary class="btn btn-sm">⚡ Donate sats</summary></a>';
            ul.prepend(li);
        } else {
            console.log("lnurlp not found");
        }
    }
)

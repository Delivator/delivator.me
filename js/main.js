var consoleElement = document.getElementById("console"),
    consoleInput = document.getElementById("consoleInput"),
    textToAdd = "";
var messages = {
  "welcome": "IF9fX19fICAgICAgIF8gXyAgICAgICAgICAgIF8gCnwgIF9fIFwgICAgIHwgKF8pICAgICAgICAgIHwgfAp8IHwgIHwgfCBfX198IHxfX18gICBfX19fIF98IHxfIF9fXyAgXyBfXyBfIF9fIF9fXyAgIF9fXyAKfCB8ICB8IHwvIF8gXCB8IFwgXCAvIC8gX2AgfCBfXy8gXyBcfCAnX198ICdfIGAgXyBcIC8gXyBcCnwgfF9ffCB8ICBfXy8gfCB8XCBWIC8gKF98IHwgfHwgKF8pIHwgfF8gfCB8IHwgfCB8IHwgIF9fLwp8X19fX18vIFxfX198X3xffCBcXy8gXF9fLF98XF9fXF9fXy98XyhfKXxffCB8X3wgfF98XF9fX3wKCgo="
};

var encodedMessage = atob(messages.welcome);

function addText(text) {
  textToAdd += text;
}

function updateConsole() {
  if (textToAdd.length === 0) {
    return;
  } else {
    consoleElement.innerHTML += textToAdd[0];
    textToAdd = textToAdd.substr(1);
  }
}

function getIp(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonObject = JSON.parse(this.responseText);
      callback(jsonObject);
    }
  };
  xhttp.open("GET", "https://freegeoip.net/json/", true);
  xhttp.send();
}

setInterval(updateConsole, 5);

document.onclick = function (e) {
  consoleInput.focus();
}

document.addEventListener("DOMContentLoaded", function() {
  var finalTime = new Date().getTime();
  var timeTook = finalTime - startTime;

  consoleInput.focus();

  addText(encodedMessage);
  addText("[HTML] loading style.css... 100%\n"+
          "[HTML] loading main.js... 100%\n"+
          "[HTML] this site took " + timeTook / 1000  + " seconds to load\n\n"+
          "Type login <username>\n");

  // getIp(function (ip) {
  //   addText("New user connected from " + ip.city + ", " + ip.region_code + ", " + ip.country_code + ". IP: " + ip.ip + "\n");
  // });
});

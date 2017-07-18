var consoleElement = document.getElementById("console"),
    consoleInput = document.getElementById("consoleInput"),
    linestart = document.getElementById("linestart"),
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

function executeCommand(command) {
  var cmd = command.split(" ")[0],
      args = command.split(" ").slice(1);

  if (linestart.innerHTML.startsWith("anonymous") && cmd != "login" && command != "") {
    addText("You have to login first.\n");
    addText("Use login <username> to login.\n");
    return;
  }

  switch (cmd) {
    case "login":
      if (!linestart.innerHTML.startsWith("anonymous")) {
        addText("Already logged in.\n");
        return;
      }
      if (args[0] == null) {
        addText("Usage: login <username>\n");
      } else {
        var username = args[0].slice(0, 32);
        addText("Successfully logged in as '" + username + "'.\n");
        getIp(function(ip) {
          addText("New user connected from " + ip.city + ", " + ip.region_code + ", " + ip.country_code + ". IP: " + ip.ip + "\n");
        });
        linestart.innerHTML = username + "@delivator.me:~$&nbsp";
      }
      break;
    case "clear":
      consoleElement.innerHTML = "";
      break;
    case "reload":
      location.reload();
      break;
    case "echo":
      var text = command.substring(5);
      addText(text + "\n");
      break;
    case "goto":
      if (args[0] == null) {
        addText("Usage: goto <full url with http/https>\n");
      } else {
        addText('Redirecting to "' + args[0] + '"\n');
        window.location = args[0];
      }
      break;
    case "background":
      if (args[0] == null) {
        addText("Usage: background <image-url>\n");
      } else {
        addText('Background image changed to "' + args[0] + '"\n');
        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundImage = "url(" + args[0] + ")";
      }
      break;
    default:
  }
}

setInterval(updateConsole, 5);

document.onclick = function (e) {
  consoleInput.focus();
}

document.onkeypress = function(e) {
  switch (e.keyCode) {
    case 13:
      var command = consoleInput.value;
      consoleElement.innerHTML += linestart.innerHTML + consoleInput.value + "\n";
      executeCommand(command);
      consoleInput.value = "";
      break;
    default:

  }
}

document.addEventListener("DOMContentLoaded", function() {
  var finalTime = new Date().getTime();
  var timeTook = finalTime - startTime;

  consoleInput.focus();

  addText(encodedMessage);
  addText("[HTML] loading style.css... 100%\n"+
          "[HTML] loading main.js... 100%\n"+
          "[HTML] this site took " + timeTook / 1000  + " seconds to load\n\n"+
          "Type login <username> to login\n");

});

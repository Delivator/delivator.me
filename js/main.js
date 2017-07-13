var consoleElement = document.getElementById("console");
var messages = {
  "welcome": "IF9fX19fICAgICAgIF8gXyAgICAgICAgICAgIF8gCnwgIF9fIFwgICAgIHwgKF8pICAgICAgICAgIHwgfAp8IHwgIHwgfCBfX198IHxfX18gICBfX19fIF98IHxfIF9fXyAgXyBfXyBfIF9fIF9fXyAgIF9fXyAKfCB8ICB8IHwvIF8gXCB8IFwgXCAvIC8gX2AgfCBfXy8gXyBcfCAnX198ICdfIGAgXyBcIC8gXyBcCnwgfF9ffCB8ICBfXy8gfCB8XCBWIC8gKF98IHwgfHwgKF8pIHwgfF8gfCB8IHwgfCB8IHwgIF9fLwp8X19fX18vIFxfX198X3xffCBcXy8gXF9fLF98XF9fXF9fXy98XyhfKXxffCB8X3wgfF98XF9fX3wK"
};

(function myLoop (i) {
  setTimeout(function () {
    consoleElement.innerHTML += atob(messages.welcome)[i];
    if (++i < atob(messages.welcome).length) myLoop(i);
  }, 1)
})(0);

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

setTimeout(function() {
  getIp(function (ip) {
    consoleElement.innerHTML += "New user connected from " + ip.city + ", " + ip.region_code + ", " + ip.country_code + ". IP: " + ip.ip + "<br />";
  });
}, 2000);

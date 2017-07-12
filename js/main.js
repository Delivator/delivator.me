var console = document.getElementById("console"),
    userInfo = document.getElementById("userInfo");

function getIp(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var jsonObject = JSON.parse(this.responseText);
        callback(jsonObject);
        //  return jsonObject;
      }
  };
  xhttp.open("GET", "https://freegeoip.net/json/", true);
  xhttp.send();
}

getIp(function (ip) {
  console.innerHTML += "New user connected from " + ip.city + ", " + ip.region_code + ", " + ip.country_code + ". IP: " + ip.ip + "<br />";
});

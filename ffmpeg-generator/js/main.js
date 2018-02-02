// $(document).read();

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
  let name = cname + "=",
      decodedCookie = decodeURIComponent(document.cookie),
      ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  let url = window.URL || window.webkitURL,
      videoPlayer = document.querySelector("#videoPlayer"),
      progressBar = document.querySelector("#progressBar"),
      pauseButton = document.querySelector("#playPause"),
      durationMultiplier;

  if (getCookie("volume") === "") {
    videoPlayer.volume = 0.5;
  } else {
    videoPlayer.volume = getCookie("volume");
  }
  
  videoPlayer.onvolumechange = () => {
    setCookie("volume", videoPlayer.volume, 356)
  };

  videoPlayer.oncanplay = () => {
    videoPlayer.paused ? pauseButton.value = ">" : pauseButton.value = "=";
  };

  videoPlayer.ondurationchange = () => {
    let duration = videoPlayer.duration;
    if (duration > 2000) {
      durationMultiplier = 1;
    } else if (duration > 1000) {
      durationMultiplier = 2;
    } else {
      durationMultiplier = 4;
    }
    progressBar.max = Math.floor(duration * durationMultiplier);
  };

  videoPlayer.ontimeupdate = () => {
    progressBar.value = Math.floor(videoPlayer.currentTime * durationMultiplier);
  };

  progressBar.addEventListener("change", (event) => {
    videoPlayer.currentTime = progressBar.value / durationMultiplier;
  });

  pauseButton.addEventListener("click", (event) => {
    if (videoPlayer.readyState < 4) return;
    if (videoPlayer.paused) {
      videoPlayer.play();
      pauseButton.value = "=";
    } else {
      videoPlayer.pause();
      pauseButton.value = ">";
    }
  });

  function playSelectedFile(event) {
    let file = this.files[0],
        type = file.type,
        canPlay = videoPlayer.canPlayType(type);
    if (canPlay === "") canPlay = "no";
    if (canPlay === "no") {
      return;
    }
    let fileUrl = URL.createObjectURL(file);
    videoPlayer.src = fileUrl;
  }
  
  let inputNode = document.querySelector("#fileInput");
  inputNode.addEventListener("change", playSelectedFile, false);
});


// $(document).read();

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function convertTime(time) {
  time = Math.floor(time);
  let h = Math.floor(time / 60 / 60);
  let m = Math.floor((time - h * 60 * 60) / 60);
  let s = time - (h * 60 * 60) - (m * 60);
  if (s < 10) s = "0" + s;
  if (h > 0) {
    return(`${h}:${m}:${s}`);
  } else {
    return(`${m}:${s}`);
  }
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
      playerTime = document.querySelector("#playerTime"),
      muteButton = document.querySelector("#mute"),
      volumeSlider = document.querySelector("#volume"),
      durationMultiplier,
      autoResume = false;

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

  if (getCookie("volume") === "") {
    videoPlayer.volume = 0.5;
    volumeSlider.value = 50;
  } else {
    videoPlayer.volume = getCookie("volume");
    volumeSlider.value = Math.floor(getCookie("volume") * 100);
  }
  
  videoPlayer.onvolumechange = () => {
    if (videoPlayer.muted || videoPlayer.volume === 0) {
      muteButton.className = "muted";
    } else {
      muteButton.className = "volume";
    }
    setCookie("volume", videoPlayer.volume, 356);
  };

  videoPlayer.oncanplay = () => {
    videoPlayer.paused ? pauseButton.className = "play" : pauseButton.className = "pause";
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
    playerTime.innerHTML = `0:00/${convertTime(duration)}`;
  };

  videoPlayer.ontimeupdate = () => {
    progressBar.value = Math.floor(videoPlayer.currentTime * durationMultiplier);
    playerTime.innerHTML = `${convertTime(videoPlayer.currentTime)}/${convertTime(videoPlayer.duration)}`;
  };

  progressBar.addEventListener("input", event => {
    videoPlayer.currentTime = progressBar.value / durationMultiplier;
  });

  progressBar.addEventListener("mousedown", event => {
    if (!videoPlayer.paused) autoResume = true;
    videoPlayer.pause();
    videoPlayer.paused ? pauseButton.className = "play" : pauseButton.className = "pause";
  });

  progressBar.addEventListener("mouseup", event => {
    if (autoResume) {
      autoResume = false;
      videoPlayer.play();
    }
    videoPlayer.paused ? pauseButton.className = "play" : pauseButton.className = "pause";
  });

  pauseButton.addEventListener("click", event => {
    if (videoPlayer.readyState < 4) return;
    if (videoPlayer.paused) {
      videoPlayer.play();
      videoPlayer.paused ? pauseButton.className = "play" : pauseButton.className = "pause";
    } else {
      videoPlayer.pause();
      videoPlayer.paused ? pauseButton.className = "play" : pauseButton.className = "pause";
    }
  });

  muteButton.addEventListener("click", event => {
    videoPlayer.muted = !videoPlayer.muted;
  });

  volumeSlider.addEventListener("input", event => {
    videoPlayer.volume = volumeSlider.value / 100;
  });
  
  let inputNode = document.querySelector("#fileInput");
  inputNode.addEventListener("change", playSelectedFile, false);
});


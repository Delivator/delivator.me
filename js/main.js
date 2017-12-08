var lineDrawing = anime({
  targets: '#lineDrawing .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 150 },
  direction: 'alternate',
  loop: false,
  autoplay: false
});

function getScrollPerc() {
  let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  let scrollPercentage = scrollTop / document.body.scrollHeight;
  return scrollPercentage;
}

function getScrollPercent() {
  var h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
}

document.addEventListener("scroll", function() {
  console.log(getScrollPercent());
  lineDrawing.seek(lineDrawing.duration * getScrollPercent())
});


console.log("Webside loaded successfully!");
var lineDrawing = anime({
  targets: '#lineDrawing .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 150 },
  direction: 'alternate',
  loop: false
});

document.addEventListener("scroll", function() {
  console.log(getScrollPercent());
  lineDrawing.seek(lineDrawing.duration * getScrollPercent())
});


console.log("Webside loaded successfully!");
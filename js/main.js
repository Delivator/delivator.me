const portals = [
  "https://siasky.net/",
  "https://vault.lightspeedhosting.com/",
  "https://siacdn.com/",
  "https://skydrain.net/",
  "https://skynet.tutemwesi.com/",
  "https://skynet.luxor.tech/",
  "https://sialoop.net/",
  "https://skynethub.io/"
]
const checkfile = "AAD-_wPkwKyYnw2oc01CoN14o03TPzaAfXWzo6C7i3IHgA"

let bestPortals = []

function loadedBestPortals() {
  document.querySelectorAll("*").forEach(element => {
    if (element.hasAttribute("skylink") && element.attributes["src"].value === "") element.src = bestPortals[0].portal + element.attributes["skylink"].value
  })
}

portals.forEach((portal) => {
  getResponseTime(portal + checkfile + "?nocache=" + Math.random())
    .then(time => {
      bestPortals.push({ portal, time })
      bestPortals.sort((a, b) => a.time - b.time)
      if (bestPortals.length === 1) {
        loadedBestPortals()
      }
      if (bestPortals.length === portals.length) {
        loadedBestPortals()
      }
      console.log(bestPortals)
    })
  
})

function getResponseTime(url) {
  return new Promise((resolve) => {
    let startTime = new Date().getTime();
    fetch(url, { mode: "no-cors", cache: "no-cache" })
      .then(() => {
        return resolve(new Date().getTime() - startTime)
      })
      .catch(() => resolve(1e100))
  })
}

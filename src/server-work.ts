navigator.serviceWorker.register("./sw.js").then(function(registration) {
  var serviceWorker
  if (registration.installing) {
    serviceWorker = registration.installing
    console.log("installing")
  } else if (registration.waiting) {
    serviceWorker = registration.waiting
    console.log("waiting")
  } else if (registration.active) {
    serviceWorker = registration.active
    console.log("active")
  }
  if (serviceWorker) {
    // logState(serviceWorker.state);
    serviceWorker.addEventListener("statechange", function(e) {
      // logState(e.target.state);
    })
  }
})

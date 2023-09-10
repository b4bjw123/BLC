window.onload = function () {
    console.log("bob");
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
}

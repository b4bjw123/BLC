APP.applicationController = (function () {
    'use strict';
    function start(resources, storeResources) {
        // Inject CSS into the DOM
        $("head").append("<style>" + resources.css + "</style>");
        // Create app elements
        $("body").html('<div id="window"><div id="header"><h1>My News</h1></div><div id="body">Hello World!</div>');
        // Remove our loading splash screen
        $("#loading").remove();
        if (storeResources) {
          localStorage.resources = JSON.stringify(resources);
        }
    }
    return {
        start: start
    };
}());
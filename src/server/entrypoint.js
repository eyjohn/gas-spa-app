// This file is the entry point for Google Apps Script.
// It relies on 'bundle.js' being loaded first to populating 'globalThis.Server'

function doGet(...args) {
    return server.doGet(...args);
}

function getEnvInfo(...args) {
    return server.getEnvInfo(...args);
}

// Self-check: Ensure all AppServer methods are exposed
(function () {
    if (typeof server !== 'undefined') {
        var proto = Object.getPrototypeOf(server);
        Object.getOwnPropertyNames(proto).forEach(function (prop) {
            if (prop !== 'constructor' && typeof server[prop] === 'function') {
                if (typeof globalThis[prop] !== 'function') {
                    var msg = "CRITICAL: Method '" + prop + "' is defined in AppServer but not exposed in entrypoint.js";
                    console.error(msg);
                    throw new Error("Internal Server Error");
                }
            }
        });
    }
})();

var enabled = false;

var callLogger = function (loggable) {
    'use strict';
    if (enabled) {
        console.log();
    }
    return loggable;
};

callLogger.config = function (userSpecifiedConfiguration) {
    'use strict';
    enabled = (undefined !== userSpecifiedConfiguration.enabled) ?  userSpecifiedConfiguration.enabled : enabled;
};

module.exports = callLogger;
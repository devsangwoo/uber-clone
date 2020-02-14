"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var constants_1 = require("../../../constants");
var resolvers = {
    Subscription: {
        DriverSubscription: {
            subscribe: graphql_yoga_1.withFilter(function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator(constants_1.DRIVER_UPDATE);
            }, function (payload, _, _a) {
                var context = _a.context;
                var user = context.currentUser;
                var driver = payload.DriverSubscription;
                if (!driver.isDriving) {
                    return false;
                }
                var driverLastLat = driver.lastLat, driverLastLng = driver.lastLng;
                var userLastLat = user.lastLat, userLastLng = user.lastLng;
                return (driverLastLat >= userLastLat - constants_1.RANGE_0_5 &&
                    driverLastLat <= userLastLat + constants_1.RANGE_0_5 &&
                    driverLastLng >= userLastLng - constants_1.RANGE_0_5 &&
                    driverLastLng <= userLastLng + constants_1.RANGE_0_5);
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=DriverSubscription.resolvers.js.map
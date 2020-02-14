"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var constants_1 = require("../../../constants");
var resolvers = {
    Subscription: {
        RideSubscription: {
            subscribe: graphql_yoga_1.withFilter(function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator(constants_1.RIDE_REQUEST);
            }, function (payload, _, _a) {
                var context = _a.context;
                var driver = context.currentUser;
                var ride = payload.RideSubscription;
                if (!driver.isDriving) {
                    return false;
                }
                var driverLastLat = driver.lastLat, driverLastLng = driver.lastLng;
                var pickUpLat = ride.pickUpLat, pickUpLng = ride.pickUpLng, status = ride.status;
                return (status === constants_1.REQUESTED &&
                    pickUpLat >= driverLastLat - constants_1.RANGE_0_5 &&
                    pickUpLat <= driverLastLat + constants_1.RANGE_0_5 &&
                    pickUpLng >= driverLastLng - constants_1.RANGE_0_5 &&
                    pickUpLng <= driverLastLng + constants_1.RANGE_0_5);
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=RideSubscription.resolvers.js.map
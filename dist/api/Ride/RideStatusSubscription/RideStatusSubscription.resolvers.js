"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var constants_1 = require("../../../constants");
var resolvers = {
    Subscription: {
        RideStatusSubscription: {
            subscribe: graphql_yoga_1.withFilter(function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator(constants_1.UPDATE_RIDE_STATUS);
            }, function (payload, _, _a) {
                var context = _a.context;
                var user = context.currentUser;
                var passengerId = payload.passengerId, driverId = payload.driverId; // why need passenger id?
                console.log(user);
                console.log("payload:", payload);
                return user.id === passengerId || user.id === driverId;
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=RideStatusSubscription.resolvers.js.map
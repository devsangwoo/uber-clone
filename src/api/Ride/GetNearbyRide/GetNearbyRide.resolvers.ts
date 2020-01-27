import { Between } from "typeorm";
import { RANGE_0_5, REQUESTED } from "../../../constants";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetNearbyRidesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

// what's for? what's the diff between RideSubscription
// getNearbyRide -> for searching requested ride
// RideSubscription -> for getting a new requested ride

const resolvers: Resolvers = {
	Query: {
		GetNearbyRides: authResolverProtector(
			async (_, __, { req }): Promise<GetNearbyRidesResponse> => {
				const driver: User = req.user;
				if (driver.isDriving) {
					const { lastLat, lastLng } = driver;
					try {
						const rides = await Ride.find({
							status: REQUESTED,
							pickUpLat: Between(
								lastLat - RANGE_0_5,
								lastLat + RANGE_0_5
							),
							pickUpLng: Between(
								lastLng - RANGE_0_5,
								lastLng + RANGE_0_5
							)
						});
						return {
							res: true,
							error: null,
							rides
						};
					} catch (error) {
						return {
							res: false,
							error: error.message,
							rides: null
						};
					}
				}
				return {
					res: false,
					error: "You are not a driver",
					rides: null
				};
			}
		)
	}
};

export default resolvers;

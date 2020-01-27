import User from "../../../entities/User";
import { GetMyPlacesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Query: {
		GetMyPlaces: authResolverProtector(
			async (_, __, { req }): Promise<GetMyPlacesResponse> => {
				try {
					const user = await User.findOne(
						{ id: req.user.id },
						{ relations: ["places"] } // this is the way get the full places instance
					);
					if (user) {
						console.log(`it's been called`);
						console.log(user.places);
						return {
							res: true,
							error: null,
							places: user.places.sort((a, b) => a.id - b.id)
						};
					}
					return {
						res: false,
						error: "user Not found",
						places: null
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						places: null
					};
				}
			}
		)
	}
};

export default resolvers;

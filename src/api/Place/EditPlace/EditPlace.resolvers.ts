import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { clearNullValue } from "../../../utils/clearNullValue";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		EditPlace: authResolverProtector(
			async (
				_,
				args: EditPlaceMutationArgs,
				{ req }
			): Promise<EditPlaceResponse> => {
				const user: User = req.user;
				try {
					const place = await Place.findOne({ id: args.id });
					if (place) {
						if (place.userId === user.id) {
							const nonNullArgs = clearNullValue(args);
							await Place.update(
								{ id: args.id },
								{ ...nonNullArgs }
							);
							return {
								res: true,
								error: null
							};
						} else {
							return {
								res: false,
								error: "Not authorized"
							};
						}
					} else {
						return {
							res: false,
							error: "Place not found"
						};
					}
				} catch (error) {
					return {
						res: false,
						error: error.message
					};
				}
			}
		)
	}
};

export default resolvers;

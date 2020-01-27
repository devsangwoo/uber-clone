import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
	EmailVerificationResponse,
	ValidateEmailVerificationMutationArgs,
	ValidateEmailVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendVerificationMail } from "../../../utils/email";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		EmailVerification: authResolverProtector(
			async (_, __, { req }): Promise<EmailVerificationResponse> => {
				const user: User = req.user;
				if (user.email) {
					try {
						const existedVerification = await Verification.findOne({
							payload: user.email
						});
						if (existedVerification) {
							existedVerification.remove();
						}
						const newVerification = await Verification.create({
							payload: user.email,
							target: "EMAIL"
						}).save();
						await sendVerificationMail(
							newVerification.payload,
							newVerification.key
						);
						return {
							res: true,
							error: null
						};
					} catch (error) {
						return {
							res: false,
							error: error.message
						};
					}
				}
				return {
					res: false,
					error: "user should have email address for verification"
				};
			}
		),
		ValidateEmailVerification: authResolverProtector(
			async (
				_,
				args: ValidateEmailVerificationMutationArgs,
				{ req }
			): Promise<ValidateEmailVerificationResponse> => {
				const { key } = args;
				const user: User = req.user;
				if (user.email && !user.verifiedEmail) {
					try {
						const requestedVerification = await Verification.findOne(
							{
								payload: user.email,
								key // key is the same one which is requested
							}
						);
						if (requestedVerification) {
							requestedVerification.verified = true;
							requestedVerification.save();
							user.verifiedEmail = true;
							user.save();
							return {
								res: true,
								error: null
							};
						} else {
							return {
								res: false,
								error: "verficiation is not valid"
							};
						}
					} catch (error) {
						return {
							res: false,
							error: error.message
						};
					}
				}
				return {
					res: false,
					error: "user don't have a mail for verification"
				};
				// try {
				// 	const user = await User.findOne({ email });
				// 	if (user) {
				// 		(user.verifiedEmail = true), user.save();
				// 		const token = createJWT(user.id);
				// 		return {
				// 			res: true,
				// 			error: null,
				// 			token
				// 		};
				// 	} else {
				// 		// email has been verified, but no user found connected
				// 		return {
				// 			res: true,
				// 			error: null,
				// 			token: null
				// 		};
				// 	}
				// } catch (error) {
				// 	return {
				// 		res: false,
				// 		error: error.message,
				// 		token: null
				// 	};
				// }
			}
		)
	}
};

export default resolvers;

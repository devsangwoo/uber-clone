import User from "../../../entities/User";
import {
	EmailSignInMutationArgs,
	EmailSignInResponse,
	EmailSignUpMutationArgs,
	EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { createJWT } from "../../../utils/JWT";

const resolvers: Resolvers = {
	Mutation: {
		EmailSignIn: async (
			_,
			args: EmailSignInMutationArgs
		): Promise<EmailSignInResponse> => {
			const { email, password } = args;
			try {
				const user = await User.findOne({ email });
				if (!user) {
					return {
						res: false,
						error: `no user found with email : ${email}`,
						token: null
					};
				}
				const checkPassword = await user.comparePassword(password);
				if (checkPassword === true) {
					const token = createJWT(user.id);
					return {
						res: true,
						error: null,
						token
					};
				}
				return {
					res: false,
					error: `invalid password`,
					token: null
				};
			} catch (error) {
				return {
					res: false,
					error: error.message,
					token: null
				};
			}
		},
		EmailSignUp: async (
			_,
			args: EmailSignUpMutationArgs
		): Promise<EmailSignUpResponse> => {
			const { email } = args;
			try {
				const existedUser = await User.findOne({ email });
				if (existedUser) {
					return {
						res: false,
						error: "You should log in instead",
						token: null
					};
				} else {
					const newUser = await User.create({
						...args,
						verifiedPhoneNumber: true
					}).save();
					const token = createJWT(newUser.id);
					return {
						res: true,
						error: null,
						token
					};
				}
			} catch (error) {
				return {
					res: false,
					error: error.message,
					token: null
				};
			}
		}
	}
};

export default resolvers;

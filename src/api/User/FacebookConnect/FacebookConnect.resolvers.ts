import {
	FacebookConnectMutationArgs,
	FacebookConnectResponse
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import { createJWT } from "../../../utils/JWT";

const resolvers: Resolvers = {
	Mutation: {
		FacebookConnect: async (
			_,
			args: FacebookConnectMutationArgs
		): Promise<FacebookConnectResponse> => {
			const { fbId } = args;
			try {
				const existedUser = await User.findOne({ fbId });
				if (existedUser) {
					const token = createJWT(existedUser.id);
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

			try {
				const newUser = await User.create({
					...args,
					profilePhoto: `http://graph.facebook.com/${fbId}/pictures?type=square`
				}).save();
				const token = createJWT(newUser.id);
				return {
					res: true,
					error: null,
					token
				};
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

// mutation{
// 	facebookConnect(firstName:"hyunwoo", lastName:"Nam", fbId:"100003174179004", email:"jnam9203@naver.com"){
// 	  ok
// 	  token
// 	  error
// 	}
//   }
export default resolvers;

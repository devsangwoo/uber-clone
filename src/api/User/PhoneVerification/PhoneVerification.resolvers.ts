import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
	PhoneVerificationMutationArgs,
	PhoneVerificationResponse,
	ValidatePhoneVerificationMutationArgs,
	ValidatePhoneVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { createJWT } from "../../../utils/JWT";
import { sendVerificationSMS } from "../../../utils/sms";

const resolvers: Resolvers = {
	Mutation: {
		PhoneVerification: async (
			_,
			args: PhoneVerificationMutationArgs
		): Promise<PhoneVerificationResponse> => {
			const { phoneNumber } = args;
			try {
				const existedVerification = await Verification.findOne({
					payload: phoneNumber
				});
				if (existedVerification) {
					existedVerification.remove();
				}
				const newVerifiaction = await Verification.create({
					payload: phoneNumber,
					target: "PHONE"
				}).save();
				await sendVerificationSMS(
					newVerifiaction.payload,
					newVerifiaction.key
				);
				console.log(
					`[${phoneNumber}]verficiation key is ${newVerifiaction.key}`
				);
				return {
					res: true,
					error: null
				};
				// send a message
			} catch (error) {
				return {
					res: false,
					error: error.message
				};
			}
		},
		ValidatePhoneVerification: async (
			_,
			args: ValidatePhoneVerificationMutationArgs
		): Promise<ValidatePhoneVerificationResponse> => {
			const { phoneNumber, key } = args;
			try {
				const verification = await Verification.findOne({
					payload: phoneNumber,
					key
				});
				if (!verification) {
					return {
						res: false,
						error: "verification key is not valid",
						token: null
					};
				} else {
					verification.verified = true;
					verification.save();
				}
			} catch (error) {
				return {
					res: false,
					error: error.message,
					token: null
				};
			}

			try {
				const user = await User.findOne({ phoneNumber });
				if (user) {
					user.verifiedPhoneNumber = true;
					user.save();
					const token = createJWT(user.id);
					return {
						res: true,
						error: null,
						token
					};
				} else {
					// phone number has been verified, but no connected user is found
					return {
						res: true,
						error: null,
						token: null
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

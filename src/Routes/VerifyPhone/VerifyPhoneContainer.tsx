import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { RouteComponentProps } from "react-router-dom";
import { useInput } from "../../hooks";
import { useMutation } from "@apollo/react-hooks";
import { VALIDATE_PHONE_VERIFICATION } from "./VerifyPhoneQueries";
import {
	ValidatePhoneVerification,
	ValidatePhoneVerificationVariables
} from "../../types/api";
import { toast } from "react-toastify";
import { USER_LOG_IN } from "../../SharedQueries";

interface IProps extends RouteComponentProps {}

const VerifyPhoneContainer: React.FC<IProps> = ({ history, location }) => {
	const {
		state: { phoneNumber }
	} = location;
	if (!phoneNumber) {
		history.push("/phone-login");
	}

	const [code, setCode] = useInput("");

	const [userLogInMutation] = useMutation(USER_LOG_IN);
	const [validateMutation, { loading }] = useMutation<
		ValidatePhoneVerification,
		ValidatePhoneVerificationVariables
	>(VALIDATE_PHONE_VERIFICATION, {
		variables: {
			phoneNumber,
			key: code
		},
		onCompleted: ({ ValidatePhoneVerification: { res, error, token } }) => {
			if (res) {
				toast.success("verfied");
				console.log(token);
				// if (token) {
				userLogInMutation({ variables: { token } });
				// }
				// if (token) {
				// 	localStorage.setItem("X-JWT", token);
				// 	// cache.writeData({
				// 	// 	data: {
				// 	// 		auth: {
				// 	// 			__typename: "Auth",
				// 	// 			isLoggedIn: true
				// 	// 		}
				// 	// 	}
				// 	// });
				// }
			} else {
				toast.error(error);
			}
		}
	});

	// const submitFn: React.FormEventHandler = event => {
	// 	event.preventDefault();
	// 	validateMutation({
	// 		variables: {
	// 			phoneNumber,
	// 			key: code
	// 		}
	// 	});
	// };

	return (
		<VerifyPhonePresenter
			value={code}
			onChange={setCode}
			submitFn={validateMutation}
			loading={loading}
		/>
	);
};

export default VerifyPhoneContainer;

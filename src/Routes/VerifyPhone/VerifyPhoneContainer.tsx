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
import { MutationUpdaterFn } from "apollo-boost";
import { toast } from "react-toastify";

interface IProps extends RouteComponentProps {}

const VerifyPhoneContainer: React.FC<IProps> = ({ history, location }) => {
	if (!location.state.phoneNumber) {
		history.push("/phone-login");
	}

	const [code, setCode] = useInput("");

	const [validateMutation, { loading }] = useMutation<
		ValidatePhoneVerification,
		ValidatePhoneVerificationVariables
	>(VALIDATE_PHONE_VERIFICATION);

	const onSubmitUpdate: MutationUpdaterFn = (cache, result: any) => {
		const data: ValidatePhoneVerification = result.data;
		const { res, error, token } = data.ValidatePhoneVerification;

		if (res) {
			toast.success("verfied");
			if (token) {
				localStorage.setItem("X-JWT", token);
				cache.writeData({
					data: {
						auth: {
							__typename: "Auth",
							isLoggedIn: true
						}
					}
				});
			}
		} else {
			toast.error(error);
		}
	};

	const onSubmit: React.FormEventHandler = event => {
		event.preventDefault();
		validateMutation({
			variables: {
				phoneNumber: location.state.phoneNumber,
				key: code
			},
			update: onSubmitUpdate
		});
	};

	return (
		<VerifyPhonePresenter
			value={code}
			onChange={setCode}
			onSubmit={onSubmit}
		/>
	);
};

export default VerifyPhoneContainer;

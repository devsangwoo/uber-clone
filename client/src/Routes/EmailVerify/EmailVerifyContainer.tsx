import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { REQUEST_EMAIL_VERIFICATION } from "../../SharedQueries";
import {
	ValidateEmailVerification,
	ValidateEmailVerificationVariables
} from "../../types/api";
import routes from "../routes";
import EmailVerifyPresenter from "./EmailVerifyPresenter";
import { VALIDATE_EAMIL_VERIFICATION } from "./EmailVerifyQueries";

interface IRouteParams {
	key?: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {}

const EmailVerifyContainer: React.FC<IProps> = ({ match, history }) => {
	const {
		params: { key: keyParams }
	} = match;

	const [key, setKey] = useState<string>(keyParams || "");
	const [inProgress, setInProress] = useState(false);

	const [verifyEmailMutation] = useMutation<
		ValidateEmailVerification,
		ValidateEmailVerificationVariables
	>(VALIDATE_EAMIL_VERIFICATION, {
		onCompleted: ({ ValidateEmailVerification }) => {
			const { res, error } = ValidateEmailVerification;
			if (res) {
				toast.success("Your email has been verified", {
					autoClose: 1000
				});
				setTimeout(() => {
					history.push(routes.NUBER);
				}, 1000);
			} else {
				toast.error(error);
			}
		},
		variables: {
			key
		}
	});

	const [requestEmailMutation] = useMutation(REQUEST_EMAIL_VERIFICATION, {
		onCompleted: () => {
			toast.done("sent a new verification code, check your email");
		}
	});

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value }
		} = event;
		setKey(value);
	};

	const sumbitFn = async () => {
		setInProress(true);
		await verifyEmailMutation();
	};

	return (
		<EmailVerifyPresenter
			InputKey={key}
			onChangeHandler={onChangeHandler}
			sumbitFn={sumbitFn}
			inProgress={inProgress}
			requestEmailMutation={requestEmailMutation}
		/>
	);
};

export default EmailVerifyContainer;

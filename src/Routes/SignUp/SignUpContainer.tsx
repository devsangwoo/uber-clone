import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { useInput } from "../../hooks";
import { USER_LOG_IN } from "../../SharedQueries.local";
import { EmailSignUp, EmailSignUpVariables } from "../../types/api";
import SignUpPresenter from "./SignUpPresenter";
import { EMAIL_SIGN_UP } from "./SignUpQueries";

interface IProps extends RouteComponentProps {}

const SignUpContainer: React.FC<IProps> = ({ history, location }) => {
	if (!location.state && !location.state.phoneNumber) {
		history.push("/");
	}

	const [firstName, setFirstName] = useInput("");
	const [lastName, setLastName] = useInput("");
	const [email, setEmail] = useInput("");
	const [password, setPassword] = useInput("");
	const [passwordConfirm, setPasswordConfirm] = useInput("");
	const {
		state: { phoneNumber }
	} = location;

	const [userLogInMutation] = useMutation(USER_LOG_IN);
	const [signUpMutation, { loading }] = useMutation<
		EmailSignUp,
		EmailSignUpVariables
	>(EMAIL_SIGN_UP, {
		onCompleted: ({ EmailSignUp: EmailSignUpResult }) => {
			const { res, error, token } = EmailSignUpResult;
			if (res) {
				if (token) {
					toast.success(`Welcome ${firstName}`);
					userLogInMutation({ variables: { token } });
				} else {
					toast.error("something went wrong!");
				}
			}
		},
		variables: {
			email,
			firstName,
			lastName,
			password,
			phoneNumber
		}
	});

	const submitFn = () => {
		if (password !== passwordConfirm) {
			toast.error("You typed different password, please check again");
			return;
		}
		signUpMutation();
	};

	return (
		<SignUpPresenter
			submitFn={submitFn}
			loading={loading}
			firstName={{
				label: "First Name",
				onChange: setFirstName,
				value: firstName
			}}
			lastName={{
				label: "Last Name",
				onChange: setLastName,
				value: lastName
			}}
			email={{
				label: "Email address",
				onChange: setEmail,
				value: email
			}}
			password={{
				label: "Password",
				onChange: setPassword,
				type: "password",
				value: password
			}}
			passwordConfirm={{
				label: "Password Confirmation",
				onChange: setPasswordConfirm,
				type: "password",
				value: passwordConfirm
			}}
		/>
	);
};

export default SignUpContainer;

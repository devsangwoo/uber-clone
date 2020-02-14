import React, { useEffect } from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { USER_LOG_IN } from "../../SharedQueries.local";
import Routes from "..";

interface IParmas {
	token: string;
}
interface IProps extends RouteComponentProps<IParmas> {}

const SocialLoginContainer: React.FC<IProps> = ({
	match: {
		params: { token }
	},
	history
}) => {
	const [loginMutation] = useMutation(USER_LOG_IN, {
		onCompleted: () => {
			history.push(Routes.HOME);
		},
		variables: { token }
	});

	useEffect(() => {
		if (token) {
			loginMutation();
		}
	}, [token, loginMutation]);
	return <SocialLoginPresenter a={"a"} />;
};

export default SocialLoginContainer;

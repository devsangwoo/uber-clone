import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../utils/hooks";
import Routes from "../routes";
import * as S from "./LoginStyle";

const LoginPresenter: React.FC = () => {
	useTitle("Login | Nuber");
	return (
		<S.Container>
			<S.Header>
				<S.Logo>
					<S.Title>Nuber</S.Title>
				</S.Logo>
			</S.Header>
			<S.Footer>
				<Link to={Routes.PHONE_LOGIN}>
					<S.PhoneLogin>
						<S.SubTitle>Go everywhere with Nuber</S.SubTitle>
						<S.FakeInput>
							{" "}
							🇰🇷 +82 <S.Grey>Enter your mobile number</S.Grey>
						</S.FakeInput>
					</S.PhoneLogin>
				</Link>
				<Link to={Routes.SOCIAL_LOGIN}>
					<S.SocialLogin>
						<S.SocialLink>or connect with facebook</S.SocialLink>
					</S.SocialLogin>
				</Link>
			</S.Footer>
		</S.Container>
	);
};

export default LoginPresenter;

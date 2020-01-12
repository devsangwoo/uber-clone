import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import * as S from "./LoginStyle";
import { useTitle } from "../../hooks";

interface IProps extends RouteComponentProps {}

const LoginPresenter: React.FC<IProps> = () => {
	useTitle("Login | Nuber");
	return (
		<S.Container>
			<S.Header>
				<S.Logo>
					<S.Title>Nuber</S.Title>
				</S.Logo>
			</S.Header>
			<S.Footer>
				<Link to={"/phone-login"}>
					<S.PhoneLogin>
						<S.SubTitle>Go everywhere with Nuber</S.SubTitle>
						<S.FakeInput>
							{" "}
							🇰🇷 +82 <S.Grey>Enter your mobile number</S.Grey>
						</S.FakeInput>
					</S.PhoneLogin>
				</Link>
				<Link to={"/social-login"}>
					<S.SocialLogin>
						<S.SocialLink>or connect with facebook</S.SocialLink>
					</S.SocialLogin>
				</Link>
			</S.Footer>
		</S.Container>
	);
};

LoginPresenter.propTypes = {};

export default LoginPresenter;

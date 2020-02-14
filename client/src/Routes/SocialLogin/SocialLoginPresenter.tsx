import React from "react";
import { toast } from "react-toastify";
// import FacebookLogin from "react-facebook-login";
// import { ReactComponent as FaceBookIcon } from "../../assets/icons/facebook.svg";
import { forceHistory } from "../../utils/forceHistory";
import * as S from "./SocialLoginStyle";

interface IProps {
	a: string;
}

const SocialLoginPresenter: React.FC<IProps> = ({ a }) => {
	return (
		<S.Container>
			<S.Title>Choose an account</S.Title>
			<S.BackArrowExtended backTo={"/"} />
			<S.Button
				color="#DB4437"
				onClick={() => forceHistory.push("/api/auth/google")}
			>
				Google
			</S.Button>
			<S.Button
				color="#3b5998"
				// onClick={() => forceHistory.push("/api/auth/facebook")}
				onClick={() => toast.error("It in fixing")}
			>
				facebook
			</S.Button>
			{/* <FacebookLogin
				appId="100003174179004"
				autoLoad={true}
				fields="name,email,picture"
				callback={() => console.log("facebook")}
			/> */}
		</S.Container>
	);
};

export default SocialLoginPresenter;

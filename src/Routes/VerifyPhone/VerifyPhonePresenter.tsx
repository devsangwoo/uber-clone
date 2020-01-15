import React from "react";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { useTitle } from "../../hooks";
import * as S from "./VerifyPhoneStyle";

interface IProps {
	value: string;
	onChange: (event: React.ChangeEvent<Element>) => any;
	submitFn: any;
	loading: boolean;
}

const VerifyPhonePresenter: React.FC<IProps> = ({
	value,
	onChange,
	submitFn,
	loading
}) => {
	useTitle("Verify Phone | Nuber");
	return (
		<S.Container>
			<Header backTo="/phone-login" title={"Verify Phone Number"} />
			<S.FormExtended submitFn={submitFn}>
				<S.InputExtended value={value} onChange={onChange} />
				<Button
					value={loading ? "verifying..." : "submit"}
					disabled={loading}
				/>
			</S.FormExtended>
		</S.Container>
	);
};

export default VerifyPhonePresenter;

import React from "react";
import * as S from "./VerifyPhoneStyle";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import { useTitle } from "../../hooks";

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
					onClick={submitFn}
					disabled={loading}
				/>
			</S.FormExtended>
		</S.Container>
	);
};

export default VerifyPhonePresenter;

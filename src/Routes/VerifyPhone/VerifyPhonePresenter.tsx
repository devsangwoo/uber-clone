import React from "react";
import * as S from "./VerifyPhoneStyle";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import { useTitle } from "../../hooks";

interface IProps {
	value: string;
	onChange: (event: React.ChangeEvent<Element>) => any;
	onSubmit: (event: React.FormEvent<Element>) => void;
}

const VerifyPhonePresenter: React.FC<IProps> = ({
	value,
	onChange,
	onSubmit
}) => {
	useTitle("Verify Phone | Nuber");
	return (
		<S.Container>
			<Header backTo="/phone-login" title={"Verify Phone Number"} />
			<S.Form onSubmit={onSubmit}>
				<S.InputExtended value={value} onChange={onChange} />
				<Button value={"submit"} onClick={onSubmit} />
			</S.Form>
		</S.Container>
	);
};

export default VerifyPhonePresenter;

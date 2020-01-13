import React from "react";
import Input from "../../Components/Input";
import countries from "../../countries";
import * as S from "./PhoneLoginStyle";
import { ReactComponent as NextArrow } from "../../assets/icons/nextArrow.svg";
import { ReactComponent as Loading } from "../../assets/icons/loading.svg";
import { useTitle } from "../../hooks";

interface IProps {
	countryCode: string;
	phoneNumber: string;
	onInputChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	onSelectChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	loading: boolean;
}

const PhoneLoginPresenter: React.FC<IProps> = ({
	countryCode,
	phoneNumber,
	onInputChange,
	onSelectChange,
	onSubmit,
	loading
}) => {
	useTitle("Login | Nuber");
	return (
		<S.Container>
			<S.BackArrowExtended backTo={"/"} />
			<S.Title>Enter your mobile number</S.Title>
			<S.CountrySelect
				value={countryCode}
				name={"countryCode"}
				onChange={onSelectChange}
			>
				{countries.map((country, index) => (
					<S.CountryOption key={index} value={country.dial_code}>
						{country.flag} {country.name} ({country.dial_code})
					</S.CountryOption>
				))}
			</S.CountrySelect>
			<S.Form onSubmit={onSubmit}>
				<Input
					placeholder={"06 52 36 03 78"}
					value={phoneNumber}
					name={"phoneNumber"}
					onChange={onInputChange}
				/>
				<S.Button>{loading ? <Loading /> : <NextArrow />}</S.Button>
			</S.Form>
		</S.Container>
	);
};
export default PhoneLoginPresenter;

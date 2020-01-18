import React from "react";
import * as S from "./AddressStyles";

interface IProps {
	value: string;
	onBlur: any;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressBar: React.FC<IProps> = ({ value, onBlur, onChange, name }) => (
	<S.Input
		value={value}
		onBlur={onBlur}
		onSubmit={onBlur}
		onChange={onChange}
		placeholder={"Type address"}
		name={name}
	/>
);

export default AddressBar;

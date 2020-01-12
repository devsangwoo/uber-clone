import React from "react";
import * as S from "./InputStyle";

interface IProps {
	placeholder?: string;
	type?: string;
	required?: boolean;
	value: string;
	name?: string;
	onChange: any;
	className?: string;
}

const InputPresenter: React.SFC<IProps> = ({
	placeholder = "",
	type = "text",
	required = true,
	value,
	name = "",
	onChange,
	className
}) => (
	<S.Container
		className={className}
		onChange={onChange}
		name={name}
		type={type}
		required={required}
		value={value}
		placeholder={placeholder}
	/>
);

export default InputPresenter;

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
	autoFocus?: boolean;
}

const InputPresenter: React.SFC<IProps> = ({
	placeholder = "",
	type = "text",
	required = true,
	value,
	name = "",
	onChange,
	className,
	autoFocus
}) => (
	<S.Input
		className={className}
		onChange={onChange}
		name={name}
		type={type}
		required={required}
		value={value}
		placeholder={placeholder}
		autoFocus={autoFocus}
	/>
);

export default InputPresenter;

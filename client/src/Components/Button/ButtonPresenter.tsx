import React from "react";
import * as S from "./ButtonStyle";

interface IProps {
	value: string;
	onClick?: any;
	disabled?: boolean;
	className?: string;
}

const ButtonPresenter: React.FC<IProps> = ({
	value,
	onClick,
	disabled = false,
	className
}) => {
	return (
		<S.Container
			value={value}
			onClick={onClick}
			disabled={disabled}
			className={className}
			type={"submit"}
		/>
	);
};

export default ButtonPresenter;

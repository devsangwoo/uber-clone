import React from "react";
import * as S from "./IconButtonStyle";

interface IStyles {
	top?: string;
	bottom?: string;
	left?: string;
	right?: string;
	width?: string;
	height?: string;
}

interface IProps {
	className?: string;
	onClick: () => void;
	style?: IStyles;
}

const IconButtonPresenter: React.FC<IProps> = ({
	className,
	onClick,
	style,
	children: icon
}) => {
	return (
		<S.Button onClick={onClick} style={style}>
			{icon}
		</S.Button>
	);
};

export default IconButtonPresenter;

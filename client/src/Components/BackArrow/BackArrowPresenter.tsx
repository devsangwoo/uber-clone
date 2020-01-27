import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import * as S from "./BackArrowStyle";

interface IProps {
	backTo?: string;
	backFn?: () => void;
	className?: string;
}

const BackArrowPresenter: React.FC<IProps> = ({
	backFn,
	backTo,
	className
}) => {
	return (
		<S.Container className={className}>
			{backFn && (
				<BackArrow onClick={backFn} style={{ cursor: "pointer" }} />
			)}
			{backTo && (
				<Link to={backTo}>
					<BackArrow />
				</Link>
			)}
		</S.Container>
	);
};

export default BackArrowPresenter;

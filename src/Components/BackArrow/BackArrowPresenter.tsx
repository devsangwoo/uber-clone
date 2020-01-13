import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import * as S from "./BackArrowStyle";

interface IProps {
	backTo: string;
	className?: string;
}

const BackArrowPresenter: React.FC<IProps> = ({ backTo, className }) => {
	return (
		<S.Container className={className}>
			<Link to={backTo}>
				<BackArrow />
			</Link>
		</S.Container>
	);
};

export default BackArrowPresenter;

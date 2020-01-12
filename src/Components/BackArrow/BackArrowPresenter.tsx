import React from "react";
import * as S from "./BackArrowStyle";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BackArrow from "../../icons/BackArrow";

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

BackArrowPresenter.propTypes = {
	backTo: PropTypes.string.isRequired
};

export default BackArrowPresenter;

import React from "react";

interface IProps {
	className?: string;
}

const ContainerPresenter: React.FC<IProps> = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export default ContainerPresenter;

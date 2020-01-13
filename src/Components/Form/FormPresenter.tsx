import React from "react";

interface IProps {
	className?: string;
	submitFn: any;
}

const FormPresenter: React.FC<IProps> = ({ submitFn, className, children }) => {
	return (
		<form
			className={className}
			onSubmit={e => {
				e.preventDefault();
				submitFn();
			}}
		>
			{children}
		</form>
	);
};

export default FormPresenter;

import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";

const PhoneLoginContainer: React.FC = () => {
	return (
		<PhoneLoginPresenter
			countryCode={"+33"}
			phoneNumber={""}
			onInputChange={() => {}}
			onSubmit={() => {}}
			loading={false}
		/>
	);
};

export default PhoneLoginContainer;

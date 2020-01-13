import { useEffect, useState, ReactEventHandler } from "react";

export const useTitle = (initialTitle: string) => {
	const [title, setTitle] = useState(initialTitle);

	const updateTitle = () => {
		const htmlTitle = document.querySelector("title");
		if (htmlTitle) {
			htmlTitle.innerText = title;
		}
	};
	useEffect(updateTitle, [title]);
	return setTitle;
};

export const useInput = (
	initialValue: string,
	validator?: Function | RegExp
): [string, (event: React.ChangeEvent) => any] => {
	const [value, setValue] = useState(initialValue);

	const onChange: ReactEventHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const {
			target: { value }
		} = event;

		let isValidValue = true;
		if (validator) {
			if (typeof validator === "function") {
				isValidValue = validator(value);
			} else {
				isValidValue = validator.test(value);
			}
		}
		if (isValidValue) {
			setValue(value);
		}
	};

	// const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

	return [value, onChange];
};

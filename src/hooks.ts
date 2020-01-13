import { ReactEventHandler, useEffect, useState } from "react";

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
	validator?: ((arg: string) => boolean) | RegExp
): [string, (event: React.ChangeEvent) => any] => {
	const [value, setValue] = useState(initialValue);

	const onChange: ReactEventHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const {
			target: { value: inputValue }
		} = event;

		let isValidValue: boolean = true;
		if (validator) {
			if (typeof validator === "function") {
				isValidValue = validator(inputValue);
			} else {
				isValidValue = validator.test(inputValue);
			}
		}
		if (isValidValue) {
			setValue(inputValue);
		}
	};

	return [value, onChange];
};

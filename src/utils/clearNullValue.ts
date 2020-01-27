export const clearNullValue = (args: object): object => {
	const nonNullArgs = {};
	Object.keys(args).forEach(key => {
		if (args[key] !== null || args[key] !== undefined) {
			nonNullArgs[key] = args[key];
		}
	});
	return nonNullArgs;
};

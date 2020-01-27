export const authResolverProtector = authResolverFunction => async (
	parent,
	args,
	context,
	info
) => {
	if (!context.req.user) {
		throw new Error("[authrorization error] No JWT authorized");
	}
	const resolved = await authResolverFunction(parent, args, context, info);
	return resolved;
};

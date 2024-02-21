export async function load({ locals: { session, user }, url: { searchParams } }) {
	let redirectTo = searchParams.getAll('redirectTo').pop();

	if (redirectTo) {
		redirectTo = `/${redirectTo?.slice(1)}`;
	}

	return {
		session,
		user,
		redirectTo
	};
}

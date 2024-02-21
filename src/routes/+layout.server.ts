export async function load({ locals: { session, user } }) {
	return {
		session,
		user
	};
}

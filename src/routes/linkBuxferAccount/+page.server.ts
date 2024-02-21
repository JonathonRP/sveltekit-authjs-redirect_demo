import { redirect, fail, error } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const { url, request } = event;
		const redirectTo = url.searchParams.get('redirectTo');
		const data = await request.formData();

		try {
			const { email, password } = Object.fromEntries(data);

            const token = 'dummy';
			event.setHeaders({ Authorization: `Bearer: ${token}`});

			
			// - this does not work
			// return Response.json(
			// 	{ url: Location },
			// 	{
			// 		status: 302,
			// 		headers: {
			// 			Location,
			// 		},
			// 	}
			// );

            // - also redirect in here gets caught in catch...
		} catch (err) {
			// if (err instanceof TRPCError) {
			// 	const errors = { user: [err.message] };
			// 	return fail(getHTTPStatusCodeFromError(err), { errors });
			// }
			return error(500, err);
		}

        // - this would be nice atleast to achive.
        // return {
        // 	status: 302,
        // 	headers: {
        // 		Location: location,
        // 		...AuthorizationHeadersBearerTokenFrom(token),
        // 	},
        // };

        // - this does not work
        // return Response.json(
        // 	{ url: Location },
        // 	{
        // 		status: 302,
        // 		headers: {
        // 			Location,
        // 		},
        // 	}
        // );

		const location = '/';
		if (redirectTo?.slice(1)) {
			location.concat(redirectTo.slice(1));
		}
		redirect(302, location);
	},
};
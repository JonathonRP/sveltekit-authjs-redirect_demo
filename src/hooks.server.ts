import { sequence } from '@sveltejs/kit/hooks';
import { formatError } from '$lib/utils';
import GitHub from '@auth/sveltekit/providers/github';
import LinkedIn from '@auth/sveltekit/providers/linkedin';
import Google from '@auth/sveltekit/providers/google';
import Facebook from '@auth/sveltekit/providers/facebook';
import Twitter from '@auth/sveltekit/providers/twitter';
import Auth0 from '@auth/sveltekit/providers/auth0';
import Discord from '@auth/sveltekit/providers/discord';
import Twitch from '@auth/sveltekit/providers/twitch';
import Pinterest from '@auth/sveltekit/providers/pinterest';
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import * as authjs from './server/auth';

function authentication() {
	return authjs.handle;
}

function loginAndResume(url: URL, loginEndpoint: string, redirectReason?: string) {
	const { pathname, search } = url;
	return `${loginEndpoint}${pathname ? `?redirectTo=${pathname.slice(1)}${search}${redirectReason ? `&reason=${redirectReason}` : ''}` : ''}`;
}

function authorization() {
	return (async ({ event, resolve }) => {
		const { url, request: { headers }, route } = event;

		if (!(route.id?.includes('auth') || route.id?.includes('linkBuxferAccount') || route.id?.includes('/'))
			&& !(await event.locals.auth())) {
			return redirect(302, loginAndResume(url, '/linkBuxferAccount'));
		}

		if (!headers.get('Authorization')) {
			// notice headers Authorization is never added.
			console.log('no auth header');
		}

		// REVIEW - is this needed?
		// if (session && redirectTo) {
		// 	return redirect(302, `/${redirectTo.slice(1)}`);
		// }
		
		return resolve(event);
	}) satisfies Handle;
}

export const handle = sequence(authentication(), authorization());
export const handleError = (async ({ error, event }) => {
// const errorId = ulid();

// TODO - replace with logging collection data service (ex. Sentry).
// logger.error((error as Error)?.stack || (error as App.Error).message || 'Oops!', { event, errorId, error });
 	console.log(error);
//  formatError(error)
}) satisfies HandleServerError;
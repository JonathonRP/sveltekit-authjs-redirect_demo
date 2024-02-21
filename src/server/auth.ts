import { SvelteKitAuth, SvelteKitAuthConfig } from '@auth/sveltekit';
import { adapter } from '$/server/db';
import { ulid } from 'ulid';
import Email from '@auth/sveltekit/providers/email';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => ({
	providers: [
		Email({
			type: 'email'
		})
	],
	adapter,
	session: {
		strategy: 'database',
		generateSessionToken: () => ulid()
	},
	callbacks: {
		// jwt: ({ token, account }) => {
    //   event.setHeaders({ Authorization: `Bearer: ${account.access_token}`})
    //   return token;
    // },
		session: ({ session, user }) => {
			event.locals.session = session;
			event.locals.user = user;
			return {
				...session
			};
		}
	}
}) satisfies SvelteKitAuthConfig);
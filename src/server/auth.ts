import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import { adapter } from '$/server/db';
import { ulid } from 'ulid';
import nodemailer from '@auth/sveltekit/providers/nodemailer';
import { RESEND_API_KEY } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => ({
	trustHost: true,
	providers: [
		nodemailer({
			server: {
				host: 'smtp.resend.com',
				port: 465,
				auth: {
					credentials: {
						user: 'resend',
						pass: RESEND_API_KEY
					}
				}
			}
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

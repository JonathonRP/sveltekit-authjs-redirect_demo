/// <reference types="@auth/sveltekit" />

import type { ZodIssue } from 'zod';
import type { Session } from '@auth/sveltekit';
import type { AdapterUser } from '@auth/sveltekit/adapter';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
			cause?: { [x: string]: any }[] | ZodIssue[];
		}
		// interface Error {}
		interface Locals {
			session: Session;
			user: AdapterUser;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

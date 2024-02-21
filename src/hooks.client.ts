import { formatError } from '$lib/utils';
import type { HandleClientError } from "@sveltejs/kit";

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = (async ({ error, event }) => 
// const errorId = ulid();

// TODO - replace with logging collection data service (ex. Sentry).
// logger.error({
// 	issue: (error as Error)?.stack || (error as App.Error).message || 'Oops!',
// 	...{ event, errorId, error },
// });

  formatError(error)
) satisfies HandleClientError;

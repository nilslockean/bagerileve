import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
	const auth = event.request.headers.get('Authorization');

	if (env.BASIC_AUTH && auth !== `Basic ${btoa(env.BASIC_AUTH)}`) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
			}
		});
	}

	return resolve(event);
};

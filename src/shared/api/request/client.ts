import { attach } from 'effector';

import { FxBasedAnswer, FxBasedRequest, queryToString, requestFx } from './base';

export const sendClientRequestFx = attach({ effect: requestFx }).use(requestClient);

export async function requestClient<FxBasedAnswer = unknown>({ path, method, ...options }: FxBasedRequest) {
	const headers = new Headers(options.headers);
	contentDefault(headers, 'application/json; charset=utf-8');

	const query = queryToString(options.query);
	const body = contentIs(headers, 'application/json') && options.body ? JSON.stringify(options.body) : undefined;

	const response = await fetch(`${process.env.CLIENT_BACKEND_URL}${path}${query}`, {
		method,
		headers,
		body,
		credentials: 'same-origin',
	});

	const answer: Response = contentIs(response.headers, 'application/json')
		? await response.json()
		: await response.text();

	const responder = {
		ok: response.ok,
		body: answer,
		status: response.status,
		headers: toObject(response.headers),
	};

	if (response.ok) {
		return responder;
	}
	throw responder;
}

function contentIs(headers: Headers, type: string): boolean {
	return headers.get('content-type')?.includes(type) ?? false;
}

function contentDefault(headers: Headers, type: string): Headers {
	if (!headers.has('content-type')) {
		headers.set('content-type', type);
	}
	return headers;
}

function toObject(headers: Headers): Record<string, string> {
	const target = {};
	headers.forEach((value, key) => {
		// @ts-ignore
		target[key] = value;
	});
	return target;
}

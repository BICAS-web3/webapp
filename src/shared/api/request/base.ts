import { createEffect } from 'effector';
import queryString from 'query-string';

export interface FxBasedRequest {
	path: string;
	method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
	body?: Record<string, unknown> | null | void;
	query?: Record<string, string>;
	headers?: Record<string, string>;
	cookies?: string;
}

export interface FxBasedAnswer {
	ok: boolean;
	body: unknown;
	status: number;
	headers: Record<string, string>;
}

export const requestFx = createEffect<FxBasedRequest, FxBasedAnswer, FxBasedAnswer>();

export function queryToString(query: Record<string, string> | undefined): string {
	return query ? `?${queryString.stringify(query)}` : '';
}

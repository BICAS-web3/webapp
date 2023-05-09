import { rejects } from 'assert';
import { createEffect } from 'effector';

import { requestFx } from './request';

export * as walletsApi from './wallets';

export type SignIn = {
	address: string;
};

export type SignInSuccess = {
	jwt: string;
	address: string;
};

export type SignInError = {
	error: string;
};

export const signInFx = createEffect<SignIn, SignInSuccess, SignInError>(async form => {
	await new Promise(resolve => setTimeout(resolve, 600));

	try {
		await fetch('http://164.92.245.236:8080/auth/auth', {
			method: 'POST',
			body: JSON.stringify({
				address: form.address,
			}),
		});
	} catch (e) {
		console.log(e);
	}

	localStorage.setItem('address', form.address);

	return new Promise(resolve =>
		setTimeout(() => {
			resolve(form.address);
		}, 600)
	).then(address => ({ jwt: 'some_unique_string', address: address as string }));
});

export type GetSession = void;

export type GetSessionSucces = {
	jwt: string;
	address: string;
};

export type GetSessionError = {};

export const getSessionFx = createEffect<GetSession, GetSessionSucces, GetSessionError>(async form => {
	await new Promise(resolve => setTimeout(resolve, 600));

	const address = localStorage.getItem('address');

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (address) {
				resolve(address);
			} else {
				reject();
			}
		}, 600);
	}).then(_ => ({
		jwt: 'some_unique_string',
		address: 'some_unique_address',
	}));
});

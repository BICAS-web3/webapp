import { createEffect, createEvent } from 'effector';

const BaseApiUrl = '/api';

export const pageMountedEv = createEvent<void>();

export type T_Session = {
	jwt: string;
	address: string;
};

export type T_SignIn = {
	address: string;
};

export type T_Account = {
	id: number;
	address: string;
};

export type T_SignInSuccess = T_Session;

export const signInFx = createEffect<T_SignIn, T_SignInSuccess, unknown>(async form => {
	return fetch(`${BaseApiUrl}/auth/auth`, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(async res => await res.json());
});

export const logoutFx = createEffect<void, undefined, undefined>(async () => {
	return fetch(`${BaseApiUrl}/logout`, {
		method: 'POST',
		credentials: 'include',
	}).then(async res => await res.json());
});

export type T_GetAccount = void;

export type T_GetAccountSuccess = T_Account;

export const getAccountFx = createEffect<T_GetAccount, T_GetAccountSuccess>(async form => {
	return fetch(`${BaseApiUrl}/auth/user`, {
		method: 'GET',
		credentials: 'include',
	}).then(async res => await res.json());
});

export type T_GetAccounts = {};

export type T_GetAccountsSussess = {
	users: T_Account[];
};

export type T_GetAccountsFailed = {
	message: string;
};

export type T_Invite = {
	id: number;
	applicant_addr: string;
	receiver_addr: string;
	status: number;
};

export type T_GetInvites = {};

export type T_GetInvitesSuccess = {
	requests: T_Invite[];
};

export type T_GetInvitesError = {
	message: string;
};

export const getInvitesFx = createEffect<void, T_GetInvitesSuccess, T_GetInvitesError>(async form => {
	return fetch(`${BaseApiUrl}/invite/invites`, {
		method: 'GET',
		credentials: 'include',
	}).then(async res => await res.json());
});

export type T_GetUsersSuccess = {
	users: T_Account[];
};

export type T_GetUsersError = {
	message: string;
};

export const getUsersFx = createEffect<void, T_GetUsersSuccess, T_GetUsersError>(async form => {
	return fetch(`${BaseApiUrl}/auth/users?limit=20&offset=1`, {
		method: 'GET',
		credentials: 'include',
	})
		.then(async res => await res.json())
		.catch(e => ({ message: 'error' }));
});

export type T_AcceptInvite = {
	id: number;
};
export type T_AcceptInviteSuccess = T_Invite;

export type T_AcceptInviteError = {
	message: string;
};

export const acceptInviteFx = createEffect<T_AcceptInvite, T_AcceptInviteSuccess, T_AcceptInviteError>(async form => {
	return fetch(`${BaseApiUrl}/invite/accept`, {
		method: 'PATCH',
		credentials: 'include',
		body: JSON.stringify({
			id: form.id,
		}),
	})
		.then(async res => await res.json())
		.catch(e => ({ message: 'error' }));
});

export type T_DeclineInvite = {
	id: number;
};

export type T_DeclineInviteSuccess = T_Invite;

export type T_DeclineInviteError = {
	message: string;
};

export const declineInviteFx = createEffect<T_DeclineInvite, T_DeclineInviteSuccess, T_DeclineInviteError>(
	async form => {
		return fetch(`${BaseApiUrl}/invite/decline`, {
			method: 'PATCH',
			credentials: 'include',
			body: JSON.stringify({
				id: form.id,
			}),
		})
			.then(async res => await res.json())
			.catch(e => ({ message: 'error' }));
	}
);

export type T_CreateInvite = {
	applicant_addr: string;
	receiver_addr: string;
};

export type T_CreateInviteSuccess = T_Invite;

export type T_CreateInviteError = {
	message: string;
};

export const createInviteFx = createEffect<T_CreateInvite, T_CreateInviteSuccess, T_CreateInviteError>(async form => {
	return fetch(`${BaseApiUrl}/invite/create`, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(async res => await res.json());
});

export type T_GetGamesSuccess = {
	games: [];
};

export type T_GetGamesError = {
	message: string;
};

export const getGamesFx = createEffect<void, T_GetGamesSuccess, T_GetGamesError>(async form => {
	return fetch(`${BaseApiUrl}/game/games?status=1`, {
		method: 'GET',
		credentials: 'include',
	}).then(async res => await res.json());
});

export type T_CreateRandomGame = {
	applicant_addr: string;
};

export type T_CreateRandomGameSuccess = {
	id: number;
};

export const createRandomGameFx = createEffect<T_CreateRandomGame, T_CreateRandomGameSuccess>(async form => {
	const ms = Math.random() * 5000;
	await new Promise(resolve => setTimeout(resolve, ms));

	return fetch(`${BaseApiUrl}/game/random`, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(async res => await res.json());
});

export type T_CreateGame = {
	applicant_addr: string;
	receiver_addr: string;
};

export type T_CreateGameSuccess = {
	id: number;
};

export type T_CreateGameError = {
	message: string;
};

export const createGameFx = createEffect<T_CreateGame, T_CreateGameSuccess, T_CreateGameError>(async form => {
	return fetch(`${BaseApiUrl}/game/create`, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(async res => await res.json());
});

export type T_Game = {
	id: number;
	applicant_addr: string;
	receiver_addr: string;
	winner_addr?: string;
	status: 0 | 1 | 2 | 3;
	applicant_ready: boolean;
	receiver_ready: boolean;
	create_data: string;
	applicant_nft: {
		token_id: number;
		contract: string;
		price: number;
	};
	receiver_nft: {
		token_id: number;
		contract: string;
		price: number;
	};
};

export type T_GetGame = {
	id: number | string;
};

export type T_GetGameSuccess = T_Game;

export type T_GetGameError = {
	message: string;
};

export const getGameFx = createEffect<T_GetGame, T_GetGameSuccess, T_GetGameError>(async form => {
	return fetch(`${BaseApiUrl}/game/game?id=${form.id}`, {
		method: 'GET',
		credentials: 'include',
	}).then(async res => await res.json());
});

export type T_RunGame = {
	id: T_Game['id'];
};

export type T_RunGameSuccess = T_Game;

export type T_RunGameError = {
	message: string;
};

export const runGameFx = createEffect<T_RunGame, T_RunGameSuccess, T_RunGameError>(async form => {
	return fetch(`${BaseApiUrl}/game/run`, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(async res => await res.json());
});

export type T_Nft = {
	contract: string;
	tokenId: number;
	img_url: string;
};

export type T_GetNfts = void;

export type T_GetNftsSuccess = {
	nfts: T_Nft[];
};

export type T_GetNftsError = {
	message: string;
};

export const getNftsFx = createEffect<T_GetNfts, T_GetNftsSuccess, T_GetNftsError>(async () => {
	return fetch(`${BaseApiUrl}/game/nfts`, {
		method: 'GET',
		credentials: 'include',
	}).then(async res => await res.json());
});

export type T_SetBet = {
	playerType: 'applicant' | 'receiver';
	id: T_Game['id'];
	contract: T_Nft['contract'];
	token: T_Nft['tokenId'];
};

export type T_SetBetSuccess = {};

export type T_SetBetError = {};

export const setBetFx = createEffect<T_SetBet, T_SetBetSuccess, T_SetBetError>(async form => {
	return fetch(`${BaseApiUrl}/game/${form.playerType}_bet`, {
		method: 'PATCH',
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(async res => await res.json());
});

export type T_CancelGame = {
	id: T_Game['id'];
};
export type T_CancelGameSuccess = {};
export type T_CancelGameError = {};

export const cancelGameFx = createEffect<T_SetBet, T_CancelGameSuccess, T_CancelGameError>(async form => {
	return fetch(`${BaseApiUrl}/game/cancel`, {
		method: 'PATCH',
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(async res => await res.json());
});

export type T_ConfirmBet = {
	id: T_Game['id'];
	type: 'applicant' | 'receiver';
};
export type T_ConfirmBetSuccess = boolean;
export type T_ConfirmBetError = {};

export const confirmBetFx = createEffect<T_ConfirmBet, T_ConfirmBetSuccess, T_ConfirmBetError>(async form => {
	return fetch(`${BaseApiUrl}/game/${form.type}_status`, {
		method: 'PATCH',
		credentials: 'include',
		body: JSON.stringify({
			id: form.id,
			status: true,
		}),
	}).then(async res => true);
});

export type T_DoneGame = {};
export type T_DoneGameSuccess = {};
export type T_DoneGameError = {};

export const doneGameFx = createEffect<T_DoneGame, T_DoneGameSuccess, T_DoneGameError>(async form => {
	return fetch(`${BaseApiUrl}/game/done`, {
		method: 'PATCH',
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(async res => await res.json());
});

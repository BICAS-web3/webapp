import { createEffect, createEvent, createStore, sample } from 'effector';
import { ethers } from 'ethers';
import { and, interval, not, or } from 'patronum';

import { sessionModel } from '@/entities/session';

import { T_Account, T_Game, T_Nft, confirmBetFx, doneGameFx, getGameFx, runGameFx, setBetFx } from '@/shared/api';
import { abi } from '@/shared/data/abi';
import { base_abi } from '@/shared/data/abi1';

import { selectNftEv } from '../select-nft-modal/model';

const GAME_CONTRACT_ADDRESS = '0x21432a1EEa39dF8510F014dE533192B58033ca90';

type T_Step = 'select' | 'approve' | 'transfer' | 'wait' | 'confirm' | 'run' | 'claim' | 'done';

type T_GamePlayer = {
	nft: {
		token_id: T_Nft['tokenId'];
		contract: T_Nft['contract'];
		price: number;
	};
	address: T_Game['applicant_addr'];
	ready: boolean;
	type: 'applicant' | 'receiver';
};

type T_Players = Record<'current' | 'opponent', T_GamePlayer>;

type T_Approve = {
	contract: T_Nft['contract'];
	token: T_Nft['tokenId'];
};
type T_ApproveSuccess = { message: string };
type T_ApproveError = Error;

export const approveFx = createEffect<T_Approve, T_ApproveSuccess, T_ApproveError>(async form => {
	return new Promise(async (resolve, reject) => {
		try {
			// @ts-ignore
			const provider = new ethers.providers.Web3Provider(window.ethereum as any);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(form.contract, abi, signer);

			const transaction = await contract.approve(GAME_CONTRACT_ADDRESS, form.token);

			await transaction.wait();

			resolve({ message: 'success' });
		} catch (e) {
			reject(e);
		}
	});
});

type T_MakeBets = {
	id: T_Game['id'];
	nft: T_Nft;
	accountAddress: T_Account['address'];
};

type T_MakeBetsSuccess = boolean;

type T_MakeBetsError = {};

export const makeBetsFx = createEffect<T_MakeBets, T_MakeBetsSuccess, T_MakeBetsError>(async form => {
	return new Promise(async (resolve, reject) => {
		try {
			// @ts-ignore
			const provider = new ethers.providers.Web3Provider(window.ethereum as any);
			const signer = await provider.getSigner();

			const contract = new ethers.Contract(GAME_CONTRACT_ADDRESS, base_abi, signer);
			const feeAmount = await contract.feeAmount();
			const transaction = await contract.makeBets(form.id, [[form.nft.contract, form.nft.tokenId]], {
				value: feeAmount,
			});
			await transaction.wait();

			resolve(undefined);
		} catch (e) {
			reject(e);
		}
	}).then(() => true);
});

export const claimFx = createEffect<T_Game, boolean, Error>(async form => {
	return new Promise(async (resolve, reject) => {
		try {
			// @ts-ignore
			const provider = new ethers.providers.Web3Provider(window.ethereum as any);
			const signer = await provider.getSigner();

			const contract = new ethers.Contract(GAME_CONTRACT_ADDRESS, base_abi, signer);
			const transaction = await contract.claimReward(form.id);
			await transaction.wait();

			resolve(undefined);
		} catch (e) {
			reject(e);
		}
	}).then(() => true);
});

export const setGameId = createEvent<string>();
export const resetEv = createEvent<void>();
export const approveEv = createEvent<void>();
export const transferEv = createEvent<void>();
export const confirmEv = createEvent<void>();
export const cancelEv = createEvent<void>();
export const claimEv = createEvent<void>();

const $gameId = createStore<string | null>(null);
export const $game = createStore<T_Game | null>(null);
export const $players = createStore<T_Players | null>(null);
export const $selectedNft = createStore<T_Nft | null>(null);
export const $step = createStore<T_Step>('select');
export const $notFound = createStore<boolean>(false);
export const $actionPending = or(
	approveFx.pending,
	makeBetsFx.pending,
	setBetFx.pending,
	confirmBetFx.pending,
	claimFx.pending,
	doneGameFx.pending
);

$gameId.on(setGameId, (_, payload) => payload).reset(resetEv);
$game
	.on(getGameFx.doneData, (_, payload) => payload)
	.on(runGameFx.doneData, (_, payload) => payload)
	.reset(resetEv);
$players.reset(resetEv);
$selectedNft.on(selectNftEv, (_, payload) => payload).reset(resetEv);
$notFound.on(getGameFx.fail, () => true).reset(resetEv);

$step
	.on($selectedNft, (_, payload) => (payload ? 'approve' : 'select'))
	.on(approveFx.done, () => 'transfer')
	.on(setBetFx.done, () => 'wait')
	.on(confirmBetFx.done, () => 'wait')
	.on(doneGameFx.done, () => 'done')
	.on(claimFx.done, () => 'done')
	.reset(resetEv);

const { tick } = interval({
	timeout: 15000,
	start: setGameId,
	stop: resetEv,
});

sample({
	clock: tick,
	source: [and(sessionModel.$isAuthenticated, $gameId), $actionPending, $gameId],
	filter: source => !!source[0] && !source[1],
	fn: source => ({ id: source[2] as string }),
	target: getGameFx,
});

sample({
	clock: and(sessionModel.$isAuthenticated, $gameId, not($actionPending)),
	source: $gameId,
	filter: (_, clock) => !!clock,
	fn: source => ({
		id: source as string,
	}),
	target: getGameFx,
});

sample({
	clock: getGameFx.doneData,
	source: sessionModel.$session,
	fn: (source, clock) => {
		const players = {} as T_Players;
		const groupedPlayers = [
			[clock.applicant_addr, clock.applicant_nft, clock.applicant_ready, 'applicant'],
			[clock.receiver_addr, clock.receiver_nft, clock.receiver_ready, 'receiver'],
		];

		for (let i = 0; i < groupedPlayers.length; i++) {
			const [address, nft, ready, type] = groupedPlayers[i];

			players[address === source?.address ? 'current' : 'opponent'] = {
				address: address as string,
				nft: nft as T_GamePlayer['nft'],
				ready: ready as boolean,
				type: type as 'applicant' | 'receiver',
			};
		}

		return players as T_Players;
	},
	target: $players,
});

sample({
	clock: $players,
	source: [$game, $step],
	filter: (source, clock) => !!source[0] && !!source[1] && !!clock,
	fn: ([game, step], players): T_Step => {
		if (!players?.current.nft) {
			return step as T_Step;
		}

		if ((game as T_Game).winner_addr && ((game as T_Game).winner_addr || '').length > 2) {
			return (game as T_Game).winner_addr === players.current.address && (game as T_Game).status === 2
				? 'claim'
				: 'done';
		}

		if (players?.current.ready && players?.opponent.ready) {
			return 'run';
		}

		if (!players?.current.ready && !players?.opponent.nft) {
			return 'wait';
		}

		if (!players?.current.ready && players?.opponent.nft) {
			return 'confirm';
		}

		return step as T_Step;
	},
	target: $step,
});

sample({
	clock: approveEv,
	source: $selectedNft,
	filter: source => !!source,
	fn: source => ({ contract: (source as T_Nft).contract, token: (source as T_Nft).tokenId }),
	target: approveFx,
});

sample({
	clock: transferEv,
	source: [$selectedNft, $game, $players],
	filter: source => !!source[0] && !!source[1] && !!source[2],
	fn: ([nft, game, players], clock) => ({
		id: (game as T_Game).id,
		nft: nft as T_Nft,
		accountAddress: (players as T_Players).current.address,
	}),
	target: makeBetsFx,
});

sample({
	clock: makeBetsFx.done,
	source: [$selectedNft, $game, $players],
	filter: source => !!source[0] && !!source[1] && !!source[2],
	fn: ([nft, game, players], clock) => ({
		id: (game as T_Game).id,
		contract: (nft as T_Nft).contract,
		token: (nft as T_Nft).tokenId,
		playerType: (players as T_Players).current.type,
	}),
	target: setBetFx,
});

sample({
	clock: confirmEv,
	source: [$game, $players],
	filter: source => !!source[0] && !!source[1],
	fn: source => ({
		id: (source[0] as T_Game).id,
		type: (source[1] as T_Players).current.type,
	}),
	target: confirmBetFx,
});

sample({
	clock: $step,
	source: $game,
	filter: (source, clock) => clock === 'run' && !!source && source?.status !== 2,
	fn: source => ({ id: (source as T_Game).id }),
	target: runGameFx,
});

sample({
	clock: claimEv,
	source: $game,
	filter: source => !!source,
	fn: source => source as T_Game,
	target: claimFx,
});

sample({
	clock: claimFx.done,
	source: $game,
	filter: (source, clock) => !!source && !!clock,
	fn: source => ({ id: (source as T_Game).id }),
	target: doneGameFx,
});

sample({
	clock: [setBetFx.done, confirmBetFx.done, confirmBetFx.done],
	source: $gameId,
	filter: source => source !== null,
	fn: source => ({
		id: source as string,
	}),
	target: getGameFx,
});

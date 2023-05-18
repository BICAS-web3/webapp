import { createEvent, createStore, sample } from 'effector';

import { T_Game, getGamesFx } from '@/shared/api';

export const openModalEv = createEvent();

export const closeModalEv = createEvent();

export const $modalOpen = createStore(false)
	.on(openModalEv, () => true)
	.on(closeModalEv, () => false);

export const $games = createStore<T_Game[]>([] as T_Game[]);
export const $gamesPending = getGamesFx.pending;

$games.on(getGamesFx.doneData, (_, payload) => payload.games);

sample({
	clock: openModalEv,
	target: getGamesFx,
});

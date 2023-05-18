import { createEvent, createStore, sample } from 'effector';

import { T_Nft, getNftsFx } from '@/shared/api';

export const openModalEv = createEvent();
export const closeModalEv = createEvent();

export const selectNftEv = createEvent<T_Nft>();

export const $modalOpen = createStore(false);
export const $nftsPending = getNftsFx.pending;
export const $nfts = createStore<T_Nft[]>([] as T_Nft[]);

$modalOpen.on(openModalEv, () => true).on(closeModalEv, () => false);
$nfts.on(getNftsFx.doneData, (_, payload) => payload.nfts || []);

sample({
	clock: openModalEv,
	target: getNftsFx,
});

import { createEvent, createStore, sample } from 'effector';
import { or } from 'patronum';

import { T_Account, getAccountFx, logoutFx, signInFx } from '@/shared/api';

export const readyEv = createEvent<void>();
export const logoutEv = createEvent<void>();
export const setSessionAddress = createEvent<string | null>();
export const setChosenNetwork = createEvent<number>();
export const setChosenToken = createEvent<number>();

export const $chosenToken = createStore<number>(0);
export const $chosenNetwork = createStore<number>(1);
export const $sessionAddress = createStore<string | null>(null);
export const $session = createStore<T_Account | null>(null);
export const $isAuthenticated = $session.map(user => user !== null);
export const $sessionChecked = createStore<boolean>(false);
export const $sessionPending = or(signInFx.pending, getAccountFx.pending, logoutFx.pending);

$sessionAddress.on(setSessionAddress, (_, address) => address);
$chosenNetwork.on(setChosenNetwork, (_, network) => network);
$chosenToken.on(setChosenToken, (_, tokenId) => tokenId);

$session.on(getAccountFx.doneData, (_, account) => account).on(logoutFx.done, () => null);
$sessionChecked.on(getAccountFx.finally, () => true);

// sample({
// 	clock: readyEv,
// 	source: or($session, $sessionPending),
// 	filter: source => !source,
// 	target: getAccountFx,
// });

// sample({
// 	clock: signInFx.done,
// 	source: or($session, $sessionPending),
// 	filter: source => !source,
// 	target: getAccountFx,
// });

sample({
	clock: logoutEv,
	target: logoutFx,
});

import { MetaMaskSDK } from '@metamask/sdk';

const options = {
    dappMetadata: { name: "Bicas Casino", url: "https://mydapp.com" },
    injectProvider: true
};
export const MMSDK = new MetaMaskSDK(options);
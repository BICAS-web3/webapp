import { createEvent, createStore, sample } from 'effector';
import { and, not } from 'patronum';

import { getSessionFx, signInFx } from '@/shared/api';

export const readyToLoadSession = createEvent<void>();

export const $session = createStore<any>(null);
export const $isAuthenticated = $session.map(user => user !== null);

export const $sessionPending = and(not($session), getSessionFx.pending);
export const $sessionChecked = createStore(false);

sample({
	clock: readyToLoadSession,
	target: getSessionFx,
});

$session.on(signInFx.doneData, (_, { jwt, address }) => address);

$session.on(getSessionFx.doneData, (_, { jwt, address }) => {
	return address;
});

$sessionChecked.on(getSessionFx.finally, () => true);

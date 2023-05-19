import { createEvent, createStore, sample } from 'effector';
import { or } from 'patronum';

import { T_Account, getAccountFx, logoutFx, signInFx } from '@/shared/api';

export const readyEv = createEvent<void>();
export const logoutEv = createEvent<void>();

export const $session = createStore<T_Account | null>(null);
export const $isAuthenticated = $session.map(user => user !== null);
export const $sessionChecked = createStore<boolean>(false);
export const $sessionPending = or(signInFx.pending, getAccountFx.pending, logoutFx.pending);

$session.on(getAccountFx.doneData, (_, account) => account).on(logoutFx.done, () => null);
$sessionChecked.on(getAccountFx.finally, () => true);

sample({
	clock: readyEv,
	source: or($session, $sessionPending),
	filter: source => !source,
	target: getAccountFx,
});

sample({
	clock: signInFx.done,
	source: or($session, $sessionPending),
	filter: source => !source,
	target: getAccountFx,
});

sample({
	clock: logoutEv,
	target: logoutFx,
});

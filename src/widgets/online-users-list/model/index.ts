import { attach, createEvent, createStore, sample } from 'effector';

import { sessionModel } from '@/entities/session';

import { T_Account, createInviteFx, getUsersFx } from '@/shared/api';

type T_InviteStatus = 'pending' | 'reject' | 'done';
type T_AccountWithStatus = T_Account & { status?: T_InviteStatus };

export const localGetUsersFx = attach({ effect: getUsersFx });

export const openModalEv = createEvent();
export const closeModalEv = createEvent();

export const requestEv = createEvent<{ address: T_Account['address'] }>();

export const $modalOpen = createStore(false);

export const $users = createStore<T_AccountWithStatus[]>([] as T_AccountWithStatus[]);
export const $usersPending = localGetUsersFx.pending;

$modalOpen.on(openModalEv, () => true);
$modalOpen.on(closeModalEv, () => false);

$users.on(localGetUsersFx.doneData, (_, payload) => payload.users);

$users.on(requestEv, (users, payload) =>
	users.map(user => {
		if (user.address === payload.address && user.status !== 'done' && user.status !== 'pending') {
			return {
				...user,
				status: 'pending',
			};
		}

		return user;
	})
);

$users.on(createInviteFx.done, (users, payload) =>
	users.map(user => {
		if (user.address === payload.params.receiver_addr) {
			return {
				...user,
				status: 'done',
			};
		}
		return user;
	})
);

$users.on(createInviteFx.fail, (users, payload) =>
	users.map(user => {
		if (user.address === payload.params.receiver_addr) {
			return {
				...user,
				status: undefined,
			};
		}
		return user;
	})
);

sample({
	clock: openModalEv,
	target: localGetUsersFx,
});

sample({
	clock: requestEv,
	source: sessionModel.$session,
	filter: session => !!session,
	fn: (session, receiver) => ({
		applicant_addr: (session as T_Account).address,
		receiver_addr: receiver.address,
	}),
	target: createInviteFx,
});

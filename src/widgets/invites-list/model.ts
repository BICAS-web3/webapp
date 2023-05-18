import { createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { T_Game, T_Invite, acceptInviteFx, createGameFx, declineInviteFx, getInvitesFx } from '@/shared/api';

export type T_InviteWithStatus = T_Invite & { asyncStatus?: 'pending' | 'initial' };

export const openModalEv = createEvent<void>();
export const closeModalEv = createEvent<void>();

export const acceptInviteEv = createEvent<{ id: T_Invite['id'] }>();
export const declineInviteEv = createEvent<{ id: T_Invite['id'] }>();

export const resetEv = createEvent<void>();

export const $modalOpen = createStore(false);

export const $invites = createStore<T_InviteWithStatus[]>([] as T_InviteWithStatus[]);
export const $invitesPending = getInvitesFx.pending;

export const $createdGame = createStore<T_Game['id'] | null>(null);

$modalOpen
	.on(openModalEv, () => true)
	.on(closeModalEv, () => false)
	.reset(resetEv);

$invites
	.on(getInvitesFx.doneData, (_, payload) => payload.requests)
	.on([acceptInviteEv, declineInviteEv], (invites, payload) =>
		invites.map(invite => {
			if (invite.id === payload.id) {
				return {
					...invite,
					asyncStatus: 'pending',
				};
			}

			return invite;
		})
	)
	.on([acceptInviteFx.done, declineInviteFx.done], (invites, payload) =>
		invites.filter(invite => invite.id !== payload.params.id)
	)
	.reset(resetEv);

$createdGame.on(createGameFx.doneData, (_, payload) => payload.id).reset(resetEv);

sample({
	clock: openModalEv,
	target: getInvitesFx,
});

sample({
	clock: acceptInviteEv,
	target: acceptInviteFx,
});

sample({
	clock: declineInviteEv,
	target: declineInviteFx,
});

sample({
	clock: acceptInviteFx.doneData,
	fn: ({ applicant_addr, receiver_addr }) => ({ applicant_addr, receiver_addr }),
	target: createGameFx,
});

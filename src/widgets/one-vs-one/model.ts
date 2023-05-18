import { createEvent, createStore, sample } from 'effector';
import { interval } from 'patronum';

import { sessionModel } from '@/entities/session';

import { T_Account, createRandomGameFx } from '@/shared/api';

export const startGameSearchEv = createEvent<void>();
export const stopGameSearchEv = createEvent<void>();

export const resetEv = createEvent<void>();

const startIntervalEv = createEvent<void>();
const stopIntervalEv = createEvent<void>();

const { tick } = interval({
	timeout: Math.random() * 10000,
	start: startIntervalEv,
	stop: stopIntervalEv,
});

export const $searching = createStore<boolean>(false);
export const $createdGame = createStore<number | null>(null);

$searching
	.on(startIntervalEv, () => true)
	.on(stopIntervalEv, () => false)
	.on(createRandomGameFx.doneData, () => false)
	.reset(resetEv);
$createdGame.on(createRandomGameFx.doneData, (_, payload) => payload.id).reset(resetEv);

sample({
	clock: startGameSearchEv,
	source: sessionModel.$session,
	filter: source => !!source,
	target: startIntervalEv,
});

sample({
	clock: tick,
	source: sessionModel.$session,
	fn: source => ({ applicant_addr: (source as T_Account).address }),
	target: createRandomGameFx,
});

sample({
	clock: stopGameSearchEv,
	source: createRandomGameFx.pending,
	filter: source => !source,
	target: stopIntervalEv,
});

sample({
	clock: createRandomGameFx.finally,
	target: stopIntervalEv,
});

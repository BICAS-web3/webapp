import { createEvent, createStore } from 'effector';

export const openModalEv = createEvent();

export const closeModalEv = createEvent();

export const $modalOpen = createStore(false)
	.on(openModalEv, () => true)
	.on(closeModalEv, () => false);

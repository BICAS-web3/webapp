import { createEvent, createStore } from 'effector';

export const openModalEv = createEvent();
export const closeModalEv = createEvent();

export const $modalOpen = createStore(false);

$modalOpen.on(openModalEv, () => true);
$modalOpen.on(closeModalEv, () => false);

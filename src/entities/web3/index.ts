import { createEvent, createStore, sample } from 'effector';
import { ethers } from 'ethers';

type T_Web3Provider = {
	provider: any;
	signer: any;
};

export const web3ProviderInitEv = createEvent<T_Web3Provider>();

export const web3Provider = createStore<T_Web3Provider | null>(null);

sample({
	clock: web3Provider,
	target: web3Provider,
});

import { useUnit } from 'effector-react';
import { ethers } from 'ethers';
import { FC, useEffect } from 'react';

import { readyEv } from '@/entities/session/model';
import { web3ProviderInitEv } from '@/entities/web3';

export const SessionProvider: FC = () => {
	const [ready] = useUnit([readyEv]);

	useEffect(() => {
		// @ts-ignore
		const provider = new ethers.providers.Web3Provider(window.ethereum as any);
		const signer = provider.getSigner();

		web3ProviderInitEv({ provider, signer });
		ready();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

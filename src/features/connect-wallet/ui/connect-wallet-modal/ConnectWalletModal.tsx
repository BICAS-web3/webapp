import { useUnit } from 'effector-react';
import { FC, useEffect, useState } from 'react';

import { sessionModel } from '@/entities/session';

import { signInFx, walletsApi } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { MetamaskIcon } from '@/shared/ui/icons/Metamask';
import { TailCirlceLoaderIcon } from '@/shared/ui/icons/TailCircleLoader';
import { Modal } from '@/shared/ui/modal';

import s from './ConnectWallet.module.scss';

export interface ConnectWalletModalProps {
	open?: boolean;
	setOpen: (value: boolean) => void;
}

export const ConnectWalletModal: FC<ConnectWalletModalProps> = props => {
	const { open = false, setOpen } = props;
	const [loading, setLoading] = useState(false);

	const { isAuthenticated, callSigninFx } = useUnit({
		callSigninFx: signInFx,
		isAuthenticated: sessionModel.$isAuthenticated,
	});

	const connectWallet = async () => {
		setLoading(true);

		try {
			const accounts: string[] = await walletsApi.getAccounts();

			if (accounts.length) {
				await callSigninFx({ address: accounts[0] });
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			setTimeout(() => {
				setOpen(false);
			}, 300);
		}
	}, [isAuthenticated, setOpen]);

	return (
		<Modal open={open} setOpen={setOpen} title='Welcome to NFT Play'>
			<div className={s.methods}>
				<Button
					leftIcon={loading ? <TailCirlceLoaderIcon /> : <MetamaskIcon />}
					variant='solid'
					colorScheme='apple'
					className={s.method}
					onClick={connectWallet}
				>
					Connect Metamask Wallet
				</Button>
			</div>
		</Modal>
	);
};

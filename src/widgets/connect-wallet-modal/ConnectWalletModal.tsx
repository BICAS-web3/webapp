import { connectWalletModel } from '.';
import { useUnit } from 'effector-react';
import { FC, useState } from 'react';

import { signInFx } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { MetamaskIcon } from '@/shared/ui/icons/Metamask';
import { TailCirlceLoaderIcon } from '@/shared/ui/icons/TailCircleLoader';
import { Modal } from '@/shared/ui/modal';

import s from './styles.module.scss';

export interface ConnectWalletModalProps {}

export const ConnectWalletModal: FC<ConnectWalletModalProps> = props => {
	const [loading, setLoading] = useState(false);
	const { open, close, signIn } = useUnit({
		open: connectWalletModel.$modalOpen,
		close: connectWalletModel.closeModalEv,
		signIn: signInFx,
	});

	const handleConnectClick = async () => {
		setLoading(true);
		try {
			// @ts-ignore
			const accounts = await (window.ethereum as any).request({ method: 'eth_requestAccounts' });

			if (accounts.length) {
				signIn({ address: accounts[0] });
				close();
			}
		} catch (e) {
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal open={open} setOpen={close} title='Welcome to NFT Play'>
			<div className={s.methods}>
				<Button
					variant='solid'
					colorScheme='apple'
					disabled={loading}
					leftIcon={loading ? <TailCirlceLoaderIcon /> : <MetamaskIcon />}
					className={s.method}
					onClick={handleConnectClick}
				>
					Connect Metamask Wallet
				</Button>
			</div>
		</Modal>
	);
};

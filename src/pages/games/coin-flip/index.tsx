import { getDefaultProvider } from 'ethers';
import Head from 'next/head';
import { NftProvider } from 'use-nft';

import { ConnectWalletModal } from '@/widgets/connect-wallet-modal';
import { Footer } from '@/widgets/footer';
import { GamesList } from '@/widgets/games-list';
import { Header } from '@/widgets/header';
import { InvitesList } from '@/widgets/invites-list';
import { SelectNFT } from '@/widgets/select-nft-modal';
import { CoinFlip as CoinFlipGame } from '@/widgets/coin-flip';
import { Container } from '@/shared/ui/container';

const ethersConfig = {
	provider: getDefaultProvider('matic'),
};

export default function CoinFlip() {
	return (
		<>
			<Head>
				<title>NFT Play | Coin Flip</title>
			</Head>
			<Header />
			<NftProvider fetcher={['ethers', ethersConfig]}>
				<main className='layout'>
					<div className='layout__content'>
						<Container style={{ position: 'relative', minHeight: '100%', display: 'flex', flexGrow: 1 }}>
							{/* <DunkinCaps /> */}
							<CoinFlipGame/>
						</Container>
					</div>
					<Footer />
				</main>
				<InvitesList />
				<GamesList />
				<SelectNFT />
				<ConnectWalletModal />
			</NftProvider>
		</>
	);
}

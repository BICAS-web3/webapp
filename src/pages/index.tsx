import Head from 'next/head';

import { ConnectWalletModal } from '@/widgets/connect-wallet-modal';
import { Footer } from '@/widgets/footer';
import { GameCardsRow } from '@/widgets/game-cards-row';
import { GamesList } from '@/widgets/games-list';
import { Header } from '@/widgets/header';
import { InvitesList } from '@/widgets/invites-list';
import { NFTCardsRow } from '@/widgets/nft-cards-row';

export default function Home() {
	return (
		<>
			<Head>
				<title>NFT Play | Home page</title>
			</Head>
			<Header />
			<main className='layout'>
				<div className='layout__content'>
					<GameCardsRow />
					<NFTCardsRow />
				</div>
			</main>
			<Footer />
			<InvitesList />
			<GamesList />
			<ConnectWalletModal />
		</>
	);
}

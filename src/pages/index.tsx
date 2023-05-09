import Head from 'next/head';

import { Footer } from '@/widgets/footer';
import { GameCardsRow } from '@/widgets/game-cards-row';
import { Header } from '@/widgets/header';
import { NFTCardsRow } from '@/widgets/nft-cards-row';

import { Container } from '@/shared/ui/container';

export default function Home() {
	return (
		<>
			<Head>
				<title>NFT Play | Home page</title>
			</Head>
			<Header />
			<main className='layout'>
				<div className='layout__content'>
					<Container>
						<GameCardsRow />
					</Container>
					<Container>
						<NFTCardsRow />
					</Container>
				</div>
			</main>
			<Footer />
		</>
	);
}

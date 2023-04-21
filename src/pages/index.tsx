import { Inter } from 'next/font/google';
import Head from 'next/head';

import { Footer } from '@/widgets/footer';
import { GameCards } from '@/widgets/game-cards-row';
import { Header } from '@/widgets/header';
import { NftCards } from '@/widgets/nft-cards-row';

export default function Home() {
	return (
		<>
			<Head>
				<title>NFT Play | Home page</title>
			</Head>
			<Header />
			<main>
				<GameCards />
				<NftCards />
			</main>
			<Footer />
		</>
	);
}

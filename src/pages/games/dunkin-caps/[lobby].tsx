import Head from 'next/head';

import { DunkinCaps } from '@/widgets/dunkin-caps';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { Container } from '@/shared/ui/container';

export default function DunkinCapsPage() {
	return (
		<>
			<Head>
				<title>NFT Play | Dunkin Caps</title>
			</Head>
			<Header />
			<main className='layout'>
				<div className='layout__content'>
					<Container style={{ position: 'relative', minHeight: '100%', display: 'flex', flexGrow: 1 }}>
						<DunkinCaps />
					</Container>
				</div>
				<Footer />
			</main>
		</>
	);
}
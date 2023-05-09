import Head from 'next/head';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { OnlineUsersList } from '@/widgets/online-users-list/ui';

import { OneVsOne } from '@/features/matchmaking';

import { Container } from '@/shared/ui/container';

export default function DunkinCaps() {
	return (
		<>
			<Head>
				<title>NFT Play | Dunkin Caps</title>
			</Head>
			<Header />
			<main className='layout'>
				<div className='layout__content'>
					<Container style={{ position: 'relative', minHeight: '100%', display: 'flex', flexGrow: 1 }}>
						<OneVsOne />
						<OnlineUsersList />
					</Container>
				</div>
				<Footer />
			</main>
		</>
	);
}

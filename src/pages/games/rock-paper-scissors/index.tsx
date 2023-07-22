import Head from 'next/head';

import { ConnectWalletModal } from '@/widgets/connect-wallet-modal';
import { Footer } from '@/widgets/footer';
import { GamesList } from '@/widgets/games-list';
import { Header } from '@/widgets/header';
import { InvitesList } from '@/widgets/invites-list';
import { OneVsOne } from '@/widgets/one-vs-one';
import { OnlineUsersList } from '@/widgets/online-users-list/ui';

import { Container } from '@/shared/ui/container';

export default function DunkinCaps() {
	return (
		<>
			<Head>
				<title>NFT Play | Rock-Paper-Scissors</title>
			</Head>
			<Header />
			<main className='layout'>
				<div className='layout__content'>
					<Container style={{ position: 'relative', minHeight: '100%', display: 'flex', flexGrow: 1 }}>
						<OneVsOne />
					</Container>
				</div>
				<Footer />
			</main>
			<InvitesList />
			<GamesList />
			<OnlineUsersList />
			<ConnectWalletModal />
		</>
	);
}

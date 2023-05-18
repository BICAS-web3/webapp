import { gamesListModel } from '.';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { T_Game } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { ArrowRightIcon } from '@/shared/ui/icons/ArrowRight';
import { FolderIcon } from '@/shared/ui/icons/Folder';
import { TailCirlceLoaderIcon } from '@/shared/ui/icons/TailCircleLoader';
import { SideModal } from '@/shared/ui/side-modal';
import { getTypography } from '@/shared/ui/typography';

import s from './styles.module.scss';

interface ActiveGameProps extends T_Game {
	goTo: (id: number) => void;
}

const statuses: Record<T_Game['status'], string> = {
	'0': 'canceled',
	'1': 'active',
	'2': 'pending',
	'3': 'done',
};

const ActiveGame: FC<ActiveGameProps> = props => {
	const { id, status, applicant_addr, receiver_addr, goTo } = props;

	return (
		<div className={s.game}>
			<div className={s.game__meta}>
				<div>
					<span className={s.game__status}>{statuses[status]}</span>
				</div>
				<div className={s.game__players}>
					<span className={getTypography({ variant: 'text', level: 2, color: 'alto', ellipsis: true })}>
						{applicant_addr}
					</span>
					<span className={s.game__divider}>vs</span>
					<span className={getTypography({ variant: 'text', level: 2, color: 'alto', ellipsis: true })}>
						{receiver_addr}
					</span>
				</div>
			</div>
			<div className={s.game__controls}>
				<Button colorScheme='mine-shaft' variant='ghost' shape='square' onClick={() => goTo(id)}>
					<ArrowRightIcon />
				</Button>
			</div>
		</div>
	);
};

export interface GamesListProps {}
export const GamesList: FC<GamesListProps> = props => {
	const { open, close, games, gamesPending } = useUnit({
		open: gamesListModel.$modalOpen,
		close: gamesListModel.closeModalEv,
		games: gamesListModel.$games,
		gamesPending: gamesListModel.$gamesPending,
	});

	const router = useRouter();

	return (
		<SideModal title='Active games' isOpen={open} setOpen={close}>
			{gamesPending ? (
				<div className={s.absolute}>
					<TailCirlceLoaderIcon />
				</div>
			) : (
				<ul className={s.list}>
					{games?.length ? (
						games.map(game => (
							<li key={game.id} className={s.item}>
								<ActiveGame
									{...game}
									goTo={(id: number) => {
										close();
										router.push(`/games/dunkin-caps/${id}`);
									}}
								/>
							</li>
						))
					) : (
						<div className={s.absolute}>
							<FolderIcon />
							<span className={getTypography({ variant: 'text', level: 2, color: 'dove_gray' })}>
								{"It's empty"}
							</span>
						</div>
					)}
				</ul>
			)}
		</SideModal>
	);
};

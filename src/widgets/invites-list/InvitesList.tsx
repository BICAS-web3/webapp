import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { Button } from '@/shared/ui/button';
import { CheckIcon } from '@/shared/ui/icons/Check';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { FolderIcon } from '@/shared/ui/icons/Folder';
import { TailCirlceLoaderIcon } from '@/shared/ui/icons/TailCircleLoader';
import { SideModal } from '@/shared/ui/side-modal';
import { getTypography } from '@/shared/ui/typography';

import * as model from './model';
import s from './styles.module.scss';

interface InviteCardProps extends model.T_InviteWithStatus {
	accept: (props: { id: model.T_InviteWithStatus['id'] }) => void;
	decline: (props: { id: model.T_InviteWithStatus['id'] }) => void;
}

const InviteCard: FC<InviteCardProps> = props => {
	const { id, applicant_addr, accept, decline, asyncStatus } = props;

	return (
		<div className={s.card}>
			<div className={s.card__meta}>
				<span className={getTypography({ variant: 'caption', level: 2 })}>From:</span>
				<span
					className={getTypography({ variant: 'text', level: 1 })}
					style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
				>
					{applicant_addr}
				</span>
			</div>
			<div className={s.card__controls}>
				{asyncStatus === 'pending' ? (
					<Button
						type='button'
						disabled
						variant='solid'
						shape='square'
						colorScheme='mine-shaft'
						style={{ pointerEvents: 'none' }}
					>
						<TailCirlceLoaderIcon />
					</Button>
				) : (
					<>
						<Button colorScheme='apple' shape='square' onClick={() => accept({ id })}>
							<CheckIcon />
						</Button>
						<Button colorScheme='stilleto' shape='square' onClick={() => decline({ id })}>
							<CloseIcon />
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export interface InvitesListProps {}

export const InvitesList: FC<InvitesListProps> = props => {
	const [accept, decline, close, reset, isOpen, invites, invitesPending, game] = useUnit([
		model.acceptInviteEv,
		model.declineInviteEv,
		model.closeModalEv,
		model.resetEv,
		model.$modalOpen,
		model.$invites,
		model.$invitesPending,
		model.$createdGame,
	]);

	const router = useRouter();

	useEffect(() => {
		return reset;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (game !== null) {
			router.push(`/games/dunkin-caps/${game}`);
		}
	}, [game, router]);

	return (
		<SideModal isOpen={isOpen} setOpen={close} title='Invites'>
			{invitesPending ? (
				<div className={s.absolute}>
					<TailCirlceLoaderIcon />
				</div>
			) : (
				<ul className={s.list}>
					{invites?.length ? (
						invites.map(invite => (
							<li key={invite.id} className={s.item}>
								<InviteCard {...invite} decline={decline} accept={accept} />
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

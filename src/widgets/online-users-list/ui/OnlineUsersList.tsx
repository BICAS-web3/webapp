import { useUnit } from 'effector-react';
import { FC } from 'react';

import { UserRow } from '@/entities/user';

import { Button } from '@/shared/ui/button';
import { CheckIcon } from '@/shared/ui/icons/Check';
import { FolderIcon } from '@/shared/ui/icons/Folder';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { TailCirlceLoaderIcon } from '@/shared/ui/icons/TailCircleLoader';
import { SideModal } from '@/shared/ui/side-modal';
import { getTypography } from '@/shared/ui/typography';

import * as model from '../model';

import s from './styles.module.scss';

export interface OnlineUsersListProps {}

export const OnlineUsersList: FC<OnlineUsersListProps> = props => {
	const { open, setOpen, users, pending, invite } = useUnit({
		open: model.$modalOpen,
		setOpen: model.closeModalEv,
		users: model.$users,
		pending: model.$usersPending,
		invite: model.requestEv,
	});

	return (
		<SideModal title='Users online' isOpen={open} setOpen={setOpen}>
			{pending ? (
				<div className={s.absolute}>
					<TailCirlceLoaderIcon />
				</div>
			) : (
				<ul className={s.list}>
					{users !== null && users.length ? (
						users.map(user => (
							<li key={user.id} className={s.item}>
								<UserRow
									name={user.address}
									extra={
										<Button
											variant='solid'
											colorScheme={user.status === 'done' ? 'apple' : 'mine-shaft'}
											shape='square'
											onClick={() => user.status !== 'done' && invite({ address: user.address })}
											disabled={user.status === 'pending' || user.status === 'done'}
										>
											{user.status === 'pending' && <TailCirlceLoaderIcon />}
											{user.status === 'done' && <CheckIcon />}
											{!user.status && <PlusIcon />}
										</Button>
									}
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

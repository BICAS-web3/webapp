import { FloatingFocusManager, FloatingOverlay, useFloating, useTransitionStyles } from '@floating-ui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { FC } from 'react';

import { UserRow } from '@/entities/user';

import { users } from '@/shared/data/users';
import { Button } from '@/shared/ui/button';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { getTypography } from '@/shared/ui/typography';

import * as model from '../model';

import s from './OnlineUsersList.module.scss';

export interface OnlineUsersListProps {}

export const OnlineUsersList: FC<OnlineUsersListProps> = props => {
	const { isOpen, close } = useUnit({
		isOpen: model.$modalOpen,
		close: model.closeModalEv,
	});

	const { refs, context } = useFloating({
		open: isOpen,
		onOpenChange: close,
		strategy: 'fixed',
	});

	const { isMounted, styles } = useTransitionStyles(context, {
		initial: {
			opacity: 0.01,
			transform: `translateY(200px)`,
		},
		open: {
			opacity: 1,
			transform: `translateY(0px)`,
		},
		close: {
			opacity: 0.01,
			transform: `translateY(200px)`,
		},
		duration: 300,
	});

	return isMounted ? (
		<FloatingOverlay lockScroll className={s.overlay} style={{ opacity: styles.opacity }}>
			<FloatingFocusManager context={context}>
				<div ref={refs.setFloating} className={s._} style={{ transform: styles.transform }}>
					<div className={s.header}>
						<h4 className={cn(s.title, getTypography({ variant: 'heading', level: 4 }))}>Online users</h4>
						<Button variant='outline' colorScheme='mine-shaft' onClick={close}>
							<CloseIcon />
						</Button>
					</div>
					<div className={s.body}>
						<ul className={s.list}>
							{users.map(user => (
								<li key={user.id} className={s.item}>
									<UserRow
										{...user}
										extra={
											<Button variant='solid' colorScheme='mine-shaft'>
												<PlusIcon />
											</Button>
										}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</FloatingFocusManager>
		</FloatingOverlay>
	) : null;
};

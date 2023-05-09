import { animated, easings, useTransition } from '@react-spring/web';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { FC, useEffect, useState } from 'react';

import { onlineUsersListModel } from '@/widgets/online-users-list';

import { users } from '@/shared/data/users';
import useCountdown from '@/shared/lib/use-countdown';
import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { Section } from '@/shared/ui/section';
import { StatusCircle } from '@/shared/ui/status-circle';
import { Time } from '@/shared/ui/time';

import s from './OneVsOne.module.scss';

export interface OneVsOneProps {}

export const OneVsOne: FC<OneVsOneProps> = props => {
	const {} = props;

	const { openOnlineList } = useUnit({ openOnlineList: onlineUsersListModel.openModalEv });

	const [idx, setIdx] = useState(0);
	const [searching, setSearching] = useState(false);
	const [countdownValue, countdownApi] = useCountdown({ intervalMs: 1000, isIncrement: true, countStart: 0 });
	const transitions = useTransition(idx, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 0,
		},
		onRest: (_springs, _ctrl, item) => {
			if (idx === item) {
				setIdx((idx + 1) % users.length);
			}
		},
		exitBeforeEnter: true,
		config: {
			duration: 1000,
			easing: easings.easeOutCubic,
		},
		delay: 0,
	});

	useEffect(() => {
		countdownApi[!!searching ? 'start' : 'reset']();
	}, [searching, countdownApi]);

	return (
		<Section
			title='Find your opponent'
			className={s._}
			bodyProps={{ className: s.scene }}
			extra={searching ? <Time ms={countdownValue * 1000} /> : undefined}
		>
			<div className={cn(s.grid, searching && s.grid_active)}>
				<div className={s.grid__cell}>
					<StatusCircle status='online' loading>
						{transitions((springs, item) => (
							<animated.div style={springs}>
								<Avatar name={users[item].name} image={users[item].image} className={s.avatar} />
							</animated.div>
						))}
					</StatusCircle>
				</div>
				<div className={s.grid__divider}>
					<CloseIcon />
				</div>
				<div className={s.grid__cell}>
					<div className={s.avatar}>
						<StatusCircle status={searching ? 'playing' : 'offline'}>
							<Avatar name={users[0].name} image={users[0].image} className={s.avatar} />
						</StatusCircle>
					</div>
				</div>
			</div>
			<div className={s.extra}>
				<Button
					variant='solid'
					colorScheme={searching ? 'stilleto' : 'apple'}
					className={cn(s.button, s.submit)}
					onClick={() => setSearching(prev => !prev)}
				>
					{searching ? 'Stop' : 'Search'}
				</Button>
				<Button
					variant='outline'
					className={s.button}
					leftIcon={<PlusIcon />}
					colorScheme='mine-shaft'
					onClick={openOnlineList}
				>
					Invite
				</Button>
			</div>
		</Section>
	);
};

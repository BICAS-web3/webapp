import { oneVsOneModel } from '.';
import { animated, easings, useTransition } from '@react-spring/web';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { connectWalletModel } from '@/widgets/connect-wallet-modal';
import { onlineUsersListModel } from '@/widgets/online-users-list';

import { sessionModel } from '@/entities/session';

import { users } from '@/shared/data/users';
import useCountdown from '@/shared/lib/use-countdown';
import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { PlayIcon } from '@/shared/ui/icons/Play';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { StopIcon } from '@/shared/ui/icons/Stop';
import { Section } from '@/shared/ui/section';
import { StatusCircle } from '@/shared/ui/status-circle';
import { Time } from '@/shared/ui/time';
import { ViewSpinnerTransition } from '@/shared/ui/view-spinner-transition';

import s from './styles.module.scss';

export interface OneVsOneProps {}

export const OneVsOne: FC<OneVsOneProps> = props => {
	const {} = props;

	const [openOnlineList, isAuthenticated, openLoginModal, start, stop, searching, game, reset] = useUnit([
		onlineUsersListModel.openModalEv,
		sessionModel.$isAuthenticated,
		connectWalletModel.openModalEv,
		oneVsOneModel.startGameSearchEv,
		oneVsOneModel.stopGameSearchEv,
		oneVsOneModel.$searching,
		oneVsOneModel.$createdGame,
		oneVsOneModel.resetEv,
	]);

	const [idx, setIdx] = useState(0);
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
	const router = useRouter();

	const handleSearchClick = () => {
		if (isAuthenticated) {
			searching ? stop() : start();
		} else {
			openLoginModal();
		}
	};

	const handleInviteClick = () => {
		if (isAuthenticated) {
			openOnlineList();
		} else {
			openLoginModal();
		}
	};

	useEffect(() => {
		return reset;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (game !== null) {
			router.push(`/games/dunkin-caps/${game}`);
		}
	}, [game, router]);

	useEffect(() => {
		countdownApi[!!searching ? 'start' : 'reset']();
	}, [searching, countdownApi]);

	return (
		<>
			<Section
				title='Find your opponent'
				className={s._}
				bodyProps={{ className: s.scene }}
				extra={true ? <Time ms={countdownValue * 1000} /> : undefined}
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
							<StatusCircle status={searching ? 'playing' : game ? 'playing' : 'online'}>
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
						leftIcon={searching ? <StopIcon /> : <PlayIcon />}
						onClick={handleSearchClick}
					>
						{searching ? 'Stop' : 'Play'}
					</Button>
					<Button
						variant='outline'
						className={s.button}
						leftIcon={<PlusIcon />}
						colorScheme='mine-shaft'
						onClick={handleInviteClick}
					>
						Invite
					</Button>
				</div>
			</Section>
			<ViewSpinnerTransition />
		</>
	);
};

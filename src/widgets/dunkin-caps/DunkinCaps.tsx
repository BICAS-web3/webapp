import cn from 'classnames';
import { FC, useState } from 'react';

import { InGameNFTCard, SkeletonInGameNFTCard } from '@/entities/nft/ui/molecules/in-game-card';
import { UserRow } from '@/entities/user';

import { users } from '@/shared/data/users';
import useCountdown from '@/shared/lib/use-countdown';
import { Button } from '@/shared/ui/button';
import { LongArrowLeftIcon } from '@/shared/ui/icons/LongArrowLeft';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { Section } from '@/shared/ui/section';
import { StatusCircle } from '@/shared/ui/status-circle';
import { Time } from '@/shared/ui/time';
import { getTypography } from '@/shared/ui/typography';

import { SelectNFT } from '../select-nft-for-bid-modal';

import s from './DunkinCaps.module.scss';

export interface DunkinCapsProps {}

export const DunkinCaps: FC<DunkinCapsProps> = props => {
	const {} = props;

	const [selectNFTModalOpen, setSelectNFTModalOpen] = useState(false);
	const [countdownValue, countdownApi] = useCountdown({ countStart: 60, countStop: 0, isIncrement: false });

	return (
		<Section
			className={s._}
			title='Wait for the opponents bid'
			extra={<Time ms={countdownValue * 1000} />}
			slotBefore={
				<Button colorScheme='mine-shaft' variant='ghost' leftIcon={<LongArrowLeftIcon />}>
					Exit game
				</Button>
			}
			bodyProps={{
				className: s.body,
			}}
		>
			<div className={s.board}>
				<div className={s.canvas}>
					<div className={s.cards}>
						<div className={s.cardwrapper}>
							<StatusCircle status='online' loading className={s.circle}>
								<SkeletonInGameNFTCard />
							</StatusCircle>
						</div>
						<div className={s.cardwrapper}>
							<button
								className={cn(
									s.sheettriger,
									getTypography({ variant: 'text', level: 2, color: 'dusty_gray' })
								)}
								onClick={() => setSelectNFTModalOpen(true)}
							>
								<PlusIcon className={s.sheettriger__icon} />
								<span>Select NFT</span>
							</button>
							<SkeletonInGameNFTCard />
						</div>
					</div>
					<div className={s.controls}>
						<Button variant='solid' colorScheme='apple' className={s.button}>
							Accept
						</Button>
						<Button variant='solid' colorScheme='stilleto' className={s.button}>
							Deny
						</Button>
					</div>
				</div>
				<div className={s.stats}>
					<div className={s.players}>
						<div className={s.player}>
							<UserRow {...users[0]} />
							<span className={s.player__chance}>
								<span className={getTypography({ variant: 'heading', level: 5, color: 'dusty_gray' })}>
									3.13 ETH
								</span>
								<span className={getTypography({ variant: 'heading', level: 4 })}>15.2%</span>
							</span>
						</div>
						<div className={s.player}>
							<UserRow {...users[1]} />
							<span className={s.player__chance}>
								<span className={getTypography({ variant: 'heading', level: 5, color: 'dusty_gray' })}>
									3.13 ETH
								</span>
								<span className={getTypography({ variant: 'heading', level: 4 })}>15.2%</span>
							</span>
						</div>
					</div>
					<div className={s.bank}>
						<div className={s.bank__topline}>
							<span className={getTypography({ variant: 'heading', level: 3, color: 'emperor' })}>
								Total bank:
							</span>
							<span className={getTypography({ variant: 'heading', level: 3 })}>6.23 ETH</span>
						</div>
						<div className={s.bank__bottomline}>
							<span className={getTypography({ variant: 'text', level: 1, color: 'emperor' })}>
								Commission:{' '}
							</span>
							<span className={getTypography({ variant: 'text', level: 1, color: 'dusty_gray' })}>
								~0.13 ETH
							</span>
						</div>
					</div>
				</div>
			</div>
			<SelectNFT isOpen={selectNFTModalOpen} close={() => setSelectNFTModalOpen(false)} />
		</Section>
	);
};

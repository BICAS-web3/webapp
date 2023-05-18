import { dunkinCapsModel } from '.';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import useMeasure from 'react-use/lib/useMeasure';

import { InGameNFTCard, SkeletonInGameNFTCard } from '@/entities/nft/ui/molecules/in-game-card';
import { UserRow } from '@/entities/user';

import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { TailCirlceLoaderIcon } from '@/shared/ui/icons/TailCircleLoader';
import { Section } from '@/shared/ui/section';
import { StatusCircle } from '@/shared/ui/status-circle';
import { getTypography } from '@/shared/ui/typography';
import { ViewSpinnerTransition } from '@/shared/ui/view-spinner-transition';

import { selectNftModel } from '../select-nft-modal';

import { Coinflip } from './Coinflip';
import s from './styles.module.scss';

export interface DunkinCapsProps {}

export const DunkinCaps: FC<DunkinCapsProps> = props => {
	const {} = props;

	const router = useRouter();
	const [ref, { width, height }] = useMeasure();

	const [
		approve,
		transfer,
		confirm,
		claim,
		actionPending,
		setGameId,
		game,
		players,
		selectedNFT,
		reset,
		step,
		openNftsModal,
	] = useUnit([
		dunkinCapsModel.approveEv,
		dunkinCapsModel.transferEv,
		dunkinCapsModel.confirmEv,
		dunkinCapsModel.claimEv,
		dunkinCapsModel.$actionPending,
		dunkinCapsModel.setGameId,
		dunkinCapsModel.$game,
		dunkinCapsModel.$players,
		dunkinCapsModel.$selectedNft,
		dunkinCapsModel.resetEv,
		dunkinCapsModel.$step,
		selectNftModel.openModalEv,
	]);

	useEffect(() => {
		if (router.query?.lobby) {
			setGameId(router.query.lobby as string);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	useEffect(() => {
		return reset;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Section
				className={s._}
				bodyProps={{
					className: s.body,
				}}
			>
				{/* @ts-ignore */}
				<div ref={ref} className={s.board}>
					<div className={s.canvas}>
						<div className={s.cards}>
							<div
								className={cn(
									s.cardwrapper,
									game?.winner_addr
										? game.winner_addr === players?.current.address
											? s.cardwrapper_win
											: s.cardwrapper_fail
										: null
								)}
							>
								{players?.opponent.nft ? (
									<InGameNFTCard
										hash={players.opponent.nft.contract}
										price={players.opponent.nft?.price}
										name={''}
										// @ts-ignore
										image={players.opponent.nft.image_url}
										// @ts-ignore
										selected={players.opponent.ready && game?.status > 1}
									/>
								) : (
									<StatusCircle status='online' loading className={s.circle}>
										<SkeletonInGameNFTCard />
									</StatusCircle>
								)}
							</div>
							<div
								className={cn(
									s.cardwrapper,
									game?.winner_addr
										? game.winner_addr === players?.current.address
											? s.cardwrapper_win
											: s.cardwrapper_fail
										: null
								)}
							>
								{players?.current?.nft && (
									<InGameNFTCard
										hash={players.current.nft.contract}
										price={players.current.nft?.price}
										name={''}
										// @ts-ignore
										image={players.current.nft.image_url}
										// @ts-ignore
										selected={players.current.ready && game?.status > 1}
									/>
								)}
								{selectedNFT && !players?.current?.nft && (
									<InGameNFTCard
										key={selectedNFT.tokenId}
										hash={selectedNFT.contract}
										image={selectedNFT.img_url}
										name={''}
										price={players?.current.nft?.price}
									/>
								)}
								{!selectedNFT && !players?.current.nft && (
									<>
										<button
											className={cn(
												s.sheettriger,
												getTypography({ variant: 'text', level: 2, color: 'dusty_gray' })
											)}
											onClick={openNftsModal}
										>
											<PlusIcon className={s.sheettriger__icon} />
											<span>Select NFT</span>
										</button>
										<SkeletonInGameNFTCard />
									</>
								)}
							</div>
						</div>
						{step !== 'select' && (
							<div className={s.controls}>
								{step === 'approve' && (
									<Button
										colorScheme='apple'
										variant='solid'
										leftIcon={actionPending ? <TailCirlceLoaderIcon /> : undefined}
										disabled={actionPending}
										onClick={approve}
									>
										Approve
									</Button>
								)}
								{step === 'transfer' && (
									<Button
										colorScheme='apple'
										variant='solid'
										leftIcon={actionPending ? <TailCirlceLoaderIcon /> : undefined}
										disabled={actionPending}
										onClick={transfer}
									>
										Place a bet
									</Button>
								)}
								{step === 'wait' && (
									<Button
										colorScheme='mine-shaft'
										variant='outline'
										leftIcon={<TailCirlceLoaderIcon />}
										disabled
									>
										Waiting for opponent
									</Button>
								)}
								{step === 'confirm' && (
									<Button
										colorScheme='apple'
										variant='solid'
										leftIcon={actionPending ? <TailCirlceLoaderIcon /> : undefined}
										disabled={actionPending}
										onClick={confirm}
									>
										Confirm bid
									</Button>
								)}
								{step === 'claim' && (
									<Button
										colorScheme='apple'
										variant='solid'
										leftIcon={actionPending ? <TailCirlceLoaderIcon /> : undefined}
										disabled={actionPending}
										onClick={claim}
									>
										Claim reward
									</Button>
								)}
							</div>
						)}
						{(step === 'claim' || step === 'done') && <Coinflip />}
					</div>
					<div className={s.stats}>
						<div className={s.players}>
							{[game?.applicant_addr, game?.receiver_addr]
								.filter(v => !!v)
								.map(user => (
									<div key={user} className={s.player}>
										<UserRow name={user as string} status='playing' />
									</div>
								))}
						</div>
					</div>
				</div>
				{game?.winner_addr && game?.winner_addr === players?.current.address && (
					<ReactConfetti
						style={{ pointerEvents: 'none', width, height }}
						numberOfPieces={50}
						confettiSource={{
							w: 10,
							h: 10,
							x: width / 2,
							y: height / 2,
						}}
					/>
				)}
			</Section>
			<ViewSpinnerTransition animate={!game} />
		</>
	);
};

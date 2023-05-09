import { FC } from 'react';

import { GameCard } from '@/entities/game/ui/card';

import CrushImage from '@/shared/media/games/crush.png';
import DunkinCapsImage from '@/shared/media/games/dunkin_caps.png';
import { Button } from '@/shared/ui/button';
import { ComingSoonPlaceholder } from '@/shared/ui/coming-soon-placeholder';
import { LongArrowRightIcon } from '@/shared/ui/icons/LongArrowRight';
import { Section } from '@/shared/ui/section';

import s from './GameCards.module.scss';

export interface GameCardsProps {}

export const GameCards: FC<GameCardsProps> = props => {
	return (
		<Section
			title='Mini-games'
			extra={
				<Button variant='outline' colorScheme='mine-shaft' rightIcon={<LongArrowRightIcon />}>
					More
				</Button>
			}
		>
			<div className={s._}>
				<GameCard
					href='/games/dunkin-caps'
					title='Dunkin Caps'
					description='A game where you have to beat your opponent with a chip'
					image={DunkinCapsImage}
					gradient={{
						from: '#A0FF55',
						to: 'rgba(36, 69, 9, 0.33)',
					}}
				/>
				<GameCard
					href='/games/crush'
					title='Crush'
					description='A game where you have to pick up your bet at the right moment'
					image={CrushImage}
					gradient={{
						from: '#FF5569',
						to: 'rgba(69, 9, 16, 0.33)',
					}}
				/>
			</div>
		</Section>
	);
};

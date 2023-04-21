import cn from 'classnames';
import { FC } from 'react';
import { useBlazeSlider } from 'react-blaze-slider';

import { NFTCard } from '@/entities/nft/ui/molecules/card';

import { nfts } from '@/shared/data/nfts';
import { Button } from '@/shared/ui/button';
import { ArrowRightIcon } from '@/shared/ui/icons/ArrowRight';
import { Section } from '@/shared/ui/section';

import s from './NftCards.module.scss';

export interface NftCardsProps {}

export const NftCards: FC<NftCardsProps> = props => {
	const {} = props;

	const ref = useBlazeSlider({
		all: {
			slidesToShow: 5,
			slidesToScroll: 5,
		},
	});

	return (
		<Section
			title='NFT Market'
			extra={
				<Button variant='outline' colorScheme='mine-shaft' rightIcon={<ArrowRightIcon />}>
					Show more
				</Button>
			}
		>
			<div className={cn(s._, 'blaze-slider')} ref={ref}>
				<div className='blaze-container'>
					<div className='blaze-track-container'>
						<div className='blaze-track'>
							{nfts.map(nft => (
								<NFTCard key={nft.id} {...nft} />
							))}
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

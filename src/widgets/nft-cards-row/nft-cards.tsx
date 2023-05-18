import useEmblaCarousel from 'embla-carousel-react';
import { FC } from 'react';

import { NFTCard } from '@/entities/nft/ui/molecules/card';

import { nfts } from '@/shared/data/nfts';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { LongArrowRightIcon } from '@/shared/ui/icons/LongArrowRight';
import { Section } from '@/shared/ui/section';

import s from './nft-cards.module.scss';

export interface NFTCardsProps {}

export const NFTCards: FC<NFTCardsProps> = props => {
	const {} = props;

	const [ref] = useEmblaCarousel({ align: 'start' });

	return (
		<Container>
			<Section
				title='NFT Market'
				extra={
					<Button variant='outline' colorScheme='mine-shaft' rightIcon={<LongArrowRightIcon />}>
						More
					</Button>
				}
			>
				<div className={s._}>
					<div className='embla' ref={ref}>
						<div className='embla__container'>
							{nfts.map(nft => (
								<div key={nft.id} className='embla__slide'>
									<NFTCard {...nft} />
								</div>
							))}
						</div>
					</div>
				</div>
			</Section>
		</Container>
	);
};

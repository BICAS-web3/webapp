import cn from 'classnames';
import { FC } from 'react';

import { InGameNFTCard, SkeletonInGameNFTCard } from '@/entities/nft';

import { BottomSheetModal } from '@/shared/ui/bottom-sheet-modal';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { getTypography } from '@/shared/ui/typography';

import s from './SelectNFT.module.scss';

export interface SelectNFTProps {
	isOpen: boolean;
	close: () => void;
}

export const SelectNFT: FC<SelectNFTProps> = props => {
	const { isOpen, close } = props;

	return (
		<BottomSheetModal title="Available NFT's" isOpen={!!isOpen} onClose={close}>
			<div className={s._}>
				<div className={s.form}>
					<div className={s.search}>
						<Input placeholder='Search' />
					</div>
					<div className={s.grid}>
						{Array.from(new Array(20).keys()).map((_, i) => (
							<div key={i} className={s.nftwrapper}>
								<SkeletonInGameNFTCard />
							</div>
						))}
					</div>
					<div className={s.extra}>
						<div className={s.stats}>
							<span className={s.stats__total}>
								<span className={getTypography({ variant: 'text', level: 1 })}>Selected: </span>
								<span className={getTypography({ variant: 'text', level: 1, color: 'alto' })}>
									5.22 ETH
								</span>
							</span>
							<span className={s.stats__fee}>
								<span className={getTypography({ variant: 'text', level: 2 })}>Fee: </span>
								<span className={getTypography({ variant: 'text', level: 2 })}>~0.13 ETH</span>
							</span>
						</div>
						<div className={s.controls}>
							<Button variant='ghost' colorScheme='mine-shaft' className={cn(s.button, s.button_clear)}>
								Clear selection
							</Button>
							<Button variant='solid' colorScheme='apple' className={cn(s.button, s.button_confirm)}>
								Place bet
							</Button>
						</div>
					</div>
				</div>
			</div>
		</BottomSheetModal>
	);
};

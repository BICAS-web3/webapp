import { selectNftModel } from '.';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { FC, useEffect, useState } from 'react';

import { InGameNFTCard } from '@/entities/nft';

import { T_Nft } from '@/shared/api';
import { abi } from '@/shared/data/abi';
import { BottomSheetModal } from '@/shared/ui/bottom-sheet-modal';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { FolderIcon } from '@/shared/ui/icons/Folder';
import { TailCirlceLoaderIcon } from '@/shared/ui/icons/TailCircleLoader';
import { getTypography } from '@/shared/ui/typography';

import s from './styles.module.scss';

export interface SelectNFTProps {}

export const SelectNFT: FC<SelectNFTProps> = props => {
	const [checked, setChecked] = useState<T_Nft>();

	const [nfts, isOpen, pending, close, selectNFTEv] = useUnit([
		selectNftModel.$nfts,
		selectNftModel.$modalOpen,
		selectNftModel.$nftsPending,
		selectNftModel.closeModalEv,
		selectNftModel.selectNftEv,
	]);

	const handleNftSelect = () => {
		if (checked) {
			selectNFTEv(checked);
			close();
		}
	};

	useEffect(() => {
		if (!isOpen) {
			setChecked(undefined);
		}
	}, [isOpen]);

	return (
		<BottomSheetModal title="Available NFT's" isOpen={isOpen} onClose={close}>
			<div className={s._}>
				<div className={s.form}>
					{pending ? (
						<div className={s.absolute}>
							<TailCirlceLoaderIcon />
						</div>
					) : (
						<>
							<div className={s.scroll}>
								<div className={s.grid}>
									{nfts?.length ? (
										nfts.map((nft, i) => (
											<InGameNFTCard
												key={nft.tokenId}
												token={nft.tokenId}
												image={nft.img_url}
												price={0}
												name=''
												hash={nft.contract}
												onCardClick={() => setChecked(nft)}
												selected={nft.tokenId === checked?.tokenId}
												extra={
													<Checkbox
														checked={checked?.tokenId === nft.tokenId}
														onChange={() => setChecked(nft)}
													/>
												}
											/>
										))
									) : (
										<div className={cn(s.absolute)}>
											<FolderIcon />
											<span
												className={getTypography({
													variant: 'text',
													level: 2,
													color: 'dove_gray',
												})}
											>
												{"It's empty"}
											</span>
										</div>
									)}
								</div>
							</div>
							<div className={s.extra}>
								<Button
									variant='solid'
									colorScheme='apple'
									className={cn(s.button, s.button_confirm)}
									onClick={handleNftSelect}
								>
									Select NFT for bet
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</BottomSheetModal>
	);
};

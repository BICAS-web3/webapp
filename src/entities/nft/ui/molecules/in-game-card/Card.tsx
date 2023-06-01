import cn from 'classnames';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { useNft } from 'use-nft';

import type { PropsOf } from '@/shared/types/props';
import { Skeleton } from '@/shared/ui/skeleton';
import { getTypography } from '@/shared/ui/typography';

import s from './Card.module.scss';

export type T_NFTMetadata = {
	description: string;
	external_url: string;
	image: string;
	name: string;
};
export interface CardProps extends PropsOf<'div'> {
	token: number;
	name: string;
	hash: string;
	price?: number;
	image?: string | StaticImageData;
	extra?: ReactElement;
	selected?: boolean;
	onCardClick?: () => void;
}

export const Card: FC<CardProps> = props => {
	const { name, hash, price, image, extra, onCardClick, selected, token } = props;

	const { nft, loading } = useNft(hash, `${token}`);

	return (
		<div className={cn(s._, selected && s.__selected)} onClick={onCardClick}>
			<div className={s.topline}>
				{!extra && !price ? (
					<Skeleton />
				) : (
					<>
						{extra}
						{!!price && (
							<span
								className={cn(s.price, getTypography({ variant: 'caption', level: 1, color: 'alto' }))}
							>
								{price} MATIC
							</span>
						)}
					</>
				)}
			</div>
			<div className={s.assets}>
				{nft?.image && nft?.imageType === 'image' && (
					<Image src={nft.image} alt={nft.description} className={s.image} />
				)}
				{nft?.image && nft.imageType === 'video' && (
					<video src={nft.image} className={s.image} controls={false} muted={true} />
				)}
				{!nft?.image || (nft.imageType === 'unknown' && <Skeleton />)}
			</div>
			<div className={s.details}>
				{nft ? (
					<>
						<span className={cn(s.name, getTypography({ variant: 'caption', level: 2, ellipsis: true }))}>
							{nft.name}
						</span>
						<span
							className={cn(s.name, getTypography({ variant: 'caption', level: 2, ellipsis: true }))}
							style={{ maxWidth: '100px' }}
						>
							{hash}
						</span>
					</>
				) : (
					<Skeleton className={cn(s.name, getTypography({ variant: 'caption', level: 2 }))} />
				)}
			</div>
		</div>
	);
};

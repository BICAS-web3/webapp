import cn from 'classnames';
import { ethers } from 'ethers';
import type { StaticImageData } from 'next/image';
import { FC, ReactElement, useEffect, useState } from 'react';
import { IpfsMedia } from 'react-ipfs-image';

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

const getNFTMetadata = async (contractAddress: string, tokenId: string) => {
	try {
		// @ts-ignore
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const contract = new ethers.Contract(
			contractAddress,
			['function tokenURI(uint256 tokenId) view returns (string)'],
			provider
		);

		const tokenURI = await contract.tokenURI(tokenId);
		const ipfsGatewayUrl = `https://ipfs.io/ipfs/${tokenURI.replace('ipfs://', '')}`;

		const response = await fetch(ipfsGatewayUrl);
		const metadata = await response.json();

		return metadata;
	} catch (e) {
		return null;
	}
};

export const Card: FC<CardProps> = props => {
	const { name, hash, price, image, extra, onCardClick, selected, token } = props;

	const [metadata, setMetadata] = useState<T_NFTMetadata | null>(null);

	useEffect(() => {
		if (hash && token) {
			getNFTMetadata(hash, `${token}`).then(setMetadata);
		}
	}, []);

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
				{metadata ? (
					<IpfsMedia hash={metadata.image} className={s.image} controls={false} muted />
				) : (
					<Skeleton />
				)}
			</div>
			<div className={s.details}>
				{metadata ? (
					<>
						<span className={cn(s.name, getTypography({ variant: 'caption', level: 2, ellipsis: true }))}>
							{metadata.name}
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

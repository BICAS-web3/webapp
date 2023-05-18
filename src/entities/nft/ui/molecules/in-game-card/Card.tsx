import cn from 'classnames';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC, ReactElement } from 'react';

import type { PropsOf } from '@/shared/types/props';
import { Skeleton } from '@/shared/ui/skeleton';
import { getTypography } from '@/shared/ui/typography';

import s from './Card.module.scss';

export interface CardProps extends PropsOf<'div'> {
	name: string;
	hash: string;
	price?: number;
	image?: string | StaticImageData;
	extra?: ReactElement;
	selected?: boolean;
	onCardClick?: () => void;
}

export const Card: FC<CardProps> = props => {
	const { name, hash, price, image, extra, onCardClick, selected } = props;

	return (
		<div className={cn(s._, selected && s.__selected)} onClick={onCardClick}>
			<div className={s.topline}>
				{!extra && !price ? (
					<Skeleton />
				) : (
					<>
						{extra}
						<span className={cn(s.price, getTypography({ variant: 'caption', level: 1, color: 'alto' }))}>
							{price} ETH
						</span>
					</>
				)}
			</div>
			<div className={s.assets}>
				{image ? <Image src={image} alt={name} className={s.image} /> : <Skeleton />}
			</div>
			<div className={s.details}>
				<span className={cn(s.name, getTypography({ variant: 'caption', level: 2, ellipsis: true }))}>
					{name}
				</span>
				<span
					className={cn(s.name, getTypography({ variant: 'caption', level: 2, ellipsis: true }))}
					style={{ maxWidth: '100px' }}
				>
					{hash}
				</span>
			</div>
		</div>
	);
};

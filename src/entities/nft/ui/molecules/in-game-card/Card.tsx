import cn from 'classnames';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';

import type { PropsOf } from '@/shared/types/props';
import { getTypography } from '@/shared/ui/typography';

import s from './Card.module.scss';

export interface CardProps extends PropsOf<'div'> {
	name: string;
	hash: string;
	price: number;
	image: string | StaticImageData;
}

export const Card: FC<CardProps> = props => {
	const { name, hash, price, image } = props;

	return (
		<div className={s._}>
			<div className={s.topline}>
				<span className={cn(s.price, getTypography({ variant: 'caption', level: 1, color: 'alto' }))}>
					{price} ETH
				</span>
			</div>
			<div className={s.assets}>
				<Image src={image} alt={name} className={s.image} />
			</div>
			<div className={s.details}>
				<span className={cn(s.name, getTypography({ variant: 'caption', level: 2 }))}>{name}</span>
				<span className={cn(s.name, getTypography({ variant: 'caption', level: 2 }))}>{hash}</span>
			</div>
		</div>
	);
};

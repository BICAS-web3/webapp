import cn from 'classnames';
import { FC } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';
import { getTypography } from '@/shared/ui/typography';

import s from './Card.module.scss';

export interface CardProps {}

export const SkeletonCard: FC<CardProps> = props => {
	const {} = props;

	return (
		<div className={s._}>
			<div className={s.topline}>
				<Skeleton
					width='40%'
					className={cn(s.price, getTypography({ variant: 'caption', level: 1, color: 'alto' }))}
				></Skeleton>
			</div>
			<div className={s.assets}>
				<Skeleton />
			</div>
			<div className={s.details}>
				<Skeleton className={cn(s.name, getTypography({ variant: 'caption', level: 2 }))} />
			</div>
		</div>
	);
};

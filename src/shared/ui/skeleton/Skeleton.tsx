import cn from 'classnames';
import { FC } from 'react';
import AbstractSkeleton from 'react-loading-skeleton';
import type { SkeletonProps as AbstractSkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import s from './Skeleton.module.scss';

export interface SkeletonProps extends AbstractSkeletonProps {}

export const Skeleton: FC<SkeletonProps> = props => {
	const { className, containerClassName, ...rest } = props;

	const composedClassName = cn(s._, className);

	return (
		<AbstractSkeleton
			highlightColor='var(--color-mine-shaft)'
			baseColor='var(--color-mine-shaft-darken)'
			className={composedClassName}
			containerClassName={cn(s.container, containerClassName)}
			{...rest}
		/>
	);
};

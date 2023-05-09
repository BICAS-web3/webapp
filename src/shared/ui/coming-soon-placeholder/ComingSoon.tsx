import cn from 'classnames';
import { FC } from 'react';

import type { PropsOf } from '@/shared/types/props';

import s from './ComingSoon.module.scss';

export interface ComingSoonProps extends PropsOf<'div'> {}

export const ComingSoon: FC<ComingSoonProps> = props => {
	const { className, ...rest } = props;

	return <div className={cn(s._, className)} {...rest}></div>;
};

import cn from 'classnames';
import { FC } from 'react';

import type { PropsOf } from '@/shared/types/props';

import { getTypography } from '../typography';

import s from './Time.module.scss';
import { msToTimeString } from './lib';

export interface TimeProps extends PropsOf<'span'> {
	ms: number;
}

export const Time: FC<TimeProps> = props => {
	const { ms, className, ...rest } = props;

	return (
		<span className={cn(s._, getTypography({ variant: 'heading', level: 2 }), className)} {...rest}>
			{msToTimeString(ms)}
		</span>
	);
};

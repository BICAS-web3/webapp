import cn from 'classnames';
import { FC } from 'react';

import type { PropsOf } from '@/shared/types/props';

import { ClockIcon } from '../icons/Clock';
import { getTypography } from '../typography';

import s from './styles.module.scss';

export interface ComingSoonProps extends PropsOf<'div'> {}

export const ComingSoon: FC<ComingSoonProps> = props => {
	const { className, ...rest } = props;

	return (
		<div className={cn(s._, className)} {...rest}>
			<ClockIcon />
			<span className={getTypography({ variant: 'text', level: 2, color: 'alto' })}>Processing...</span>
		</div>
	);
};

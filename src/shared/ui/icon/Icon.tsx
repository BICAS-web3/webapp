import cn from 'classnames';
import { FC } from 'react';

import { PropsOf } from '@/shared/types/props';

import s from './Icon.module.scss';

export interface IconProps extends PropsOf<'span'> {}

export const Icon: FC<IconProps> = ({ children, className, ...rest }) => {
	return (
		<span className={cn(s._, className)} {...rest}>
			{children}
		</span>
	);
};

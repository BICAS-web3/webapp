import cn from 'classnames';
import { forwardRef } from 'react';

import { PropsOf } from '@/shared/types/props';

import s from './Container.module.scss';

export interface ContainerProps extends PropsOf<'div'> {
	variant?: 'common' | 'ingame';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
	const { variant = 'common', className, children, ...rest } = props;

	return (
		<div ref={ref} className={cn(s._, s[`__v_${variant}`], className)} {...rest}>
			{children}
		</div>
	);
});

import cn from 'classnames';
import { forwardRef } from 'react';

import { PropsOf } from '@/shared/types/props';

import s from './Container.module.scss';

export interface ContainerProps extends PropsOf<'div'> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
	const { className, children, ...rest } = props;

	return (
		<div ref={ref} className={cn(s._, className)} {...rest}>
			{children}
		</div>
	);
});

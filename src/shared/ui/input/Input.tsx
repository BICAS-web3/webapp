import cn from 'classnames';
import { forwardRef } from 'react';

import type { PropsOf } from '@/shared/types/props';

import { getTypography } from '../typography';

import s from './Input.module.scss';

export interface InputProps extends PropsOf<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { className, ...rest } = props;

	return (
		<div className={s.wrapper}>
			<input
				ref={ref}
				className={cn(s._, getTypography({ variant: 'caption', level: 1 }), className)}
				{...rest}
			/>
		</div>
	);
});

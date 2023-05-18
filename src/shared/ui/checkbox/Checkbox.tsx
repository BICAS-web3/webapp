import cn from 'classnames';
import { forwardRef } from 'react';

import type { PropsOf } from '@/shared/types/props';

import { CheckIcon } from '../icons/Check';

import s from './styles.module.scss';

export interface CheckboxProps extends PropsOf<'input'> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
	const { id, name, checked, onChange, className, ...rest } = props;

	const composedClassName = cn(s._, {
		[s.__checked]: !!checked,
	});

	return (
		<span className={composedClassName}>
			<input
				ref={ref}
				id={id}
				className={cn(s.input, className)}
				checked={checked}
				onChange={onChange}
				type='checkbox'
				{...rest}
			/>
			<CheckIcon className={s.icon} />
		</span>
	);
});

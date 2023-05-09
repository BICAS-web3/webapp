import cn from 'classnames';
import { ReactElement, forwardRef } from 'react';

import { PropsOf } from '@/shared/types/props';

import { getTypography } from '../typography';

import s from './Button.module.scss';

type Variant = 'solid' | 'outline' | 'ghost';
type ColorScheme = 'apple' | 'mine-shaft' | 'stilleto';

export interface ButtonProps extends PropsOf<'button'> {
	loading?: boolean;
	variant?: Variant;
	colorScheme?: ColorScheme;
	leftIcon?: ReactElement;
	rightIcon?: ReactElement;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		variant = 'solid',
		colorScheme = 'mine-shaft',
		leftIcon,
		rightIcon,
		className,
		disabled,
		loading,
		children,
		...rest
	} = props;

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		rest.onClick?.(e);
	};

	const composedClassName = cn(s._, className, s[`__scheme_${colorScheme}`], s[`__variant_${variant}`], {
		[s.__loading]: !!loading,
		[s.__disabled]: !!loading || !disabled,
	});

	return (
		<button ref={ref} className={composedClassName} onClick={handleClick} {...rest}>
			{!!leftIcon && <span className={cn(s.icon, s.icon_left)}>{leftIcon}</span>}
			<span className={cn(s.content, getTypography({ variant: 'text', level: 2, color: 'inherit' }))}>
				{children}
			</span>
			{!!rightIcon && <span className={cn(s.icon, s.icon_right)}>{rightIcon}</span>}
		</button>
	);
});

import cn from 'classnames';

import s from './Typography.module.scss';

interface TypographyProps {
	variant: 'heading' | 'caption' | 'text';
	level?: number;
	color?: 'alto' | 'dusty_gray' | 'dove_gray' | 'emperor' | 'inherit';
}

export const getTypography = ({ variant, level = 1, color }: TypographyProps): string =>
	cn(s._, s[`__${variant}`], s[`__${variant}_${level}`], color && s[`__color_${color}`]);

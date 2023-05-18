import cn from 'classnames';

import s from './styles.module.scss';

interface TypographyProps {
	variant: 'heading' | 'caption' | 'text';
	level?: number;
	color?: 'alto' | 'dusty_gray' | 'dove_gray' | 'emperor' | 'inherit';
	ellipsis?: boolean;
}

export const getTypography = ({ variant, level = 1, color, ellipsis }: TypographyProps): string =>
	cn(s._, s[`__${variant}`], s[`__${variant}_${level}`], color && s[`__color_${color}`], ellipsis && s.__ellipsis);

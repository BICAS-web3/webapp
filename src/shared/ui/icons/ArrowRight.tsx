import { FC } from 'react';

import { PropsOf } from '@/shared/types/props';

import { Icon } from '../icon/Icon';

export const ArrowRightIcon: FC<PropsOf<'span'>> = ({ children, ...rest }) => (
	<Icon {...rest}>
		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
		</svg>
	</Icon>
);

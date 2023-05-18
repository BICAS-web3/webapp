import { FC } from 'react';

import { PropsOf } from '@/shared/types/props';

import { Icon } from '../icon/Icon';

export const ClockIcon: FC<PropsOf<'span'>> = ({ children, ...rest }) => (
	<Icon {...rest}>
		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
		</svg>
	</Icon>
);

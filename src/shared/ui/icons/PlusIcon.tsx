import { FC } from 'react';

import { PropsOf } from '@/shared/types/props';

import { Icon } from '../icon/Icon';

export const PlusIcon: FC<PropsOf<'span'>> = ({ children, ...rest }) => (
	<Icon {...rest}>
		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
		</svg>
	</Icon>
);

import { FC } from 'react';

import { PropsOf } from '@/shared/types/props';

import { Icon } from '../icon/Icon';

export const StopIcon: FC<PropsOf<'span'>> = ({ children, ...rest }) => (
	<Icon {...rest}>
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z'
				clipRule='evenodd'
			/>
		</svg>
	</Icon>
);

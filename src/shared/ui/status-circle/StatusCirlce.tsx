import { useId } from '@floating-ui/react';
import cn from 'classnames';
import { FC } from 'react';

import { PropsOf } from '@/shared/types/props';

import s from './StatusCircle.module.scss';

export interface StatusCircleProps extends PropsOf<'svg'> {
	status: 'playing' | 'online' | 'offline';
	loading?: boolean;
}

export const StatusCircle: FC<StatusCircleProps> = props => {
	const { status = 'offline', children, loading = false, className, ...rest } = props;

	const id = useId();

	const composedClassName = cn(s.circle, s[`circle_status_${status}`], loading && s.circle_loading, className);

	return (
		<div className={s._}>
			<svg
				id={`status-cirlce-${id}`}
				width='82'
				height='82'
				viewBox='0 0 82 82'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className={composedClassName}
				{...rest}
			>
				<circle cx='50%' cy='50%' r='47%' stroke={`url(#status-sircle-${id}-linear)`} stroke-width='5%' />
				<defs>
					<linearGradient
						id={`status-sircle-${id}-linear`}
						x1='0'
						y1='0'
						x2='82'
						y2='82'
						gradientUnits='userSpaceOnUse'
					>
						<stop stop-color='var(--status-color)' />
						<stop offset='1' stop-color='var(--status-color)' stop-opacity={loading ? 0 : 1} />
					</linearGradient>
				</defs>
			</svg>

			{children}
		</div>
	);
};

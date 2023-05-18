import cn from 'classnames';
import { StaticImageData } from 'next/image';
import { FC, ReactElement } from 'react';

import { Avatar } from '@/shared/ui/avatar';
import { StatusCircle } from '@/shared/ui/status-circle';
import { getTypography } from '@/shared/ui/typography';

import s from './UserRow.module.scss';

export interface UserRowProps {
	name: string;
	status?: 'online' | 'offline' | 'playing';
	image?: StaticImageData | string;
	extra?: ReactElement;
}

export const UserRow: FC<UserRowProps> = props => {
	const { name, status, image, extra } = props;

	return (
		<div className={s._}>
			<div className={s.assets}>
				{!!status ? (
					<StatusCircle status={status}>
						<Avatar name={name} image={image} />
					</StatusCircle>
				) : (
					<Avatar name={name} image={image} />
				)}
			</div>
			<div className={s.details}>
				<span className={cn(s.name, getTypography({ variant: 'heading', level: 5, color: 'dusty_gray' }))}>
					{name}
				</span>
				{!!status && (
					<span className={cn(s.status, getTypography({ variant: 'caption', level: 1, color: 'dove_gray' }))}>
						{status}
					</span>
				)}
			</div>
			{!!extra && <div className={s.extra}>{extra}</div>}
		</div>
	);
};

import cn from 'classnames';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

import { PropsOf } from '@/shared/types/props';

import s from './Avatar.module.scss';

export interface AvatarProps extends PropsOf<'div'> {
	image: string | StaticImageData;
	name?: string;
}

export const Avatar: FC<AvatarProps> = props => {
	const { name = '', image, className } = props;

	return (
		<div className={cn(s._, className)}>
			<Image src={image} alt={name} className={s.image} />
		</div>
	);
};

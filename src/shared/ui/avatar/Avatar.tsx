import cn from 'classnames';
import Image, { StaticImageData } from 'next/image';
import { FC, useState } from 'react';

import { nfts } from '@/shared/data/nfts';
import { PropsOf } from '@/shared/types/props';

import { Skeleton } from '../skeleton';

import s from './Avatar.module.scss';

export interface AvatarProps extends PropsOf<'div'> {
	image?: string | StaticImageData;
	name?: string;
}

export const Avatar: FC<AvatarProps> = props => {
	const { name = '', image, className } = props;

	const [loaded, setLoaded] = useState(false);
	const [selectedImage, setImage] = useState(image || nfts[Math.floor(Math.random() * (nfts.length - 1))].image);

	return (
		<div className={cn(s._, className)}>
			<Image src={selectedImage} alt={name} className={s.image} onLoadingComplete={() => setLoaded(true)} />
		</div>
	);
};

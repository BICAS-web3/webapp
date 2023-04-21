import cn from 'classnames';
import Image, { StaticImageData } from 'next/image';
import { CSSProperties, FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArrowRightIcon } from '@/shared/ui/icons/ArrowRight';

import s from './Card.module.scss';

export interface CardProps {
	title: string;
	description: string;
	href: string;
	image: StaticImageData | string;
	online: number;
	gradient: { from: string; to: string };
}
export const Card: FC<CardProps> = props => {
	const { title, description, href, image, online, gradient } = props;
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={s._} style={{ '--from': gradient.from, '--to': gradient.to } as CSSProperties}>
			<div className={s.content}>
				<div className={s.meta}>
					<h4 className={s.title}>
						{title}
						<ArrowRightIcon />
					</h4>
					<p className={s.description}>{description}</p>
				</div>
				<div className={s.extra}></div>
			</div>
			{!loaded && <Skeleton containerClassName={s.skeleton} borderRadius={0} height='100%' />}
			<Image
				src={image}
				className={cn(s.image, loaded && s.image_loaded)}
				alt={title}
				onLoadingComplete={() => setTimeout(() => setLoaded(true), 500)}
			/>
		</div>
	);
};

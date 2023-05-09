import cn from 'classnames';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { CSSProperties, FC, ReactElement, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArrowRightIcon } from '@/shared/ui/icons/ArrowRight';
import { LongArrowRightIcon } from '@/shared/ui/icons/LongArrowRight';
import { getTypography } from '@/shared/ui/typography';

import s from './Card.module.scss';

export interface CardProps {
	title: string;
	description: string;
	href: string;
	image: StaticImageData | string;
	gradient: { from: string; to: string };
	children?: ReactElement;
}

export const Card: FC<CardProps> = props => {
	const { title, description, href, image, gradient, children } = props;
	const [loaded, setLoaded] = useState(false);

	const LinkTag = href ? Link : 'a';

	return (
		<div className={s._} style={{ '--from': gradient.from, '--to': gradient.to } as CSSProperties}>
			<div className={s.content}>
				<div className={s.meta}>
					<LinkTag {...{ href }} className={s.overlaylink}>
						<h4 className={cn(s.title, getTypography({ variant: 'heading', level: 2 }))}>
							{title}
							<LongArrowRightIcon className={s.navigationicon} />
						</h4>
					</LinkTag>
					<p className={cn(s.description, getTypography({ variant: 'text', level: 2, color: 'alto' }))}>
						{description}
					</p>
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
			{!!children && children}
		</div>
	);
};

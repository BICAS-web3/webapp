import cn from 'classnames';
import Image, { StaticImageData } from 'next/image';
import { title } from 'process';
import { ReactElement, forwardRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { PropsOf } from '@/shared/types/props';

import s from './Card.module.scss';

export interface CardProps extends PropsOf<'div'> {
	name: string;
	hash: string;
	price: number;
	image: string | StaticImageData;
	context?: ReactElement;
}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
	const [loaded, setLoaded] = useState(false);

	const { name, hash, price, image, context, className, ...rest } = props;

	const composedClassName = cn(s._, className);

	return (
		<div ref={ref} className={composedClassName}>
			<div className={s.assets}>
				{!loaded && <Skeleton containerClassName={s.skeleton} height='100%' borderRadius={0} />}
				<Image
					alt={name}
					src={image}
					className={cn(s.image, loaded && s.image_loaded)}
					onLoadingComplete={() => setTimeout(() => setLoaded(true), 500)}
				/>
			</div>
			<div className={s.details}>
				<div className={s.topline}>
					<span className={s.title}>{name}</span>
					<span className={s.hash}>{hash}</span>
				</div>
				<div className={s.bottomline}>
					<span className={s.price}>{price}</span>
					{!!context && context}
				</div>
			</div>
		</div>
	);
});

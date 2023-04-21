import cn from 'classnames';
import { FC, ReactElement } from 'react';

import { PropsOf } from '@/shared/types/props';

import { Container } from '../container';

import s from './Section.module.scss';

export interface SectionProps extends PropsOf<'section'> {
	extra?: ReactElement;
	title?: string;
}

export const Section: FC<SectionProps> = props => {
	const { title, className, children, extra, ...rest } = props;

	const composedClassName = cn(s._, className);

	return (
		<section className={composedClassName} {...rest}>
			<Container>
				<div className={s.head}>
					<div className={s.meta}>
						<h2 className={s.title}>{title}</h2>
					</div>
					{!!extra && <div className={s.extra}>{extra}</div>}
				</div>
				<div className={s.body}>{children}</div>
			</Container>
		</section>
	);
};

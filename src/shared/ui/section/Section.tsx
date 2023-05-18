import cn from 'classnames';
import { FC, ReactElement } from 'react';

import { PropsOf } from '@/shared/types/props';

import { getTypography } from '../typography';

import s from './Section.module.scss';

export interface SectionProps extends PropsOf<'section'> {
	extra?: ReactElement;
	slotBefore?: ReactElement;
	title?: string;
	bodyProps?: PropsOf<'div'>;
}

export const Section: FC<SectionProps> = props => {
	const { title, slotBefore, className, children, extra, bodyProps, ...rest } = props;
	const { className: bodyClassName, ...bodyRest } = bodyProps || ({} as PropsOf<'div'>);

	const composedClassName = cn(s._, className);

	return (
		<section className={composedClassName} {...rest}>
			<div className={s.head}>
				{!!slotBefore && <div className={s.before}>{slotBefore}</div>}
				<div className={s.meta}>
					<div className={s.title}>
						<h2 className={getTypography({ variant: 'heading', level: 2, ellipsis: true })}>{title}</h2>
					</div>
					{!!extra && <div className={s.extra}>{extra}</div>}
				</div>
			</div>
			<div className={cn(s.body, bodyClassName)} {...bodyRest}>
				{children}
			</div>
		</section>
	);
};

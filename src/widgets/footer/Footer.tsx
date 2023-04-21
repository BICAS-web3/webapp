import cn from 'classnames';
import { FC } from 'react';

import { Container } from '@/shared/ui/container';

import s from './Footer.module.scss';

export interface FooterProps {}

export const Footer: FC<FooterProps> = props => {
	return (
		<footer className={s._}>
			<Container className={s.inner}>
				<div className={s.socials}></div>
				<div className={s.following}></div>
			</Container>
		</footer>
	);
};

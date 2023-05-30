import cn from 'classnames';
import { FC } from 'react';

import { Container } from '@/shared/ui/container';

import s from './Footer.module.scss';

export interface FooterProps {}

export const Footer: FC<FooterProps> = props => {
	return (
		<footer className={s._}>
			<Container className={s.inner}>
				<div className={s.column}>
					<span className={s.company}>BSC METAVERSE LIMITED</span>
					<span className={s.address}>Suite 305, Griffith Corporate Centre</span>
					<span className={s.mailing}>P.O. Box 1510, Beachmont Kingstown St. Vincent and the Grenadines</span>
					<span className={s.number}>26818 BC 2022</span>
				</div>
			</Container>
		</footer>
	);
};

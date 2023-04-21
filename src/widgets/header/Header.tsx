import cn from 'classnames';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { LoginIcon } from '@/shared/ui/icons/LogIn';

import s from './Header.module.scss';

const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState<'down' | 'initial' | 'up'>();

	useEffect(() => {
		let lastScrollY = window.pageYOffset;

		const updateScrollDirection = () => {
			const scrollY = window.pageYOffset;
			const direction = scrollY > lastScrollY ? 'down' : 'up';

			if (window.scrollY < 100) {
				setScrollDirection('initial');
			} else if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
				setScrollDirection(direction);
			}
			lastScrollY = scrollY > 0 ? scrollY : 0;
		};
		window.addEventListener('scroll', updateScrollDirection);
		return () => {
			window.removeEventListener('scroll', updateScrollDirection);
		};
	}, [scrollDirection]);

	return scrollDirection;
};

export interface HeaderProps {}

export const Header: FC<HeaderProps> = props => {
	const scrollDirection = useScrollDirection();

	return (
		<header
			className={s._}
			style={{ transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)' }}
		>
			<Container className={s.inner}>
				<Link href='/' className={s.logo}>
					<span className={s.logo__label}>NFT Play</span>
					<span className={s.logo__icon}>
						<svg width='17' height='31' viewBox='0 0 17 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M5.4222 0.87843C5.64688 1.24745 5.52546 1.72609 5.151 1.9475L1.5814 4.05816V26.966L4.3711 28.7988L11.4651 24.6042V20.8517L9.09302 19.6828V23.0973C9.09302 23.5277 8.73902 23.8766 8.30233 23.8766C7.86563 23.8766 7.51163 23.5277 7.51163 23.0973V18.4221C7.51163 18.152 7.65352 17.9012 7.88663 17.7592C8.11974 17.6172 8.41083 17.6043 8.65594 17.7251L12.6094 19.6731C12.8773 19.8051 13.0465 20.0749 13.0465 20.3701V25.0454C13.0465 25.3191 12.9008 25.5727 12.6626 25.7136L4.75565 30.3888C4.49363 30.5438 4.16448 30.5361 3.91024 30.369L0.352098 28.0314C0.132126 27.8869 0 27.6436 0 27.383V3.61698C0 3.34327 0.145725 3.08963 0.383887 2.94881L4.33738 0.611161C4.71183 0.389749 5.19753 0.509409 5.4222 0.87843ZM11.849 1.00077C12.0994 0.852711 12.4122 0.852711 12.6626 1.00077L16.6161 3.33841C16.8543 3.47923 17 3.73287 17 4.00658V12.9676C17 13.2281 16.8679 13.4714 16.6479 13.6159L13.0898 15.9535C12.7264 16.1923 12.2355 16.0955 11.9933 15.7374C11.751 15.3794 11.8492 14.8956 12.2126 14.6569L15.4186 12.5505V4.44777L12.2558 2.57765L5.13953 6.78541V25.435C5.13953 25.8653 4.78553 26.2142 4.34884 26.2142C3.91215 26.2142 3.55814 25.8653 3.55814 25.435V6.34423C3.55814 6.07052 3.70386 5.81688 3.94203 5.67606L11.849 1.00077ZM12.6867 6.08047C12.9111 6.2242 13.0465 6.47007 13.0465 6.73383V11.0195C13.0465 11.3147 12.8773 11.5845 12.6094 11.7165L8.65594 13.6645C8.26535 13.857 7.7904 13.7009 7.5951 13.316C7.39981 12.9311 7.55813 12.4631 7.94872 12.2706L11.4651 10.5379V7.93286L9.01881 9.00432C8.61975 9.1791 8.15248 9.00199 7.97513 8.60873C7.79777 8.21548 7.97749 7.75499 8.37654 7.58021L11.9347 6.02178C12.1793 5.91465 12.4622 5.93674 12.6867 6.08047ZM16.2093 16.8636C16.646 16.8636 17 17.2125 17 17.6428V27.383C17 27.6567 16.8543 27.9104 16.6161 28.0512L12.6626 30.3888C12.2882 30.6103 11.8025 30.4906 11.5778 30.1216C11.3531 29.7526 11.4745 29.2739 11.849 29.0525L15.4186 26.9418V17.6428C15.4186 17.2125 15.7726 16.8636 16.2093 16.8636Z'
								fill='currentColor'
							/>
						</svg>
					</span>
				</Link>
				<nav className={s.navigation}>
					<Link href='/' className={s.link}>
						Home
					</Link>
					<Link href='/' className={s.link}>
						Mini-Games
					</Link>
					<Link href='/' className={s.link}>
						NFT Market
					</Link>
				</nav>
				<Button
					variant='solid'
					colorScheme='apple'
					onClick={() => console.log('click')}
					leftIcon={<LoginIcon />}
				>
					Connect Wallet
				</Button>
			</Container>
		</header>
	);
};

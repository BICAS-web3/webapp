import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import { FC } from 'react';

const googleManropeFont = Manrope({
	weight: ['400', '500', '600'],
	variable: '--font-google-manrope',
	subsets: ['cyrillic', 'latin'],
});

const localTTTravelsFont = localFont({
	src: [
		{
			path: './TT_Travels/regular.otf',
			style: 'normal',
			weight: '400',
		},
		{
			path: './TT_Travels/medium.otf',
			style: 'normal',
			weight: '500',
		},
		{
			path: './TT_Travels/semibold.otf',
			style: 'normal',
			weight: '600',
		},
		{
			path: './TT_Travels/bold.otf',
			style: 'normal',
			weight: '700',
		},
	],
	variable: '--font-local-tt-travels',
});

export const Fonts: FC = () => (
	<style jsx global>
		{`
			:root {
				--font-manrope: ${googleManropeFont.style.fontFamily};
				--font-tt-travels: ${localTTTravelsFont.style.fontFamily};
			}
		`}
	</style>
);

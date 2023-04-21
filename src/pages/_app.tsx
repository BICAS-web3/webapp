import 'blaze-slider/dist/blaze.css';
import type { AppProps } from 'next/app';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Fonts } from '@/shared/fonts';
import '@/shared/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SkeletonTheme highlightColor='var(--color-mine-shaft)' baseColor='var(--color-mine-shaft-darken)'>
			<Fonts />
			<Component {...pageProps} />
		</SkeletonTheme>
	);
}

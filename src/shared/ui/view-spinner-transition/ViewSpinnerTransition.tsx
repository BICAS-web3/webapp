import { useFloating, useTransitionStyles } from '@floating-ui/react';
import { FC, useEffect, useState } from 'react';

import { TailCirlceLoaderIcon } from '../icons/TailCircleLoader';

import s from './styles.module.scss';

export interface ViewSpinnerTransitionProps {
	animate?: boolean;
}

export const ViewSpinnerTransition: FC<ViewSpinnerTransitionProps> = props => {
	const { animate } = props;

	const [open, setOpen] = useState(animate ?? true);

	const { context, refs } = useFloating({
		open,
	});

	const { isMounted, styles } = useTransitionStyles(context, {
		initial: { opacity: 1 },
		open: {
			opacity: 1,
		},
		close: {
			opacity: 0,
		},
	});

	useEffect(() => {
		if (!Object.hasOwn(props, 'animate')) {
			setTimeout(() => {
				setOpen(false);
			}, Math.random() * 5000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (animate !== undefined) {
			setOpen(animate);
		}
	}, [animate]);

	return isMounted ? (
		<div ref={refs.setFloating} className={s._} style={styles}>
			<TailCirlceLoaderIcon />
		</div>
	) : null;
};

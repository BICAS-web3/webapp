import {
	FloatingFocusManager,
	autoPlacement,
	offset,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useTransitionStyles,
} from '@floating-ui/react';
import cn from 'classnames';
import { FC, useState } from 'react';

import { PropsOf } from '@/shared/types/props';
import { Button } from '@/shared/ui/button';
import { InfoIcon } from '@/shared/ui/icons/Info';
import { getTypography } from '@/shared/ui/typography';

import s from './styles.module.scss';

export interface HowToPopupProps extends PropsOf<'div'> {}

export const HowToPopup: FC<HowToPopupProps> = ({ className, children, ...rest }) => {
	const [open, setOpen] = useState<boolean>(false);

	const { refs, context, x, y } = useFloating({
		open,
		onOpenChange: setOpen,
		middleware: [
			offset({
				mainAxis: 16,
			}),
			autoPlacement({
				crossAxis: true,
				alignment: 'end',
				allowedPlacements: ['bottom-start', 'bottom-end'],
			}),
		],
	});

	const hover = useHover(context);
	const click = useClick(context);
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, dismiss]);

	const { isMounted, styles } = useTransitionStyles(context, {
		initial: {
			opacity: 0,
			transform: `translateY(50px)`,
		},
		open: {
			opacity: 1,
			transform: `translateY(0px)`,
		},
		close: {
			opacity: 0,
			transform: `translateY(50px)`,
		},
	});

	return (
		<div className={cn(s._, className)} {...rest}>
			<Button shape='square' variant='ghost' ref={refs.setReference} {...getReferenceProps()}>
				<InfoIcon />
			</Button>
			{isMounted && (
				<FloatingFocusManager context={context}>
					<div
						ref={refs.setFloating}
						className={s.popup}
						style={{
							top: y ?? 0,
							left: x ?? 0,
							...styles,
						}}
						{...getFloatingProps()}
					>
						<p className={getTypography({ variant: 'text', level: 2, color: 'dove_gray' })}>{children}</p>
					</div>
				</FloatingFocusManager>
			)}
		</div>
	);
};

import { FloatingFocusManager, FloatingOverlay, useFloating, useTransitionStyles } from '@floating-ui/react';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';

import { Button } from '@/shared/ui/button';
import { getTypography } from '@/shared/ui/typography';

import { CloseIcon } from '../icons/CloseIcon';

import s from './SideModal.module.scss';

export interface SideModalProps extends PropsWithChildren {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	title: string;
}

export const SideModal: FC<SideModalProps> = props => {
	const { isOpen, setOpen, title, children } = props;

	const { refs, context } = useFloating({
		open: isOpen,
		onOpenChange: setOpen,
		strategy: 'fixed',
	});

	const { isMounted, styles } = useTransitionStyles(context, {
		initial: {
			opacity: 0.01,
			transform: `translateY(200px)`,
		},
		open: {
			opacity: 1,
			transform: `translateY(0px)`,
		},
		close: {
			opacity: 0.01,
			transform: `translateY(200px)`,
		},
		duration: 300,
	});

	return isMounted ? (
		<FloatingOverlay lockScroll className={s.overlay} style={{ opacity: styles.opacity }}>
			<FloatingFocusManager context={context}>
				<div ref={refs.setFloating} className={s._} style={{ transform: styles.transform }}>
					<div className={s.header}>
						<h4 className={cn(s.title, getTypography({ variant: 'heading', level: 4 }))}>{title}</h4>
						<Button variant='ghost' colorScheme='mine-shaft' shape='square' onClick={() => setOpen(false)}>
							<CloseIcon />
						</Button>
					</div>
					<div className={s.body}>{children}</div>
				</div>
			</FloatingFocusManager>
		</FloatingOverlay>
	) : null;
};

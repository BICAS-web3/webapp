import {
	FloatingFocusManager,
	FloatingOverlay,
	FloatingPortal,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useRole,
	useTransitionStyles,
} from '@floating-ui/react';
import cn from 'classnames';
import { FC, ReactElement, useId } from 'react';

import { Container } from '../container';
import { CloseIcon } from '../icons/CloseIcon';
import { getTypography } from '../typography';

import s from './Modal.module.scss';

export interface ModalProps {
	open?: boolean;
	title?: string;
	setOpen: (open: boolean) => void;
	children?: ReactElement | Function;
}

export const Modal: FC<ModalProps> = props => {
	const { title, open = false, setOpen, children } = props;

	const labelId = useId();
	const descriptionId = useId();

	const { refs, context } = useFloating({
		open,
		onOpenChange: setOpen,
		strategy: 'fixed',
	});

	const click = useClick(context);
	const dismiss = useDismiss(context, {
		outsidePressEvent: 'mousedown',
	});

	const role = useRole(context);

	const { getFloatingProps } = useInteractions([click, dismiss, role]);

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
	});

	const renderChildren = () => {
		return typeof children === 'function' ? children({ open, setOpen }) : children;
	};

	return isMounted ? (
		<FloatingPortal>
			<FloatingOverlay lockScroll style={{ opacity: styles.opacity }} className={s.overlay}>
				<FloatingFocusManager context={context}>
					<Container className={s.container}>
						<div
							ref={refs.setFloating}
							aria-labelledby={labelId}
							aria-describedby={descriptionId}
							{...getFloatingProps()}
							style={{ transform: styles.transform }}
							className={s._}
						>
							<div className={s.content}>
								<button type='button' className={s.close} onClick={() => setOpen(false)}>
									<CloseIcon />
								</button>
								{!!title && (
									<div className={s.header}>
										<h4 className={cn(s.title, getTypography({ variant: 'heading', level: 2 }))}>
											{title}
										</h4>
									</div>
								)}
								<div className={s.body}>{renderChildren()}</div>
							</div>
						</div>
					</Container>
				</FloatingFocusManager>
			</FloatingOverlay>
		</FloatingPortal>
	) : null;
};

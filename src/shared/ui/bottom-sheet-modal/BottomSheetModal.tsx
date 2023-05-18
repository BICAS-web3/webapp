import { FC, ReactElement } from 'react';
import Sheet from 'react-modal-sheet';

import { Button } from '../button';
import { CloseIcon } from '../icons/CloseIcon';
import { getTypography } from '../typography';

import s from './styles.module.scss';

export interface BottomSheetModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children?: ReactElement | ReactElement[];
}

export const BottomSheetModal: FC<BottomSheetModalProps> = props => {
	const { isOpen, title, onClose, children } = props;

	return (
		<Sheet isOpen={isOpen} onClose={onClose} className={s._}>
			<Sheet.Container>
				<Sheet.Content>
					<div className={s.header}>
						<div className={s.header__meta}>
							<h4 className={getTypography({ variant: 'heading', level: 2 })}>{title}</h4>
						</div>
						<div className={s.header__extra}>
							<Button
								type='button'
								variant='ghost'
								colorScheme='mine-shaft'
								shape='square'
								style={{ color: 'var(--color-alto)' }}
								onClick={onClose}
							>
								<CloseIcon />
							</Button>
						</div>
					</div>
					<div className={s.body}>{children}</div>
				</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop className={s.backdrop} />
		</Sheet>
	);
};

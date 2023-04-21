import { FloatingFocusManager, FloatingOverlay, useFloating } from '@floating-ui/react';
import cn from 'classnames';
import { FC, Suspense, lazy } from 'react';

import { ButtonProps } from '../button';

import s from './ModalsManager.module.scss';

export interface ModalsManagerProps {}

export const ModalsManager: FC<ModalsManagerProps> = props => {
	const { context } = useFloating();

	return (
		<FloatingOverlay>
			<FloatingFocusManager context={context}>
				<div style={{ color: 'white' }}>Hello</div>
			</FloatingFocusManager>
		</FloatingOverlay>
	);
};

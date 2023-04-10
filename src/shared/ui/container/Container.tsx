import cn from 'classnames';
import { FC } from 'react';

import type { PropsOf } from '../../types';

import style from './container.module.scss';

export interface ContainerProps extends PropsOf<'div'> {}

export const Container: FC<ContainerProps> = props => {
	const { className, ...rest } = props;

	return <div className={cn(style.globalWrapper, className)} {...rest} />;
};
import { ComponentPropsWithoutRef, ElementType } from 'react';

export type As<Props = any> = ElementType<Props>;

export type PropsOf<T extends As> = ComponentPropsWithoutRef<T> & {
	as?: As;
};
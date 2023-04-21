import { ComponentPropsWithoutRef, ElementType } from 'react';

type As<Props = any> = ElementType<Props>;

export type PropsOf<T extends As> = ComponentPropsWithoutRef<T> & {
	as?: As;
};

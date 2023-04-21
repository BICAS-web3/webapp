import { forwardRef } from 'react';

export const generator = <T, K extends T>(adaptProps: T) => {
	return (BasicComponent: any) => {
		const Adapter = forwardRef<HTMLElement, K>((props, ref) => {
			return <BasicComponent ref={ref} {...props} {...adaptProps} />;
		});

		return Adapter;
	};
};

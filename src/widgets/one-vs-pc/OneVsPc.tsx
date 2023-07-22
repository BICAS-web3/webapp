import { FC, useEffect, useState } from 'react';
import { Section } from '@/shared/ui/section';
import s from '../one-vs-one/styles.module.scss';
import { ViewSpinnerTransition } from '@/shared/ui/view-spinner-transition';

export interface OneVsPcProps {
    title: string
}


export const OneVsPc: FC<OneVsPcProps> = props => {
    return(<>
        <Section
				title={props.title}
				className={s._}
				bodyProps={{ className: s.scene }}
				
			>
			</Section>
			<ViewSpinnerTransition />
		</>
    )
}
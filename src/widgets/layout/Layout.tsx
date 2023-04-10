import { FC, PropsWithChildren } from "react"

import { Header } from "../header/Header"
import { Footer } from "../footer/Footer";

import '../../shared/styles/index.scss'

export interface LayoutProps extends PropsWithChildren {}

export const Layout: FC<LayoutProps> = props => {
    const { children } = props;
    return(
        <>
            <Header/>
            <main>{children}</main>
            <Footer />
        </>
    )
}

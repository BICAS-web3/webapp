import { FC, PropsWithChildren } from "react"
import { Outlet } from "react-router-dom";

import { Header } from "../header/Header"
import { Footer } from "../footer/Footer";
import '../../shared/styles/index.scss'

export interface LayoutProps extends PropsWithChildren {}

export const Layout: FC<LayoutProps> = props => {
    return(
        <>
            <Header/>
            <main><Outlet/></main>
            <Footer />
        </>
    )
}

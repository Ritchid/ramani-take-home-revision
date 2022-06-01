import React, { ReactElement } from "react";

import Head from "../components/head";
import PageHeader from "../components/header";
import Footer from "../components/footer";
import LoadingIndicator from "../components/loadingIndicator";


interface IMainLayout {
    pageTitle: string;
    id?: string;
    navbar?: boolean;
    header?: boolean;
    children?: JSX.Element | null | undefined | ReactElement
}

function MainLayout({pageTitle, navbar, header, children, id}: IMainLayout): JSX.Element {

    return (
        <>
            <Head title={pageTitle} />

            <LoadingIndicator />
            {/* PAGE HEADER */}
            {header? <PageHeader navbar={navbar} /> : null}
            <main id={id} style={{minHeight: header? "50vh" : "88vh"}}>
                {children || null}
            </main>
            {/* PAGE FOOTER */}
            <Footer />
        </>
    )
}

export default MainLayout;
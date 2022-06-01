import React from "react";
import Head from "next/head";
import {DefaultSeo} from "next-seo";

import {SEO_CONFIGS} from "../resources/constants"


interface IHeader {
    title: string;
}

function Header({title}: IHeader): JSX.Element {

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <meta name="description" content="Ramani Take Home Test" />
                <meta name="keywords" content="Ramani, Fintech" />

                <title>{title? `${title} - ` : null}Ramani</title>
                {/* <link rel="icon" href="/logos/logo-icon.svg" /> */}
            </Head>

            {/* For SEO configurations */}
            <DefaultSeo 
                title={SEO_CONFIGS.title}
                description={SEO_CONFIGS.description}
                defaultTitle={SEO_CONFIGS.title}
            />
        </>
    )
}

export default Header;
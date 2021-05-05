import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import SiteLayout from '../containers/SiteLayout';

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const BASE_PATH = 'https://thedogeflippening.com'

    return (
        <SiteLayout>
            <Head>

                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <meta charSet="utf-8" />
                <title>The DOGE Flippening</title>
                <meta name="title" content="The DOGE Flippening" />
                <meta name="description" content="Track the Dogecoin flippening event." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={BASE_PATH} />
                <meta property="og:title" content="The DOGE Flippening" />
                <meta property="og:description" content="Track the Dogecoin flippening event." />

                <meta property="twitter:url" content={BASE_PATH} />
                <meta property="twitter:title" content="The DOGE Flippening" />
                <meta property="twitter:description" content="Track the Dogecoin flippening event." />
            </Head>
            <Component {...pageProps} />
        </SiteLayout>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};


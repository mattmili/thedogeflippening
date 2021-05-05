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

    return (
        <SiteLayout>
            <Head>
                <title>Where to buy Dogecoin?</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <Component {...pageProps} />
        </SiteLayout>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};


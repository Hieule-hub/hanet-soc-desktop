import React, { FC } from 'react';

import Head from 'next/head';

import METADATA from 'src/constants/metadata';

import Meta from './Meta';

interface Props {
    title: string;
}

const HeadShare: FC<Props> = (props) => {
    const { title = '' } = props;

    return (
        <Head>
            <title>{(title ? title + ' | ' : '') + METADATA.APP_NAME}</title>
            <Meta />
        </Head>
    );
};

export default HeadShare;

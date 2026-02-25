import React from 'react';
import { Helmet } from 'react-helmet';
import { IsSetupFor } from '../Recoil/atom';

const siteName = IsSetupFor ? "Sonasons" : "Elvee";

const MetaData = ({ title, description, canonical, keywords }) => {
    return (
        <Helmet>
            {/* Page Title */}
            {title && <title>{title}</title>}

            {/* Meta Tags */}
            {description && <meta name="description" content={description} />}
            {canonical && <link rel="canonical" href={canonical} />}
            {canonical && <meta property="og:url" content={canonical} />}
            {title && <meta property="og:title" content={title} />}
            <meta property="og:site_name" content={siteName} />
            {keywords && <meta name="keywords" content={keywords} />}
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content="website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
    );
}

export default MetaData;

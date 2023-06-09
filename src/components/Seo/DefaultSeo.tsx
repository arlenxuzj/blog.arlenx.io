import Head from 'next/head';

import { ArticleJsonLd, DefaultSeo as NextDefaultSeo } from 'next-seo';

import siteMeta from '@/configs/siteMeta';

export type DefaultSEOProps = {
  title?: string;
};

const DefaultSeo = ({ title }: DefaultSEOProps) => {
  return (
    <>
      <NextDefaultSeo
        title={title}
        titleTemplate={`%s | ${siteMeta.title}`}
        defaultTitle={siteMeta.title}
        description={siteMeta.description}
        canonical={siteMeta.url}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: siteMeta.url,
          title: title ? `${title} | ${siteMeta.title}` : `${siteMeta.title}`,
          description: siteMeta.description,
          images: [
            {
              url: `${siteMeta.url}${siteMeta.image}`,
              width: 1200,
              height: 630,
              alt: siteMeta.title
            }
          ]
        }}
        twitter={{
          handle: siteMeta.twitter,
          site: siteMeta.twitter,
          cardType: 'summary_large_image'
        }}
      />
      <Head>
        <meta name='googlebot' content='index,follow' />
        <meta name='author' content={siteMeta.author} />
        <meta name='keywords' content={siteMeta.keywords.join(',')} />
        <meta
          name='twitter:title'
          content={title ? `${title} | ${siteMeta.title}` : `${siteMeta.title}`}
        />
        <meta name='twitter:description' content={siteMeta.description} />
        <meta
          name='twitter:image'
          content={`${siteMeta.url}${siteMeta.image}`}
        />
        <meta
          name='twitter:image:alt'
          content={title ? `${title} | ${siteMeta.title}` : `${siteMeta.title}`}
        />
      </Head>
      <ArticleJsonLd
        type='Blog'
        url={siteMeta.url}
        title={siteMeta.title}
        description={siteMeta.description}
        images={[`${siteMeta.url}${siteMeta.image}`]}
        datePublished={new Date().toISOString()}
        dateModified={new Date().toISOString()}
        authorName={{
          '@type': 'Person',
          name: siteMeta.author,
          url: siteMeta.url
        }}
      />
    </>
  );
};

export default DefaultSeo;

import Head from 'next/head';

import { ArticleJsonLd, NextSeo } from 'next-seo';

import siteMeta from '@/configs/siteMeta';

export type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  tags?: string[];
};

const Seo = ({
  title,
  description,
  path,
  createdAt,
  updatedAt,
  slug,
  tags
}: SeoProps) => {
  const seo = {
    title: title ? `${title} | ${siteMeta.title}` : `${siteMeta.title}`,
    description: description || siteMeta.description,
    url: `${siteMeta.url}${path}`,
    createdAt,
    updatedAt: updatedAt || createdAt,
    imageUrl: slug
      ? `${siteMeta.url}/images/og/${slug}.png`
      : `${siteMeta.url}${siteMeta.image}`
  };

  const createdDate = seo.createdAt
    ? new Date(seo.createdAt).toISOString()
    : '';
  const updatedDate = seo.updatedAt
    ? new Date(seo.updatedAt).toISOString()
    : '';

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${siteMeta.title}`}
        defaultTitle={siteMeta.title}
        description={seo.description}
        canonical={seo.url}
        openGraph={{
          type: 'article',
          url: seo.url,
          title: seo.title,
          description: seo.description,
          article: {
            authors: [siteMeta.author],
            tags: tags,
            publishedTime: createdDate,
            modifiedTime: updatedDate
          },
          images: [
            {
              url: seo.imageUrl,
              width: 1200,
              height: 630,
              alt: seo.title
            }
          ]
        }}
      />
      <Head>
        <meta name='googlebot' content='index,follow' />
        <meta name='author' content={siteMeta.author} />
        {tags && <meta name='keywords' content={tags.join(',')} />}
        <meta name='twitter:title' content={seo.title} />
        <meta name='twitter:description' content={seo.description} />
        <meta name='twitter:image' content={seo.imageUrl} />
        <meta name='twitter:image:alt' content={seo.title} />
      </Head>
      <ArticleJsonLd
        type='BlogPosting'
        url={seo.url}
        title={seo.title}
        description={seo.description}
        images={[seo.imageUrl]}
        datePublished={createdDate}
        dateModified={updatedDate}
        authorName={{
          '@type': 'Person',
          name: siteMeta.author,
          url: siteMeta.url
        }}
      />
    </>
  );
};

export default Seo;

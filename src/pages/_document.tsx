import Document, { Head, Html, Main, NextScript } from 'next/document';

import createEmotionServer from '@emotion/server/create-instance';
import { getInitColorSchemeScript } from '@mui/material/styles';

import siteMeta from '@/configs/siteMeta';
import createEmotionCache from '@/utils/emotion';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='/fonts/inter-var-latin-italic.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='/fonts/fira-code.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='icon'
            className='js-site-favicon'
            type='image/svg+xml'
            href={siteMeta.favicons.svg.light}
          />
          <link
            rel='alternate icon'
            className='js-site-favicon'
            sizes='32x32'
            type='image/png'
            href={siteMeta.favicons.png.light}
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href={siteMeta.favicons.appleTouchIcon}
          />
          <link
            rel='mask-icon'
            href={siteMeta.favicons.maskIcon}
            color='#000000'
          />
          <link
            rel='manifest'
            href='/manifest.json'
            crossOrigin='use-credentials'
          />
          <meta name='emotion-insertion-point' content='' />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          {getInitColorSchemeScript({
            defaultMode: 'dark',
            modeStorageKey: 'mode',
            colorSchemeStorageKey: 'color-scheme',
            attribute: 'color-scheme'
          })}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        }
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags
  };
};

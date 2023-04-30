import { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { CacheProvider, type EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import Analytics from '@/components/Analytics';
import { DefaultSeo } from '@/components/Seo';
import { LayoutWrapper } from '@/components/Wrapper';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { cssVariableTheme } from '@/themes';
import createEmotionCache from '@/utils/emotion';

import '@/styles/font.css';
import '@/styles/global.css';
import '@/styles/twemoji.css';
import type {} from '@mui/material/themeCssVarsAugmentation';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  showHeaderProgressBar?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = (props: AppPropsWithLayout) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? (page => page);
  const showHeaderProgressBar = Component.showHeaderProgressBar ?? false;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <DefaultSeo />
      <Analytics />
      <CssVarsProvider
        theme={cssVariableTheme}
        defaultMode='dark'
        modeStorageKey='mode'
        colorSchemeStorageKey='color-scheme'
        attribute='color-scheme'
      >
        <CssBaseline />
        <ThemeProvider>
          <LayoutWrapper showHeaderProgressBar={showHeaderProgressBar}>
            {getLayout(<Component {...pageProps} />)}
          </LayoutWrapper>
        </ThemeProvider>
      </CssVarsProvider>
    </CacheProvider>
  );
};

export default App;

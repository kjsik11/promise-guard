import '@assets/main.css';
import 'nprogress/nprogress.css';

import { DefaultSeo } from 'next-seo';
import useNProgress from 'next-use-nprogress';
import Script from 'next/script';
import { useEffect } from 'react';

import { CommonLayout } from '@frontend/components/layout';
import { Modal, Notification } from '@frontend/components/ui';
import { useModal } from '@frontend/hooks/use-modal';
import { useNoti } from '@frontend/hooks/use-noti';

import { isProd } from '@utils/env';
import { PUBLIC_ENV } from '@utils/env/public';
import { GTM } from '@utils/tag-manager';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const Layout = (Component as any).Layout || CommonLayout;

  useNProgress({
    minimum: 0.3,
    easing: 'ease',
    speed: 500,
    showSpinner: false,
  });

  const { modal, closeModal } = useModal();
  const { noti, closeNoti } = useNoti();

  useEffect(() => {
    if (isProd()) {
      GTM.initialize(PUBLIC_ENV.NEXT_PUBLIC_GTM_ID);
    }
  }, []);

  useEffect(() => {
    if (window.Kakao) {
      window.Kakao.init(PUBLIC_ENV.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  return (
    <>
      <Script
        type="text/javascript"
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/redirectIE.js" strategy="beforeInteractive" />
      <DefaultSeo
        title="오월 십일, 대국민 공약 투표"
        description="앞으로 5년, 윤석열 정부가 꼭 지켜야 하는 공약에 투표해주세요"
        openGraph={{
          type: 'website',
          title: '오월 십일, 대국민 공약 투표',
          description: '앞으로 5년, 윤석열 정부가 꼭 지켜야 하는 공약에 투표해주세요',
          images: [
            {
              url: '/assets/open_graph.jpg',
              width: 1200,
              height: 630,
              alt: 'May10 open-graph image',
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/assets/favicon.ico',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/assets/favicon-16x16.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/assets/favicon-32x32.png',
          },
          {
            rel: 'apple-touch-icon',
            href: '/assets/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            href: '/assets/site.webmanifest',
          },
        ]}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Modal {...modal} close={closeModal} />
      <Notification {...noti} close={closeNoti} />
    </>
  );
}

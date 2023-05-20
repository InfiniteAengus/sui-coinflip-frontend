import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <link rel='icon' href='/images/sui.png' />
          <title>DeSui Coinflip</title>
          <meta name='robots' content='index,follow' />
          <meta
            name='description'
            content="Welcome to the ultimate coinflip game on the SUI chain! Test your luck with our provably fair and transparent coinflip game. Backed by the security and speed of the SUI blockchain, experience swift transactions and fair gameplay. Whether you're a seasoned gambler or new to gaming, our coinflip is easy to understand and fun to play. Join us now and flip your way to amazing rewards!"
          />

          <meta name='twitter:image' content='/images/sui.png' />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:title' content='DeSui Coinflip' />
          <meta
            name='twitter:description'
            content="Welcome to the ultimate coinflip game on the SUI chain! Test your luck with our provably fair and transparent coinflip game. Backed by the security and speed of the SUI blockchain, experience swift transactions and fair gameplay. Whether you're a seasoned gambler or new to gaming, our coinflip is easy to understand and fun to play. Join us now and flip your way to amazing rewards!"
          />

          <meta property='og:title' content='DeSui Coinflip' />
          <meta
            property='og:description'
            content="Welcome to the ultimate coinflip game on the SUI chain! Test your luck with our provably fair and transparent coinflip game. Backed by the security and speed of the SUI blockchain, experience swift transactions and fair gameplay. Whether you're a seasoned gambler or new to gaming, our coinflip is easy to understand and fun to play. Join us now and flip your way to amazing rewards!"
          />
          <meta property='og:type' content='website' />
          <meta property='og:image' content='/images/sui.png' />
          <meta property='og:image:width' content='600' />
          <meta property='og:image:height' content='600' />
          <meta property='og:locale' content='en' />
          <meta property='og:site_name' content='DeSui Coinflip' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

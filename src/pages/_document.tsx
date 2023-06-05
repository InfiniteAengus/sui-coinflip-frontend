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
            content='Welcome to the #1 coin flip game on Sui Network. Double your $SUI on our smart contract by guessing heads or tails. All results on chain for provable fairness.'
          />

          <meta name='twitter:image' content='/images/sui.png' />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:title' content='DeSui Coinflip' />
          <meta
            name='twitter:description'
            content='Welcome to the #1 coin flip game on Sui Network. Double your $SUI on our smart contract by guessing heads or tails. All results on chain for provable fairness.'
          />

          <meta property='og:title' content='DeSui Coinflip' />
          <meta
            property='og:description'
            content='Welcome to the #1 coin flip game on Sui Network. Double your $SUI on our smart contract by guessing heads or tails. All results on chain for provable fairness.'
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

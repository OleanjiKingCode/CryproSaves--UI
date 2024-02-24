import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import '../styles/globals.css';

const Id = process.env.NEXT_PUBLIC_PROJECT_ID ?? '';
const config = getDefaultConfig({
  appName: 'Crypto Saves',
  projectId: '5762313ef0525fb601da0030e0b4d60d',
  chains: [polygonMumbai],
  ssr: true,
});

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#dcaac7',
            accentColorForeground: 'white',
          })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

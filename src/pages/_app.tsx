import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
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
  projectId: Id,
  chains: [polygonMumbai],
  ssr: true,
});

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider
          theme={lightTheme({
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

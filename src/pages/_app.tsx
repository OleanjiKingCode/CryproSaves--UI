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

const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID ?? 'fe034f8d12e3ac9ceb91b6c2fa033286';
const config = getDefaultConfig({
  appName: 'Crypto Saves',
  projectId: projectId,
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

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import {
  WagmiConfig,
  createClient,
  configureChains,
} from "wagmi";
import {bscTestnet,bsc} from "wagmi/chains"
// import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getDefaultWallets, RainbowKitProvider, } from "@rainbow-me/rainbowkit";
import {  Theme } from '@rainbow-me/rainbowkit'
import moonlandSheild from '../src/components/images/moonlandSheild.svg'


// const bsc = {
//   id: 56,
//   name: "BSC Mainnet",
//   network: "Binance Smart Chain",
//   nativeCurrency: {
//     decimals: 18,
//     name: "BNB",
//     symbol: "BNB",
//   },
//   rpcUrls: {
//     default: "https://bsc-dataseed.binance.org/",
//   },
//   blockExplorers: {
//     default: { name: "BscScan", url: "https://bscscan.com" },
//   },
//   testnet: false,
// };
// const bscTest = {
//   id: 97,
//   name: "BSC Testnet",
//   network: "Binance Smart Chain Testnet",
//   nativeCurrency: {
//     decimals: 18,
//     name: "tBNB",
//     symbol: "tBNB",
//   },
//   iconUrl: "",
//   rpcUrls: {
//     default: "https://data-seed-prebsc-1-s3.binance.org:8545",
//   },
//   blockExplorers: {
//     default: { name: "BscScan TestNet", url: "https://testnet.bscscan.com" },
//   },
//   testnet: true,
// };


const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt=''
    />
  ) : (
     <img style={{boxShadow : '0px 0px 8px -2px #000', borderRadius : '50px'}} src={moonlandSheild} alt=''/>
  );
};


const myCustomTheme = {
  blurs: {
    modalOverlay: '...',
  },
  colors: {
    accentColor: '#03E1FF',
    accentColorForeground: '...',
    actionButtonBorder: '...',
    actionButtonBorderMobile: '...',
    actionButtonSecondaryBackground: '...',
    closeButton: '#fff',
    closeButtonBackground: '...',
    connectButtonBackground: '...',
    connectButtonBackgroundError: '...',
    connectButtonInnerBackground: '...',
    connectButtonText: '...',
    connectButtonTextError: '...',
    connectionIndicator: '...',
    downloadBottomCardBackground: '...',
    downloadTopCardBackground: '...',
    error: '...',
    generalBorder: '...',
    generalBorderDim: '...',
    menuItemBackground: '...',
    modalBackdrop: '#000000a3',
    modalBackground: 'linear-gradient(320deg,#EB00FF, #020021)',  
    modalBorder: '...',
    modalText: '#fff',
    modalTextDim: '#fff',
    modalTextSecondary: '#fff',
    profileAction: '...',
    profileActionHover: '...',
    profileForeground: '...',
    selectedOptionBorder: '...',
    standby: '...',
  },
  fonts: {
    body: '...',
  },
  radii: {
    actionButton: '...',
    connectButton: '...',
    menuButton: '...',
    modal: '16px',
    modalMobile: '16px',
  },
  shadows: {
    connectButton: '...',
    dialog: '0px 0px 12px -2px #000',
    profileDetailsAction: '...',
    selectedOption: '...',
    selectedWallet: '...',
    walletLogo: '...',
  },
};


const { chains,provider,webSocketProvider } = configureChains([
  bsc,bscTestnet
], [
  publicProvider(),
  // infuraProvider({apiKey:"1dddfc946d084fa883705b9a68156642"})
  jsonRpcProvider({
    priority:0,
    rpc: (chain) => {
      // console.log(chain,chain.id,chain.rpcUrls.default);
      if (chain.id !== bsc.id) return null
      return { http: "https://bsc-dataseed.binance.org/" }
    },
  }),
]);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
// polyfill Buffer for client
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider avatar={CustomAvatar} theme={myCustomTheme}  chains={chains} modalSize="compact">
            <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
import { WebSocketProvider } from './context/GameSocketContext';
import '../app/globals.css';


function MyApp({ Component, pageProps }: any) {
  return (
    <WebSocketProvider>
        <Component {...pageProps} />
    </WebSocketProvider>
);
}

export default MyApp;

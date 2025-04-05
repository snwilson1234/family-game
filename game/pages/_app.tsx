import '../app/globals.css';
import { WebSocketProvider } from './context/GameSocketContext';


function MyApp({ Component, pageProps }: any) {
  return (
    <WebSocketProvider>
        <Component {...pageProps} />
    </WebSocketProvider>
);
}

export default MyApp;

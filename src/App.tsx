import Router from "./router";
import "./css/style.css";
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Bounce, ToastContainer} from "react-toastify";
import AuthProvider from "./context/AuthContext.tsx";
import AppProvider from "./context/AppContext.tsx";
import 'dayjs/locale/vi';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import WebsocketProvider from "./context/WebsocketContext.tsx";

function App() {
    dayjs.locale('vi');
    dayjs.extend(relativeTime);
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <AppProvider>
                <AuthProvider>
                    <WebsocketProvider>
                        <Router/>
                    </WebsocketProvider>
                </AuthProvider>
            </AppProvider>
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right"/>
        </QueryClientProvider>
    )
}

export default App

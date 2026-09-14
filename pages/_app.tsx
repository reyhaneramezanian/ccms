import { useEffect, useState } from 'react';
import AppThemeProvider from 'src/provider/ThemeProvider';
import NProgress from 'nprogress';
import UserProvider, { useGetUser } from 'src/auth/UserProvider';
import SnackProvider from '@/provider/SnackProvider';
import store from '../src/redux/store/store';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SubscribeMessagesComponent from 'src/components/chat/subscription_component';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../public/css/global.css';
import 'nprogress/nprogress.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import useManageActiveResidentFlat from 'src/hooks/useManageActiveResidentFlat';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient();

const ComponentManager = ({ children }) => {
    const user = useGetUser();
    useManageActiveResidentFlat(true);

    if (user === 'LOADING') {
        return null;
    }
    return children;
};

function MyApp({ Component, pageProps }: AppProps) {
    const [isLocale, setIsLocale] = useState<boolean>(false);

    useEffect(() => {
        setIsLocale(true);
    }, []);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles) {
            jssStyles?.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Provider store={store(isLocale)}>
                    <SnackProvider>
                        <UserProvider>
                            <AppThemeProvider>
                                <ComponentManager>
                                    <Component {...pageProps} />
                                </ComponentManager>

                                <SubscribeMessagesComponent />
                            </AppThemeProvider>
                        </UserProvider>
                    </SnackProvider>
                </Provider>
            </LocalizationProvider>
        </QueryClientProvider>
    );
}

export default MyApp;

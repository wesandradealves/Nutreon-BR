'use client';

import { ThemeProvider } from 'styled-components';
import { LoaderProvider, useLoader } from '@/context/spinner';
import { AuthProvider } from '@/context/auth';
import { FavoritesProvider } from '@/context/favorites';
import { CartProvider } from '@/context/cart';
import { CartDrawerProvider } from '@/context/cartDrawer';
import Spinner from '@/components/spinner/spinner';
import StyledJsxRegistry from './registry';
import { App, GlobalStyle } from '@/app/style';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { Suspense, useRef, useState, useEffect } from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { apiClient } from '@/services/api-client';
import { Toaster } from 'react-hot-toast';
import { FavoritesSyncManager } from '@/components/auth/FavoritesSyncManager';

import { useMetadata } from '@/hooks/useMetadata';
import { theme } from '@/styles/theme';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    container: scrollRef,
  });
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((n) => {
      setScrollPosition(n);
    });
    return () => {
      unsubscribe();
    };

  }, [scrollY]);

  useMetadata({
    title: `Nutreon BR`,
    ogTitle: `Nutreon BR`
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LoaderProvider>
        <LoaderSetup />
        <AuthProvider>
          <FavoritesProvider>
            <CartDrawerProvider>
              <CartProvider>
                <Suspense fallback={<div>Loading...</div>}>
                <StyledJsxRegistry>
              <AnimatePresence
                mode="wait"
                initial={true}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <App id="primary">
                  <motion.div
                    className="min-h-screen flex flex-start flex-col"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    ref={scrollRef}
                  >
                    <Header scrollPosition={scrollPosition} />
                    {children}
                    <Footer />
                  </motion.div>
                  <Spinner />
                  <FavoritesSyncManager />
                  <Toaster 
                    position="top-center"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#363636',
                        color: '#fff',
                      },
                      success: {
                        duration: 3000,
                        iconTheme: {
                          primary: '#00e8d4',
                          secondary: '#fff',
                        },
                      },
                      error: {
                        duration: 4000,
                      },
                    }}
                  />
                </App>
              </AnimatePresence>
            </StyledJsxRegistry>
          </Suspense>
              </CartProvider>
            </CartDrawerProvider>
          </FavoritesProvider>
        </AuthProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}

function LoaderSetup() {
  const { setLoading } = useLoader();

  useEffect(() => {
    apiClient.setLoadingCallback(setLoading);
  }, [setLoading]);

  return null;
}
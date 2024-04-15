'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { store,persistor } from "@/store/store";
import { Toaster } from "@/components/ui/toaster"
import { PersistGate } from 'redux-persist/integration/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ChakraProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor!} >
                  {children}
              </PersistGate>
            <Toaster />
            </Provider>
            </ChakraProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

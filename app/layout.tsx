import type { Metadata } from "next";
"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toast, ToastProvider } from "@/components/ui/toast";
import {PrivyProvider} from '@privy-io/react-auth';
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
        <PrivyProvider
      appId="cm3x5dtpq06z6nmoffneytgg9"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: 'https://i.pinimg.com/736x/86/fc/47/86fc47284e17d44960218afae1c2a852.jpg',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <ToastProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
            {children}
            <Toast/>
          </ThemeProvider>
          </ToastProvider>
    </PrivyProvider>
          
        </body>
      </html>
    </>
  );
}

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { NextUiProviders } from "./_providers/ui/NextUiProvider";
import Nav from "./_components/Nav";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NextUiProviders>
            <main className="flex h-[100dvh] w-full items-center justify-center bg-slate-100 text-black">
              {children}
              <Nav />
            </main>
          </NextUiProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

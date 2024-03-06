import { Roboto_Condensed } from "next/font/google";
import "@/styles/globals.css";
import StoreProvider from "@/app/StoreProvider";
import MobileMenu from "@/components/ui/MobileMenu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";

const robotoCondensed = Roboto_Condensed({
  variable: "--roboto-condensed",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <StoreProvider>
        <body className={`${robotoCondensed.variable} flex flex-col h-screen`}>
          <Header />
          <Main>{children}</Main>
          <Footer />
          <MobileMenu />
        </body>
      </StoreProvider>
    </html>
  );
};

export default RootLayout;

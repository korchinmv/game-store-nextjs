import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  variable: "--roboto-condensed",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${robotoCondensed.variable} flex flex-col h-screen`}>
        <Header />
        <main className='shrink'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;

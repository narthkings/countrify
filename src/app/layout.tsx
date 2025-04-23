import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/NavBar";
import ThemeProvider from "./providers/theme-provider";
import RQProvider from "./providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased max-w-screen-xl mx-auto px-4`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RQProvider>
            <Navbar />
            {children}
          </RQProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

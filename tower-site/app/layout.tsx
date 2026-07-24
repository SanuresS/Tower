import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { darkTheme } from "@/lib/antd-config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Вавилонская Башня",
  description:
    "Подобно самой бездушной серой мегаструктуре, людей окружает бездушный серый мир. Мир, в котором суициднулся Бог",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-tower-bg text-tower-text">
        <AntdRegistry>
          <ConfigProvider theme={darkTheme}>
            <Header />
            {children}
            <Footer />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

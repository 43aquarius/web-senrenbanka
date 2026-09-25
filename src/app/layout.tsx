import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "千恋＊万花 ｜ Web版 · 序章（粉丝自制）",
  description:
    "在浏览器中体验《千恋＊万花》的开端——温泉之乡穗织、神刀丛雨丸与少女们的相遇。粉丝自制的非官方免费 Web 视觉小说（全年龄向，序章体验版）。",
  keywords: ["千恋万花", "Senren Banka", "视觉小说", "Web游戏", "galgame", "粉丝自制"],
  authors: [{ name: "web-senrenbanka" }],
  openGraph: {
    title: "千恋＊万花 ｜ Web版 · 序章",
    description: "温泉之乡穗织，神刀与千朵恋花的故事——浏览器可玩的粉丝自制视觉小说。",
    type: "website",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1216",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${notoSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

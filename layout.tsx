import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrameX - AI影视创作平台",
  description: "从创意到分镜，一键生成可拍摄的完整方案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

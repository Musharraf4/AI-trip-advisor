import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miles AI | Trip advisor",
  description: "Miles AI | Trip advisor",
};
import localFont from "next/font/local";
import { ChildProps } from "@/interfaces";

const gilroyFont = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const RootLayout = ({ children }: Readonly<ChildProps>) => (
  <html lang="en">
    <body className={gilroyFont.className}>{children}</body>
  </html>
);

export default RootLayout;

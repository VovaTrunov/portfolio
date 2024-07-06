import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import Main from "./components/Home";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Volodymyr Trunov - Portfolio",
  description: "Personal portfolio of Volodymyr Trunov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledComponentsRegistry>
      <html lang="en">
        <body className={montserrat.className}>
          {/* <Cursor /> */}
          {children}
        </body>
      </html>
    </StyledComponentsRegistry>
  );
}

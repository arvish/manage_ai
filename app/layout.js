import { Inter } from "next/font/google";
import Head from "next/head";
// import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from "@mui/material";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Manage AI",
  description: "Your Smart Inventory Management Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

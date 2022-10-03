import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "./Navbar";
import BAudioPlayer from "./BAudioPlayer";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    <main>{children}</main>
    <BAudioPlayer />
  </>
);

export default Layout;

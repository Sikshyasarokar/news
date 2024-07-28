import "@/styles/globals.css";
import React, {useEffect, useState} from "react";
import { Layout } from "@/components";
import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
  <div>
   <Layout>
    <Component {...pageProps} />
  </Layout>
  </div>
  )
}

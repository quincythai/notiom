import Head from "next/head";

import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import CardGrid from "@/components/CardGrid";

export default function Home() {
  return (
    <>
      <Head>
        <title>Notiom</title>
        <meta name="description" content="The bootleg notion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/notiom.svg" />
      </Head>
      <main>
        <Navbar />
        <Header />
        <CardGrid />
      </main>
    </>
  );
}

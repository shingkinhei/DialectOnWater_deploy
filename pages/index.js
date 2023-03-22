import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { currentUser } = useAuth();

  return (
    <>
      <Head>
        <title>Dialect on Water</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {currentUser && <div>login</div>}
        <h1 className="text-white">Hello World!</h1>
      </main>
    </>
  );
}

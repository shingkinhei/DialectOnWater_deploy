import Head from "next/head";
import SignUpForm from "@/components/SignUpForm";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white	p-6 rounded-md flex items-center justify-center">
        <SignUpForm />
      </main>
    </>
  );
}

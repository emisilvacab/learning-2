import Head from "next/head";
import Link from "next/link";

function AboutPage() {
  return (
    <>
      <Head>
        <title> About this website </title>
      </Head>
      <div>
        <Link href="/" passHref>
          Back to home
        </Link>
      </div>
    </>
  );
}
export default AboutPage;
